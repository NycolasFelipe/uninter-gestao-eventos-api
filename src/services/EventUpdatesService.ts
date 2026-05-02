// Interfaces
import { EventUpdatesAttributes, EventUpdatesCreationAttributes } from "src/models/EventUpdates";

// Repositories
import EventUpdatesRepository from "src/repositories/EventUpdatesRepository";

/** Serviço para operações relacionadas a atualiações de eventos */
class EventUpdatesService {
  constructor(private readonly repository = EventUpdatesRepository) { }

  /** Obtém todas as atualizações de eventos existentes */
  async getAll(): Promise<EventUpdatesAttributes[]> {
    return this.repository.getAll();
  }

  /** Busca atualizções de um evento */
  async getAllByEventId(id: number): Promise<EventUpdatesAttributes[]> {
    const eventsUpdates = await this.repository.getAllByEventId(id);
    return eventsUpdates;
  }

  /** Cria um novo tipo de evento */
  async create(data: EventUpdatesCreationAttributes): Promise<EventUpdatesAttributes> {
    return this.repository.create(data);
  }
}

export default new EventUpdatesService();
