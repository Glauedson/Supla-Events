const database = require("../../frameworks/PgDatabase");
const EventService = require("../../services/EventService");
const UserService = require("../../services/UserService");
const EventRepository = require("../repositories/EventRepository");
const UserRepository = require("../repositories/UserRepository");

const eventRepository = new EventRepository(database);
const userRepository = new UserRepository(database);

async function getDashboardData(request, reply) {
  try {
    const eventService = new EventService(eventRepository);
    const userService = new UserService(userRepository);
    const eventStats = await eventService.getEventStats();
    const userCount = await userService.getUserCount();
    const recentUsers = await userService.getRecentUsers(3);
    
    reply.status(200).json({
      eventStats,
      userCount,
      recentUsers
    });
  } catch (error) {
    reply.status(500).json({ error: error.message });
  }
}

module.exports = {
  getDashboardData
};