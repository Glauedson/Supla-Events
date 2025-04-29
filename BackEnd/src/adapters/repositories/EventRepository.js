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

  async getEventsByCategory(category) {
    try {
      const query = "SELECT * FROM events WHERE category = $1";
      const reply = await this.database.query(query, [category]);
      return reply.rows;
    } catch (error) {
      return { error: error.message };
    }
  }

  async getEventCategories() {
    try {
      const query = "SELECT DISTINCT category FROM events ORDER BY category";
      const reply = await this.database.query(query);
      return reply.rows.map(row => row.category);
    } catch (error) {
      return { error: error.message };
    }
  }

  async createEvent(event) {
    try {
      const query = `
        INSERT INTO events(title, date_start, date_end, description, image_url, category, price, is_paid)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
      `;
      const values = [
        event.title,
        event.dateStart,
        event.dateEnd,
        event.description,
        event.image_url,
        event.category,
        event.price,
        event.is_paid
      ];
      const reply = await this.database.query(query, values);
      return reply.rows[0];
    } catch (error) {
      return { error: error.message };
    }
  }

  async updateEvent(id, eventData) {
    try {
      const query = `
        UPDATE events
        SET title = $1, date_start = $2, date_end = $3, description = $4, 
            image_url = $5, category = $6, price = $7, is_paid = $8
        WHERE id = $9
        RETURNING *
      `;
      const values = [
        eventData.title,
        eventData.dateStart,
        eventData.dateEnd,
        eventData.description,
        eventData.image_url,
        eventData.category,
        eventData.price,
        eventData.is_paid,
        id
      ];
      const reply = await this.database.query(query, values);
      return reply.rows[0];
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
          SUM(CASE WHEN is_paid = true THEN price ELSE 0 END) as total_revenue,
          COUNT(DISTINCT category) as category_count
        FROM events
      `;
      const reply = await this.database.query(query);
      return reply.rows[0];
    } catch (error) {
      return { error: error.message };
    }
  }

  async getCategoryStats() {
    try {
      const query = `
        SELECT 
          category, 
          COUNT(*) as event_count,
          SUM(CASE WHEN is_paid = true THEN price ELSE 0 END) as category_revenue
        FROM events
        GROUP BY category
        ORDER BY event_count DESC
      `;
      const reply = await this.database.query(query);
      return reply.rows;
    } catch (error) {
      return { error: error.message };
    }
  }
}

module.exports = EventRepository;