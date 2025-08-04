import { Request, Response, NextFunction } from "express";
import { decode, JwtPayload } from "jsonwebtoken";
import EventService from "src/services/EventService";

// Instância do serviço de eventos
const service = new EventService();

/** Controlador para operações relacionadas a eventos */
class EventController {
  /** Obtém todos os eventos */
  async getAll(req: Request, res: Response, next: NextFunction) {
    const { status } = req.query;
    const { limit } = req.query;
    try {
      const events = await service.getAll({
        ...(status && { status: status.toString() }),
        ...(limit && { limit: Number(limit) })
      });
      res.status(200).send(events);
    } catch (error) {
      next(error);
    }
  }

  /** Obtém todos os eventos de um tipo por ID */
  async getAllByEventTypeId(req: Request, res: Response, next: NextFunction) {
    const queryIds = req.query.id?.toString()?.split(",");
    const ids = queryIds?.map(q => q.trim())?.map(q => Number(q)) || [];
    try {
      const events = await service.getAllByEventTypeId(ids);
      res.status(200).send(events);
    } catch (error) {
      next(error);
    }
  }

  /** Obtém todos os eventos de um tipo por status */
  async getAllByEventStatus(req: Request, res: Response, next: NextFunction) {
    const queryIds = req.query.status?.toString()?.split(",");
    const ids = queryIds?.map(q => q.trim()) || [];
    try {
      const events = await service.getAllByEventStatus(ids);
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
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(" ")[1];
      const decodedToken = decode(token!) as JwtPayload;
      const organizerUserId = decodedToken.id.toString();
      const event = await service.create(organizerUserId, req.body);
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