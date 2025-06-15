import { Request, Response, NextFunction } from "express";
import EventService from "src/services/EventService";

// Instância do serviço de eventos
const service = new EventService();

/** Controlador para operações relacionadas a eventos */
class EventController {
  /** Obtém todos os eventos */
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const events = await service.getAll();
      res.status(200).send(events);
    } catch (error) {
      next(error);
    }
  }

  /** Obtém todos os eventos de um tipo por ID */
  async getAllByEventTypeId(req: Request, res: Response, next: NextFunction) {
    try {
      const events = await service.getAllByEventTypeId(Number(req.params.eventTypeId));
      res.status(200).send(events);
    } catch (error) {
      next(error);
    }
  }
  /** Obtém todos os eventos de uma escola por ID */
  async getAllBySchoolId(req: Request, res: Response, next: NextFunction) {
    try {
      const events = await service.getAllBySchoolId(Number(req.params.schoolId));
      res.status(200).send(events);
    } catch (error) {
      next(error);
    }
  }

  /** Obtém um evento específico por ID */
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const event = await service.getById(Number(req.params.id));
      res.status(200).send(event);
    } catch (error) {
      next(error);
    }
  }

  /** Cria um novo evento */
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const event = await service.create(req.body);
      res.status(201).send(event);
    } catch (error) {
      next(error);
    }
  }

  /** Exclui um evento existente */
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await service.delete(Number(req.params.id));
      res.status(201).send({ message: "Evento removido com sucesso." });
    } catch (error) {
      next(error);
    }
  }

  /** Atualiza um evento existente */
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      await service.update(Number(req.params.id), req.body);
      res.status(200).send({ message: "Evento atualizado com sucesso." });
    } catch (error) {
      next(error);
    }
  }
}

export default EventController;