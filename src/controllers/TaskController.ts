import { Request, Response, NextFunction } from "express";

// Services
import TaskService from "src/services/TaskService";

class TaskController {
  constructor(private readonly service = TaskService) {}

  /** Obtém todas as tarefas */
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const tasks = await this.service.getAll();
      res.status(200).send(tasks);
    } catch (error) {
      next(error);
    }
  }

  /** Obtém todas as tarefas de um evento por ID */
  async getAllByEventId(req: Request, res: Response, next: NextFunction) {
    try {
      const tasks = await this.service.getAllByEventId(Number(req.params.eventId));
      res.status(200).send(tasks);
    } catch (error) {
      next(error);
    }
  }

  /** Obtém uma tarefa específica por ID */
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const task = await this.service.getById(BigInt(req.params.id));
      res.status(200).send(task);
    } catch (error) {
      next(error);
    }
  }

  /** Cria uma nova tarefa */
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const task = await this.service.create(req.body);
      res.status(201).send(task);
    } catch (error) {
      next(error);
    }
  }

  /** Exclui uma tarefa existente */
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await this.service.delete(BigInt(req.params.id));
      res.status(201).send({ message: "Tarefa removida com sucesso." });
    } catch (error) {
      next(error);
    }
  }

  /** Atualiza uma tarefa existente */
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      await this.service.update(BigInt(req.params.id), req.body);
      res.status(200).send({ message: "Tarefa atualizada com sucesso." });
    } catch (error) {
      next(error);
    }
  }
}

export default new TaskController();
