import BaseRepository from "./BaseRepository";

// Models
import EventUpdates from "src/models/EventUpdates";

class EventUpdatesRepository extends BaseRepository<EventUpdates> {
  constructor() {
    super(EventUpdates);
  }

  /** Obtém todos os updates de um evento específico */
  getAllByEventId(id: number): Promise<EventUpdates[]> {
    return this.model.findAll({ where: { eventId: id } });
  }
}

export default new EventUpdatesRepository();
