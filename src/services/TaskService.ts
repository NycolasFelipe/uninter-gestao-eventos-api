import ErrorMessage from "src/errors/ErrorMessage";

// Interfaces
import { TaskAttributes, TaskCreationAttributes } from "src/models/Task";

// Repositories
import TaskRepository from "src/repositories/TaskRepository";

/** Serviço para operações relacionadas a tarefas */
class TaskService {
  constructor(private readonly repository = TaskRepository) { }

  /** Obtém todas as tarefas existentes */
  async getAll(): Promise<TaskAttributes[]> {
    return this.repository.getAll();
  }

  /** Obtém todas as tarefas de um evento por ID */
  async getAllByEventId(id: number): Promise<TaskAttributes[]> {
    return this.repository.getAllByEventId(id);
  }

  /** Busca uma tarefa por ID */
  async getById(id: bigint): Promise<TaskAttributes> {
    const task = await this.repository.getById(id);
    if (!task) {
      throw new ErrorMessage(`Tarefa com id ${id} não encontrada.`, 404);
    }
    return task;
  }

  /** Cria uma nova tarefa */
  async create(data: TaskCreationAttributes): Promise<TaskAttributes> {
    return this.repository.create(data);
  }

  /** Exclui uma tarefa existente */
  async delete(id: bigint): Promise<void> {
    // Valida existência da tarefa
    await this.getById(id);

    // Executa exclusão
    await this.repository.delete(id);
  }

  /** Atualiza dados de uma tarefa */
  async update(id: bigint, data: Partial<TaskCreationAttributes>): Promise<void> {
    // Verifica existência prévia
    await this.getById(id);

    // Executa atualização
    const affectedRows = await this.repository.update(id, data);
    if (affectedRows === 0) {
      throw new ErrorMessage(`Nenhum dado foi alterado para a tarefa ${id}.`, 409);
    }
  }
}

export default new TaskService();
