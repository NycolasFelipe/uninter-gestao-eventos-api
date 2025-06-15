import ErrorMessage from "src/errors/ErrorMessage";
import { IEventTypeCreate } from "src/interfaces/IEventTypeCreate";
import EventType from "src/models/EventType";
import EventTypeRepository from "src/repositories/EventTypeRepository";
import EventService from "./EventService";

// Instância do repositório de tipos de eventos
const repository = new EventTypeRepository();

/** Serviço para operações relacionadas a tipos de eventos */
class EventTypeService {
  /** Obtém todas os tipos de eventos existentes */
  async getAll(): Promise<EventType[]> {
    return repository.getAll();
  }

  /** Busca um tipo de evento por ID */
  async getById(id: number): Promise<EventType> {
    const eventType = await repository.getById(id);
    if (!eventType) {
      throw new ErrorMessage(`Tipo de evento com id ${id} não encontrado.`, 404);
    }
    return eventType;
  }

  /** Cria um novo tipo de evento */
  async create(data: IEventTypeCreate): Promise<EventType> {
    return repository.create(data);
  }

  /** Exclui um tipo de evento existente com tratamento de dependências */
  async delete(id: number): Promise<void> {
    // Valida existência da permissão
    await this.getById(id);

    // Verifica vinculação existente com evento
    const eventService = new EventService();
    const existingEventWithEventType = await eventService.getAllByEventTypeId(id);

    if (existingEventWithEventType.length > 0) {
      const events = existingEventWithEventType.map(event => event.id)?.join(", ");
      throw new ErrorMessage(`Não é possível remover o tipo de evento ${id}, pois está atribuído aos eventos ${events}.`, 409);
    }

    // Executa exclusão
    await repository.delete(id);
  }

  /** Atualiza dados de um tipo de evento */
  async update(id: number, data: Partial<EventType>): Promise<void> {
    // Verifica existência prévia
    await this.getById(id);

    // Executa atualização
    const affectedRows = await repository.update(id, data);
    if (affectedRows === 0) {
      throw new ErrorMessage(`Nenhum dado foi alterado para o tipo de evento ${id}.`, 409);
    }
  }
}

export default EventTypeService;