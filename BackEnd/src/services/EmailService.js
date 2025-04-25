const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE, // ex: 'gmail'
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  async sendVerificationCode(email, code, isPasswordReset = false) {
    try {
      const subject = isPasswordReset 
        ? 'Recuperação de Senha - Seu Código de Verificação' 
        : 'Confirmação de Cadastro - Seu Código de Verificação';
      
      const text = isPasswordReset
        ? `Seu código para redefinir a senha é: ${code}`
        : `Seu código de verificação de cadastro é: ${code}`;

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        text: text,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #0056b3;">${subject}</h2>
            <p>Olá,</p>
            <p>Seu código de verificação é:</p>
            <div style="background-color: #f5f5f5; padding: 10px; font-size: 24px; font-weight: bold; text-align: center; margin: 15px 0;">
              ${code}
            </div>
            <p>Este código é válido por 10 minutos.</p>
            <p>Se você não solicitou este código, por favor ignore este email.</p>
          </div>
        `
      };

      const info = await this.transporter.sendMail(mailOptions);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      return { success: false, error: error.message };
    }
  }
}

module.exports = EmailService;