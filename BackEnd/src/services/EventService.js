class EventService {
  constructor(eventRepository) {
    this.eventRepository = eventRepository;
  }

  async getAllEvents() {
    return await this.eventRepository.getAllEvents();
  }

  async getEventStats() {
    return await this.eventRepository.getEventStats();
  }
}

module.exports = EventService;
