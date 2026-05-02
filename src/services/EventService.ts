import ErrorMessage from "src/errors/ErrorMessage";

// Context
import { requestContext } from "src/context/requestContext";

// Interfaces
import { EventUpdatesCreationAttributes } from "src/models/EventUpdates";
import { EventAttributes, EventCreationAttributes, IEventParams } from "src/models/Event";

// Enums
import { RoleEnum } from "src/enums/RoleEnum";

// Repositories
import EventRepository from "src/repositories/EventRepository";
import EventUpdatesRepository from "src/repositories/EventUpdatesRepository";

// Services
import TaskService from "./TaskService";
import UserService from "./UserService";

/** Serviço para operações relacionadas a eventos */
class EventService {
  constructor(
    private readonly eventRepository = EventRepository,
    private readonly eventUpdatesRepository = EventUpdatesRepository,
    private readonly taskService = TaskService,
    private readonly userService = UserService
  ) { }

  /** Obtém todos os eventos */
  async getAll(params: IEventParams): Promise<EventAttributes[]> {
    const processedParams = await this.processQueryParams(params);
    return this.eventRepository.getAll(processedParams);
  }

  /** Obtém todos os eventos com detalhes */
  async getAllDetailed(params: IEventParams): Promise<EventAttributes[]> {
    const processedParams = await this.processQueryParams(params);
    return this.eventRepository.getAllDetailed(processedParams);
  }

  /** Busca um evento por ID */
  async getById(params: IEventParams): Promise<EventAttributes> {
    const processedParams = await this.processQueryParams(params);
    const event = await this.eventRepository.getWithId(processedParams);
    if (!event) {
      throw new ErrorMessage("Evento não encontrado.", 404);
    }
    return event;
  }

  /** Obtém eventos por tipo */
  async getAllByEventTypeId(eventTypeIds: number[]): Promise<EventAttributes[]> {
    return this.getAll({ eventTypeIds: eventTypeIds.join(",") });
  }

  /** Obtém eventos por escola */
  async getAllBySchoolId(schoolId: number): Promise<EventAttributes[]> {
    return this.getAll({ schoolId });
  }

  /** Cria um novo evento */
  async create(data: Omit<EventCreationAttributes, "organizerUserId">): Promise<EventAttributes> {
    const userId = await this.processQueryParams();
    const organizerUserId = userId.userId || userId.adminId;
    if (!organizerUserId) {
      throw new ErrorMessage("Usuário organizador não identificado.", 401);
    }
    const event = await this.eventRepository.create({ ...data, organizerUserId });

    // Registra criação do evento
    const eventUpdatesCreate: EventUpdatesCreationAttributes = {
      eventId: event.id,
      status: event.status,
      userId: event.organizerUserId,
    }
    await this.eventUpdatesRepository.create(eventUpdatesCreate);

    return event;
  }

  /** Exclui um evento existente com tratamento de dependências */
  async delete(id: number): Promise<void> {
    // Valida existência do evento
    await this.getById({ eventId: id });

    // Desvincula evento de todos os anúncios e tarefas
    const tasks = await this.taskService.getAllByEventId(id);

    for (const task of tasks) {
      try {
        await this.taskService.delete(task.id);
      } catch (error) {
        console.error(`Erro ao remover tarefa ${task.id} do evento ${id}.`);
      }
    }

    // Obtém id do usuário que solicitou a exclusão
    const userId = await this.processQueryParams();

    // Executa exclusão após remover dependências
    const affectedRows = await this.eventRepository.deleteById({
      eventId: id,
      organizerUserId: userId.userId || userId.adminId
    });

    if (affectedRows === 0) {
      throw new ErrorMessage(`Não foi possível remover o evento.`, 409);
    }
  }

  /** Atualiza dados de um evento */
  async update(id: number, data: Partial<EventCreationAttributes>): Promise<void> {
    // Verifica existência prévia
    const event = await this.getById({ eventId: id });

    // Executa atualização
    const affectedRows = await this.eventRepository.update(id, data);
    if (affectedRows === 0) {
      throw new ErrorMessage(`Nenhum dado foi alterado para o evento ${id}.`, 409);
    }

    // Registra atualização do evento
    if (data.status) {
      const eventUpdatesCreate: EventUpdatesCreationAttributes = {
        eventId: event.id,
        status: event.status,
        userId: event.organizerUserId,
      }
      await this.eventUpdatesRepository.create(eventUpdatesCreate);
    }
  }

  /**
   * Processa parâmetros de consulta com base no papel do usuário.
   * Para não-administradores, aplica filtros obrigatórios de usuário e escola.
   */
  private async processQueryParams<T extends IEventParams>(params?: T): Promise<T> {
    const context = requestContext.get();
    const userId = context?.payload.id;
    const user = await this.userService.getDetailById(userId);
    const isAdmin = user.role.roleName === RoleEnum.ADMINISTRATOR;

    if (!isAdmin) {
      return {
        ...params,
        userId: Number(user.id),
        schoolId: Number(user.school.id)
      } as unknown as T;
    }

    return {
      ...params,
      adminId: Number(user.id)
    } as unknown as T;
  }
}

export default new EventService();
