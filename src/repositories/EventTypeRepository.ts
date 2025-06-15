import BaseRepository from "./BaseRepository";

// Models
import EventType from "src/models/EventType";

class EventTypeRepository extends BaseRepository<EventType> {
  constructor() {
    super(EventType);
  }
}

export default EventTypeRepository;