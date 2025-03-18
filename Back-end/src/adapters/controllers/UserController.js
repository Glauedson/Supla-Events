const UserService = require("../../services/UserService");

async function getAllUsers(request, reply) {
  const service = new UserService(null);
  const data = await service.getAllUser();

  reply.json(data);
}

module.exports = { getAllUsers };
