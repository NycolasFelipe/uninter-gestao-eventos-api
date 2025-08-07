import ErrorMessage from "src/errors/ErrorMessage";

// Interfaces
import { IEventCreate } from "src/interfaces/IEvent";
import { IEventUpdateCreate } from "src/interfaces/IEventUpdates";

// Models
import Event from "src/models/Event";

// Repositories
import EventRepository from "src/repositories/EventRepository";
import EventUpdatesRepository from "src/repositories/EventUpdatesRepository";

// Services
import TaskService from "./TaskService";

// Instância do repositório de tarefas
const repository = new EventRepository();

/** Serviço para operações relacionadas a eventos */
class EventService {
  /** Obtém todos os eventos */
  async getAll(params?: {
    status?: string,
    limit?: number,
    schoolId?: number
  }): Promise<Event[]> {
    return repository.getAll(params);
  }
  /** Obtém todos os eventos com detalhes */
  async getAllDetailed(params?: { status?: string, limit?: number }): Promise<Event[]> {
    return repository.getAllDetailed(params);
  }

  /** Obtém todos os eventos por tipo de evento */
  async getAllByEventTypeId(eventTypeIds: number[]): Promise<Event[]> {
    return repository.getAllByEventTypeId(eventTypeIds);
  }

  /** Obtém todos os eventos por status */
  async getAllByEventStatus(statusIds: string[]): Promise<Event[]> {
    return repository.getAllByEventStatus(statusIds);
  }

  /** Obtém todos os eventos associados a uma escola específica */
  async getAllBySchoolId(id: number): Promise<Event[]> {
    return repository.getAllBySchoolId(id);
  }

  /** Busca um evento por ID */
  async getById(id: number): Promise<Event> {
    const event = await repository.getById(id);
    if (!event) {
      throw new ErrorMessage(`Evento com id ${id} não encontrado.`, 404);
    }
    return event;
  }

  /** Cria um novo evento */
  async create(organizerUserId: bigint, data: IEventCreate): Promise<Event> {
    const event = await repository.create({ ...data, organizerUserId });

    // Registra criação do evento
    const eventUpdatesRepository = new EventUpdatesRepository();
    const eventUpdatesCreate: IEventUpdateCreate = {
      eventId: event.id,
      status: event.status,
      userId: event.organizerUserId,
    }
    await eventUpdatesRepository.create(eventUpdatesCreate);

    return event;
  }

  /** Exclui um evento existente com tratamento de dependências */
  async delete(id: number): Promise<void> {
    // Valida existência do evento
    await this.getById(id);

    // Desvincula evento de todos os anúncios e tarefas
    const taskService = new TaskService();
    const tasks = await taskService.getAllByEventId(id);

    for (const task of tasks) {
      try {
        await taskService.delete(task.id);
      } catch (error) {
        console.error(`Erro ao remover tarefa ${task.id} do evento ${id}.`);
      }
    }

    // Executa exclusão após remover dependências
    await repository.delete(id);
  }

  /** Atualiza dados de um evento */
  async update(id: number, data: Partial<Event>): Promise<void> {
    // Verifica existência prévia
    const event = await this.getById(id);

    // Executa atualização
    const affectedRows = await repository.update(id, data);
    if (affectedRows === 0) {
      throw new ErrorMessage(`Nenhum dado foi alterado para o evento ${id}.`, 409);
    }

    if (data.status) {
      // Registra atualização do evento
      const eventUpdatesRepository = new EventUpdatesRepository();
      const eventUpdatesCreate: IEventUpdateCreate = {
        eventId: event.id,
        status: event.status,
        userId: event.organizer.id,
      }
      await eventUpdatesRepository.create(eventUpdatesCreate);
    }
  }
}

export default EventService;