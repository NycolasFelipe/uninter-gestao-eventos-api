import { Request, Response, NextFunction } from "express";
import TaskService from "src/services/TaskService";

// Instância do serviço de tarefas
const service = new TaskService();

/** Controlador para operações relacionadas a tarefas */
class TaskController {
  /** Obtém todas as tarefas */
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const tasks = await service.getAll();
      res.status(200).send(tasks);
    } catch (error) {
      next(error);
    }
  }

  /** Obtém todas as tarefas de um evento por ID */
  async getAllByEventId(req: Request, res: Response, next: NextFunction) {
    try {
      const tasks = await service.getAllByEventId(Number(req.params.eventId));
      res.status(200).send(tasks);
    } catch (error) {
      next(error);
    }
  }

  /** Obtém uma tarefa específica por ID */
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const task = await service.getById(BigInt(req.params.id));
      res.status(200).send(task);
    } catch (error) {
      next(error);
    }
  }

  /** Cria uma nova tarefa */
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const task = await service.create(req.body);
      res.status(201).send(task);
    } catch (error) {
      next(error);
    }
  }

  /** Exclui uma tarefa existente */
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await service.delete(BigInt(req.params.id));
      res.status(201).send({ message: "Tarefa removida com sucesso." });
    } catch (error) {
      next(error);
    }
  }

  /** Atualiza uma tarefa existente */
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      await service.update(BigInt(req.params.id), req.body);
      res.status(200).send({ message: "Tarefa atualizada com sucesso." });
    } catch (error) {
      next(error);
    }
  }
}

export default TaskController;