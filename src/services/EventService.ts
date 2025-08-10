import ErrorMessage from "src/errors/ErrorMessage";

// Interfaces
import { IEventCreate, IEventParams } from "src/interfaces/IEvent";
import { IEventUpdateCreate } from "src/interfaces/IEventUpdates";

// Models
import Event from "src/models/Event";

// Repositories
import EventRepository from "src/repositories/EventRepository";
import EventUpdatesRepository from "src/repositories/EventUpdatesRepository";

// Services
import TaskService from "./TaskService";

// Util
import processQueryParams from "src/util/processQueryParams";


/** Serviço para operações relacionadas a eventos */
class EventService {

  /** Obtém todos os eventos */
  async getAll(params: IEventParams): Promise<Event[]> {
    const processedParams = await processQueryParams(params);
    return EventRepository.getAll(processedParams);
  }

  /** Obtém todos os eventos com detalhes */
  async getAllDetailed(params: IEventParams): Promise<Event[]> {
    const processedParams = await processQueryParams(params);
    return EventRepository.getAllDetailed(processedParams);
  }

  /** Busca um evento por ID */
  async getById(params: IEventParams): Promise<Event> {
    const processedParams = await processQueryParams(params);
    const event = await EventRepository.getWithId(processedParams);
    if (!event) {
      throw new ErrorMessage("Evento não encontrado.", 404);
    }
    return event;
  }

  /** Cria um novo evento */
  async create(data: IEventCreate): Promise<Event> {
    const userId = await processQueryParams();
    const organizerUserId = userId.userId || userId.adminId;
    const event = await EventRepository.create({ ...data, organizerUserId });

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
    await this.getById({ eventId: id });

    // Desvincula evento de todos os anúncios e tarefas
    const tasks = await TaskService.getAllByEventId(id);

    for (const task of tasks) {
      try {
        await TaskService.delete(task.id);
      } catch (error) {
        console.error(`Erro ao remover tarefa ${task.id} do evento ${id}.`);
      }
    }

    // Obtém id do usuário que solicitou a exclusão
    const userId = await processQueryParams();

    // Executa exclusão após remover dependências
    const affectedRows = await EventRepository.deleteById({
      eventId: id,
      organizerUserId: userId.userId
    });

    if (affectedRows === 0) {
      throw new ErrorMessage(`Não foi possível remover o evento.`, 409);
    }
  }

  /** Atualiza dados de um evento */
  async update(id: number, data: Partial<Event>): Promise<void> {
    // Verifica existência prévia
    const event = await this.getById({ eventId: id });

    // Executa atualização
    const affectedRows = await EventRepository.update(id, data);
    if (affectedRows === 0) {
      throw new ErrorMessage(`Nenhum dado foi alterado para o evento ${id}.`, 409);
    }

    // Registra atualização do evento
    if (data.status) {
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

export default new EventService();