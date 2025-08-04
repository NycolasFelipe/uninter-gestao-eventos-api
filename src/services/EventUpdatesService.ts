import EventUpdates from "src/models/EventUpdates";
import EventUpdatesRepository from "src/repositories/EventUpdatesRepository";
import { IEventUpdateCreate } from "src/interfaces/IEventUpdates";

// Instância do repositório de tipos de eventos
const repository = new EventUpdatesRepository();

/** Serviço para operações relacionadas a atualiações de eventos */
class EventUpdatesService {
  /** Obtém todas as atualizações de eventos existentes */
  async getAll(): Promise<EventUpdates[]> {
    return repository.getAll();
  }

  /** Busca atualizções de um evento */
  async getAllByEventId(id: number): Promise<EventUpdates[]> {
    const eventsUpdates = await repository.getAllByEventId(id);
    return eventsUpdates;
  }

  /** Cria um novo tipo de evento */
  async create(data: IEventUpdateCreate): Promise<EventUpdates> {
    return repository.create(data);
  }
}

export default EventUpdatesService;