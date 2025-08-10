import { Request, Response, NextFunction } from "express";

// Services
import EventService from "src/services/EventService";


/** Controlador para operações relacionadas a eventos */
class EventController {
  /** Obtém todos os eventos */
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, schoolId, limit, offset } = req.query;
      const queryParams = {
        ...(status && { status: status as string }),
        ...(limit && { limit: Number(limit) }),
        ...(offset && { offset: Number(offset) }),
        ...(schoolId && { schoolId: Number(schoolId) }),
      }
      const events = await EventService.getAll(queryParams);
      res.status(200).json(events);
    } catch (error) {
      next(error);
    }
  }

  /** Obtém todos os eventos com detalhes */
  async getAllDetailed(req: Request, res: Response, next: NextFunction) {
    const { status, limit, offset } = req.query;
    try {
      const events = await EventService.getAllDetailed({
        ...(status && { status: status as string }),
        ...(limit && { limit: Number(limit) }),
        ...(offset && { offset: Number(offset) })
      });
      res.status(200).send(events);
    } catch (error) {
      next(error);
    }
  }

  /** Obtém todos os eventos de um tipo por ID */
  async getAllByEventTypeId(req: Request, res: Response, next: NextFunction) {
    const { eventTypeIds, limit, offset } = req.query;
    try {
      const events = await EventService.getAll({
        eventTypeIds: eventTypeIds as string,
        ...(limit && { limit: Number(limit) }),
        ...(offset && { offset: Number(offset) })
      });
      res.status(200).send(events);
    } catch (error) {
      next(error);
    }
  }

  /** Obtém todos os eventos de um tipo por status */
  async getAllByEventStatus(req: Request, res: Response, next: NextFunction) {
    const { status, limit, offset } = req.query;
    try {
      const events = await EventService.getAll({
        status: status as string,
        ...(limit && { limit: Number(limit) }),
        ...(offset && { offset: Number(offset) }),
      });
      res.status(200).send(events);
    } catch (error) {
      next(error);
    }
  }

  /** Obtém todos os eventos de uma escola por ID */
  async getAllBySchoolId(req: Request, res: Response, next: NextFunction) {
    const { limit, offset } = req.query;
    try {
      const events = await EventService.getAll({
        schoolId: Number(req.params.schoolId),
        ...(limit && { limit: Number(limit) }),
        ...(offset && { offset: Number(offset) }),
      });
      res.status(200).send(events);
    } catch (error) {
      next(error);
    }
  }

  /** Obtém um evento específico por ID */
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const event = await EventService.getById({
        eventId: Number(req.params.id)
      });
      res.status(200).send(event);
    } catch (error) {
      next(error);
    }
  }

  /** Cria um novo evento */
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const event = await EventService.create(req.body);
      res.status(201).send(event);
    } catch (error) {
      next(error);
    }
  }

  /** Exclui um evento existente */
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await EventService.delete(Number(req.params.id));
      res.status(201).send({ message: "Evento removido com sucesso." });
    } catch (error) {
      next(error);
    }
  }

  /** Atualiza um evento existente */
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      await EventService.update(Number(req.params.id), req.body);
      res.status(200).send({ message: "Evento atualizado com sucesso." });
    } catch (error) {
      next(error);
    }
  }
}

export default EventController;