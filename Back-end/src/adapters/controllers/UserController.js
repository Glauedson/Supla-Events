const database = require("../../frameworks/PgDatabase");
const UserService = require("../../services/UserService");
const UserRepository = require("../repositories/UserRepository");

const userRepository = new UserRepository(database);

/* 
  Return all users from the Database 
*/
async function getAllUsers(request, reply) {
  const service = new UserService(userRepository);
  const users = await service.getAllUsers();

  reply.status(200).json(users);
}

/* 
  Register a user in the Database 
*/
async function registerUser(request, reply) {
  const data = request.body;

  const service = new UserService(userRepository);
  const replyService = await service.registerUser(data);

  reply.status(201).json({ status: replyService });
}

/* 
  Register a user in the Database 
*/
async function loginUser(request, reply) {}

module.exports = { getAllUsers, registerUser, loginUser };
