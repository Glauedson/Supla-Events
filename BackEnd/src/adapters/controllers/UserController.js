const database = require("../../frameworks/PgDatabase");
const UserService = require("../../services/UserService");
const UserRepository = require("../repositories/UserRepository");
const VerificationRepository = require("../repositories/VerificationRepository");
const EmailService = require("../../services/EmailService");
const jwt = require("jsonwebtoken");

const userRepository = new UserRepository(database);
const verificationRepository = new VerificationRepository(database);
const emailService = new EmailService();

function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/* 
  Return all users from the Database 
*/
async function getAllUsers(request, reply) {
  const service = new UserService(userRepository);
  const replyService = await service.getAllUsers();

  if (replyService.error)
    return reply.status(500).json({ error: replyService.error });

  reply.status(200).json({ users: replyService });
}

/* 
  Register a user in the Database 
*/
async function registerUser(request, reply) {
  const data = request.body;

  const service = new UserService(userRepository);
  const replyService = await service.registerUser(data);

  if (replyService.error)
    return reply.status(500).json({ error: replyService.error });

  reply.status(201).json({ status: replyService });
}

/* 
  Register a user in the Database 
*/
async function loginUser(request, reply) {
  const dataLogin = request.body;

  const service = new UserService(userRepository);
  const replyService = await service.autenticateUser(dataLogin);

  if (replyService.error)
    return reply.status(replyService.code).json({ error: replyService.error });

  const payload = {
    userId: replyService.user.id,
    userRole: replyService.user.role,
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "5m" });

  let redirect = "";
  if (replyService.user.role == "admin") redirect = "/#/admin";
  else redirect = "/#/home"

  reply.status(200).json({ token, redirect });
}

async function profileUser(request, reply) {
  reply.json("Bem vindo! Voce esta autenticado para usar a pagina PROFILE");
}

async function adminUser(request, reply) {
  reply.json("Bem vindo! Voce esta autenticado para usar a pagina ADMIN");
}

async function sendVerificationEmail(request, reply) {
  try {
    const { email, type } = request.body;
    
    if (!email) {
      return reply.status(400).json({ error: "Email é obrigatório" });
    }
    
    if (!type || !['register', 'password_reset'].includes(type)) {
      return reply.status(400).json({ error: "Tipo inválido. Use 'register' ou 'password_reset'" });
    }
    
    // Verifica se o email existe para recuperação de senha
    if (type === 'password_reset') {
      const user = await userRepository.getUserByEmail(email);
      if (!user) {
        return reply.status(404).json({ error: "Usuário não encontrado" });
      }
    }
    
    // Gera um código de verificação
    const code = generateVerificationCode();
    
    // Salva o código no banco de dados
    await verificationRepository.createVerificationCode(email, code, type);
    
    // Envia o email
    const isPasswordReset = type === 'password_reset';
    const result = await emailService.sendVerificationCode(email, code, isPasswordReset);
    
    if (!result.success) {
      return reply.status(500).json({ error: "Falha ao enviar email" });
    }
    
    return reply.status(200).json({ 
      message: "Código de verificação enviado com sucesso",
      email: email
    });
  } catch (error) {
    console.error(error);
    return reply.status(500).json({ error: "Erro interno do servidor" });
  }
}

async function verifyCode(request, reply) {
  try {
    const { email, code, type } = request.body;
    
    if (!email || !code || !type) {
      return reply.status(400).json({ error: "Email, código e tipo são obrigatórios" });
    }
    
    const result = await verificationRepository.verifyCode(email, code, type);
    
    if (!result.valid) {
      return reply.status(400).json({ error: result.error });
    }
    
    // Se for verificação de registro, podemos marcar o usuário como verificado
    if (type === 'register') {
      // Opcional: Atualizar o status do usuário para verificado
      // await userRepository.markUserAsVerified(email);
    }
    
    // Cria um token temporário para autorizar a próxima etapa
    const tempToken = jwt.sign(
      { email, type, verified: true },
      process.env.SECRET_KEY,
      { expiresIn: '15m' }
    );
    
    return reply.status(200).json({ 
      message: "Código verificado com sucesso",
      tempToken
    });
  } catch (error) {
    console.error(error);
    return reply.status(500).json({ error: "Erro interno do servidor" });
  }
}

async function resetPassword(request, reply) {
  try {
    const { tempToken, newPassword } = request.body;
    
    if (!tempToken || !newPassword) {
      return reply.status(400).json({ error: "Token e nova senha são obrigatórios" });
    }
    
    // Verifica o token temporário
    let decoded;
    try {
      decoded = jwt.verify(tempToken, process.env.SECRET_KEY);
    } catch (error) {
      return reply.status(401).json({ error: "Token inválido ou expirado" });
    }
    
    // Verifica se o token é para redefinição de senha
    if (decoded.type !== 'password_reset' || !decoded.verified) {
      return reply.status(401).json({ error: "Token não autorizado para esta operação" });
    }
    
    const email = decoded.email;
    
    // Atualiza a senha do usuário
    const service = new UserService(userRepository);
    const result = await service.updatePassword(email, newPassword);
    
    if (result.error) {
      return reply.status(500).json({ error: result.error });
    }
    
    // Exclui o código de verificação usado
    await verificationRepository.deleteVerificationCode(email, 'password_reset');
    
    return reply.status(200).json({ message: "Senha atualizada com sucesso" });
  } catch (error) {
    console.error(error);
    return reply.status(500).json({ error: "Erro interno do servidor" });
  }
}


module.exports = {
  getAllUsers,
  registerUser,
  loginUser,
  profileUser,
  adminUser,
  sendVerificationEmail,
  verifyCode,
  resetPassword
};