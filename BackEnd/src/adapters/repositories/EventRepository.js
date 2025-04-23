class EventRepository {
  constructor(database) {
    this.database = database;
  }

  async getAllEvents() {
    try {
      const query = "select * from events";
      const reply = await this.database.query(query);

      return reply.rows;
    } catch (error) {
      return { error: error.message };
    }
  }
}

module.exports = EventRepository;
