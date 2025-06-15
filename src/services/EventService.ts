import ErrorMessage from "src/errors/ErrorMessage";
import { IEventCreate } from "src/interfaces/IEvent";
import Event from "src/models/Event";
import EventRepository from "src/repositories/EventRepository";
import TaskService from "./TaskService";

// Instância do repositório de tarefas
const repository = new EventRepository();

/** Serviço para operações relacionadas a eventos */
class EventService {
  /** Obtém todos os eventos existentes */
  async getAll(): Promise<Event[]> {
    return repository.getAll();
  }

  async getAllByEventTypeId(eventTypeId: number): Promise<Event[]> {
    return repository.getAllByEventTypeId(eventTypeId);
  }

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
  async create(data: IEventCreate): Promise<Event> {
    return repository.create(data);
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
    await this.getById(id);

    // Executa atualização
    const affectedRows = await repository.update(id, data);
    if (affectedRows === 0) {
      throw new ErrorMessage(`Nenhum dado foi alterado para o evento ${id}.`, 409);
    }
  }
}

export default EventService;