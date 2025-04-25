class VerificationRepository {
    constructor(database) {
      this.database = database;
    }
  
    async createVerificationCode(email, code, type) {
      try {
        // Expiração em 10 minutos
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
        
        // Verifica se já existe um código para este email e tipo
        const checkQuery = "SELECT * FROM verification_codes WHERE email = $1 AND type = $2";
        const existingCode = await this.database.query(checkQuery, [email, type]);
        
        if (existingCode.rows.length > 0) {
          // Atualiza o código existente
          const updateQuery = `
            UPDATE verification_codes 
            SET code = $1, expires_at = $2, attempts = 0
            WHERE email = $3 AND type = $4
            RETURNING *
          `;
          const result = await this.database.query(updateQuery, [code, expiresAt, email, type]);
          return result.rows[0];
        } else {
          // Cria um novo código
          const insertQuery = `
            INSERT INTO verification_codes(email, code, expires_at, type, attempts)
            VALUES($1, $2, $3, $4, 0)
            RETURNING *
          `;
          const result = await this.database.query(insertQuery, [email, code, expiresAt, type]);
          return result.rows[0];
        }
      } catch (error) {
        return { error: error.message };
      }
    }
  
    async verifyCode(email, code, type) {
      try {
        const query = `
          SELECT * FROM verification_codes 
          WHERE email = $1 AND code = $2 AND type = $3
        `;
        const result = await this.database.query(query, [email, code, type]);
        
        if (result.rows.length === 0) {
          return { valid: false, error: "Código inválido" };
        }
        
        const verificationRecord = result.rows[0];
        
        // Atualiza tentativas
        const updateQuery = `
          UPDATE verification_codes 
          SET attempts = attempts + 1
          WHERE id = $1
        `;
        await this.database.query(updateQuery, [verificationRecord.id]);
        
        // Verifica se o código expirou
        if (new Date(verificationRecord.expires_at) < new Date()) {
          return { valid: false, error: "Código expirado" };
        }
        
        // Verifica número de tentativas (máx 5)
        if (verificationRecord.attempts >= 5) {
          return { valid: false, error: "Número máximo de tentativas excedido" };
        }
        
        return { valid: true, record: verificationRecord };
      } catch (error) {
        return { valid: false, error: error.message };
      }
    }
  
    async deleteVerificationCode(email, type) {
      try {
        const query = "DELETE FROM verification_codes WHERE email = $1 AND type = $2";
        await this.database.query(query, [email, type]);
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    }
  }
  
  module.exports = VerificationRepository;