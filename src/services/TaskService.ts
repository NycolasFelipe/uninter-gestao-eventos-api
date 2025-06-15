import ErrorMessage from "src/errors/ErrorMessage";
import { ITaskCreate } from "src/interfaces/ITask";
import Task from "src/models/Task";
import TaskRepository from "src/repositories/TaskRepository";

// Instância do repositório de tarefas
const repository = new TaskRepository();

/** Serviço para operações relacionadas a tarefas */
class TaskService {
  /** Obtém todas as tarefas existentes */
  async getAll(): Promise<Task[]> {
    return repository.getAll();
  }

  /** Obtém todas as tarefas de um evento por ID */
  async getAllByEventId(id: number): Promise<Task[]> {
    return repository.getAllByEventId(id);
  }

  /** Busca uma tarefa por ID */
  async getById(id: bigint): Promise<Task> {
    const task = await repository.getById(id);
    if (!task) {
      throw new ErrorMessage(`Tarefa com id ${id} não encontrada.`, 404);
    }
    return task;
  }

  /** Cria uma nova tarefa */
  async create(data: ITaskCreate): Promise<Task> {
    return repository.create(data);
  }

  /** Exclui uma tarefa existente */
  async delete(id: bigint): Promise<void> {
    // Valida existência da tarefa
    await this.getById(id);

    // Executa exclusão
    await repository.delete(id);
  }

  /** Atualiza dados de uma tarefa */
  async update(id: bigint, data: Partial<Task>): Promise<void> {
    // Verifica existência prévia
    await this.getById(id);

    // Executa atualização
    const affectedRows = await repository.update(id, data);
    if (affectedRows === 0) {
      throw new ErrorMessage(`Nenhum dado foi alterado para a tarefa ${id}.`, 409);
    }
  }
}

export default TaskService;