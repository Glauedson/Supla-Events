class EventService {
  constructor(eventRepository) {
    this.eventRepository = eventRepository;
  }

  async getAllEvents() {
    return await this.eventRepository.getAllEvents();
  }
}

module.exports = EventService;
