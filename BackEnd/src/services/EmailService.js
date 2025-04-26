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
          <!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirme seu código</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333333;
        }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333333;">
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td align="center" style="padding: 20px 0;">
                <table role="presentation" width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); overflow: hidden; margin: 0 auto;">
                    <!-- Cabeçalho -->
                    <tr>
                        <td align="center" style="padding: 30px 20px; background-color: #121212;">
                            <img src="https://raw.githubusercontent.com/Glauedson/Supla-Events/refs/heads/main/FrontEnd/assets/Logo%20Supla.png" alt="Logo da Supla" style="display: block; max-width: 200px; height: auto;" />
                        </td>
                    </tr>
                    
                    <!-- Conteúdo Principal -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <h1 style="margin: 0 0 20px; font-size: 24px; line-height: 1.2; color: #333333; text-align: center;">Confirme seu endereço de e-mail</h1>
                            
                            <p style="margin: 0 0 25px; font-size: 16px; line-height: 1.5; color: #666666; text-align: center;">
                                Hey <strong>papito</strong> obrigado por se cadastrar, mano! Pra completar o rolê, mete esse código aí:
                            </p>
                            
                            <!-- Código de Verificação -->
                            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 30px 0;">
                                <tr>
                                    <td align="center">
                                        <div style="background-color: #f2f3f8; border-radius: 6px; padding: 15px; display: inline-block;">
                                            <h2 style="margin: 0; font-family: 'Courier New', monospace; font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #F9D31C;">${code}</h2>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin: 0 0 15px; font-size: 16px; line-height: 1.5; color: #666666; text-align: center;">
                                Este código é válido por 10 minutos. Se você não solicitou este código, por favor ignore este e-mail.
                            </p>
                            
                        </td>
                    </tr>
                    
                    <!-- Rodapé -->
                    <tr>
                        <td style="padding: 20px; background-color: #121212; text-align: center; border-top: 1px solid #e5e5e5;">
                            <p style="margin: 0 0 10px; font-size: 14px; line-height: 1.5; color:rgb(255, 255, 255);">
                                &copy; 2025 Supla Events - Todos os direitos reservados.
                            </p>
                            <p style="margin: 0; font-size: 14px; line-height: 1.5; color:rgb(255, 255, 255);">
                                Ilha de Cayo Perico, Los Santos, Costa Sudeste, 90001
                            </p>
                            <p style="margin: 15px 0 0; font-size: 14px; line-height: 1.5; color:rgb(255, 255, 255);">
                                <a href="#" style="color: #F9D31C; text-decoration: none; margin: 0 10px;">Política de Privacidade</a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
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