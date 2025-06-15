import { Request, Response, NextFunction } from "express";
import EventTypeService from "src/services/EventTypeService";

// Instância do serviço de tipos de eventos
const service = new EventTypeService();

/** Controlador para operações relacionadas a tipos de eventos */
class EventTypeController {
  /** Obtém todos os tipos de eventos */
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const eventTypes = await service.getAll();
      res.status(200).send(eventTypes);
    } catch (error) {
      next(error);
    }
  }

  /** Obtém um tipo de evento específico por ID */
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const eventType = await service.getById(Number(req.params.id));
      res.status(200).send(eventType);
    } catch (error) {
      next(error);
    }
  }

  /** Cria um novo tipo de evento */
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const eventType = await service.create(req.body);
      res.status(201).send(eventType);
    } catch (error) {
      next(error);
    }
  }

  /** Exclui um tipo de evento existente */
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await service.delete(Number(req.params.id));
      res.status(201).send({ message: "Tipo de evento removido com sucesso." });
    } catch (error) {
      next(error);
    }
  }

  /** Atualiza um tipo de evento existente */
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      await service.update(Number(req.params.id), req.body);
      res.status(200).send({ message: "Tipo de evento atualizado com sucesso." });
    } catch (error) {
      next(error);
    }
  }
}

export default EventTypeController;