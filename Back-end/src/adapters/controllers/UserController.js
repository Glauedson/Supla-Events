const database = require("../../frameworks/PgDatabase");
const UserService = require("../../services/UserService");
const UserRepository = require("../repositories/UserRepository");

const userRepository = new UserRepository(database);

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
    return reply.status(500).json({ error: replyService.error });

  reply.status(200).json(replyService);
}

module.exports = { getAllUsers, registerUser, loginUser };
