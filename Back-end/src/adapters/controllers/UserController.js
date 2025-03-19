const database = require("../../frameworks/PgDatabase");
const UserService = require("../../services/UserService");
const UserRepository = require("../repositories/UserRepository");

const userRepository = new UserRepository(database);

async function getAllUsers(request, reply) {
  const service = new UserService(userRepository);
  const users = await service.getAllUsers();

  reply.json(users);
}

module.exports = { getAllUsers };
