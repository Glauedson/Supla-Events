class EventRepository {
  constructor(database) {
    this.database = database;
  }

  async getAllEvents() {
    try {
      const query = "SELECT * FROM events";
      const reply = await this.database.query(query);
      return reply.rows;
    } catch (error) {
      return { error: error.message };
    }
  }
  
  async getRecentUsers(limit = 3) {
    try {
      const query = "SELECT * FROM users ORDER BY id DESC LIMIT $1";
      const reply = await this.database.query(query, [limit]);
      return reply.rows;
    } catch (error) {
      return { error: error.message };
    }
  }
  
  async getEventStats() {
    try {
      const query = `
        SELECT 
          COUNT(*) as total_events,
          SUM(CASE WHEN is_paid = true THEN price ELSE 0 END) as total_revenue
        FROM events
      `;
      const reply = await this.database.query(query);
      return reply.rows[0];
    } catch (error) {
      return { error: error.message };
    }
  }
}

module.exports = EventRepository;
