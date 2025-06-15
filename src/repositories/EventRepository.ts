import BaseRepository from "./BaseRepository";

// Models
import Event from "src/models/Event";

class EventRepository extends BaseRepository<Event> {
  constructor() {
    super(Event);
  }

  async getAllByEventTypeId(eventTypeId: number): Promise<Event[]> {
    return this.model.findAll({ where: { eventTypeId } });
  }

  async getAllBySchoolId(schoolId: number): Promise<Event[]> {
    return this.model.findAll({ where: { schoolId } });
  }
}

export default EventRepository;