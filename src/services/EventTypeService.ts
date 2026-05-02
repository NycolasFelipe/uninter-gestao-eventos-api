import ErrorMessage from "src/errors/ErrorMessage";

// Interfaces
import { EventTypeAttributes, EventTypeCreationAttributes } from "src/models/EventType";

// Repositories
import EventTypeRepository from "src/repositories/EventTypeRepository";

// Services
import EventService from "./EventService";

/** Serviço para operações relacionadas a tipos de eventos */
class EventTypeService {
  constructor(
    private readonly repository = EventTypeRepository,
    private readonly eventService = EventService
  ) { }

  /** Obtém todas os tipos de eventos existentes */
  async getAll(): Promise<EventTypeAttributes[]> {
    return this.repository.getAll();
  }

  /** Busca um tipo de evento por ID */
  async getById(id: number): Promise<EventTypeAttributes> {
    const eventType = await this.repository.getById(id);
    if (!eventType) {
      throw new ErrorMessage(`Tipo de evento com id ${id} não encontrado.`, 404);
    }
    return eventType;
  }

  /** Cria um novo tipo de evento */
  async create(data: EventTypeCreationAttributes): Promise<EventTypeAttributes> {
    return this.repository.create(data);
  }

  /** Exclui um tipo de evento existente com tratamento de dependências */
  async delete(id: number): Promise<void> {
    // Valida existência da permissão
    await this.getById(id);

    // Verifica vinculação existente com evento
    const existingEventWithEventType = await this.eventService.getAllByEventTypeId([id]);

    if (existingEventWithEventType.length > 0) {
      const events = existingEventWithEventType.map(event => event.id)?.join(", ");
      throw new ErrorMessage(`Não é possível remover o tipo de evento ${id}, pois está atribuído aos eventos ${events}.`, 409);
    }

    // Executa exclusão
    await this.repository.delete(id);
  }

  /** Atualiza dados de um tipo de evento */
  async update(id: number, data: Partial<EventTypeCreationAttributes>): Promise<void> {
    // Verifica existência prévia
    await this.getById(id);

    // Executa atualização
    const affectedRows = await this.repository.update(id, data);
    if (affectedRows === 0) {
      throw new ErrorMessage(`Nenhum dado foi alterado para o tipo de evento ${id}.`, 409);
    }
  }
}

export default new EventTypeService();
