import BaseRepository from "./BaseRepository";

// Models
import Task from "src/models/Task";

class TaskRepository extends BaseRepository<Task> {
  constructor() {
    super(Task);
  }

  async getAllByEventId(eventId: number): Promise<Task[]> {
    return this.model.findAll({ where: { eventId } });
  }
}

export default TaskRepository;