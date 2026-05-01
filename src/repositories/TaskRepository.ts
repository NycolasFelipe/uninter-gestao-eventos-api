import BaseRepository from "./BaseRepository";

// Models
import Task from "src/models/Task";

class TaskRepository extends BaseRepository<Task> {
  constructor() {
    super(Task);
  }

  /** Obtém todas as tarefas associadas a um evento */
  async getAllByEventId(eventId: number): Promise<Task[]> {
    return this.model.findAll({ where: { eventId } });
  }
}

export default new TaskRepository();
