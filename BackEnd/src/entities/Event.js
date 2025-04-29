class Event {
  constructor(title, dateStart, dateEnd, description, image_url, category, price = 0.00, is_paid = false) {
    this.id = 0;
    this.title = title;
    this.dateStart = dateStart;
    this.dateEnd = dateEnd;
    this.description = description;
    this.image_url = image_url;
    this.category = category || 'outros'; // Valor padrão caso não seja especificado
    this.price = price;
    this.is_paid = is_paid;
  }
}

module.exports = Event;