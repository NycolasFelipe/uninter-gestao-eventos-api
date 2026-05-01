import EventUpdates from "src/models/EventUpdates";
import EventUpdatesRepository from "src/repositories/EventUpdatesRepository";
import { IEventUpdateCreate } from "src/interfaces/IEventUpdates";

/** Serviço para operações relacionadas a atualiações de eventos */
class EventUpdatesService {
  constructor(private readonly repository = EventUpdatesRepository) {}

  /** Obtém todas as atualizações de eventos existentes */
  async getAll(): Promise<EventUpdates[]> {
    return this.repository.getAll();
  }

  /** Busca atualizções de um evento */
  async getAllByEventId(id: number): Promise<EventUpdates[]> {
    const eventsUpdates = await this.repository.getAllByEventId(id);
    return eventsUpdates;
  }

  /** Cria um novo tipo de evento */
  async create(data: IEventUpdateCreate): Promise<EventUpdates> {
    return this.repository.create(data);
  }
}

export default new EventUpdatesService();
