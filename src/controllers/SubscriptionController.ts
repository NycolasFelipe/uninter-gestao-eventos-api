import { Request, Response, NextFunction } from "express";
import SubscriptionService from "src/services/SubscriptionService";
import extractTokenId from "src/util/extractTokenId";

// Instância do serviço de inscrições
const service = new SubscriptionService();

/** Controlador para operações relacionadas a inscrições em eventos */
class SubscriptionController {
  /** Obtém todas as inscrições */
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const subscriptions = await service.getAll();
      res.status(200).send(subscriptions);
    } catch (error) {
      next(error);
    }
  }

  /** Obtém todas as inscrições associadas a um usuário */
  async getAllByUserId(req: Request, res: Response, next: NextFunction) {
    const id = extractTokenId(req);
    try {
      const subscriptions = await service.getAllByUserId(Number(id));
      res.status(200).send(subscriptions);
    } catch (error) {
      next(error);
    }
  }

  /** Obtém todas as inscrições associadas a um evento */
  async getAllByEventId(req: Request, res: Response, next: NextFunction) {
    try {
      const subscriptions = await service.getAllByEventId(Number(req.params.id));
      res.status(200).send(subscriptions);
    } catch (error) {
      next(error);
    }
  }

  /** Obtém uma inscrição específica por ID */
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const subscription = await service.getById(Number(req.params.id));
      res.status(200).send(subscription);
    } catch (error) {
      next(error);
    }
  }

  /** Cria uma nova inscrição */
  async create(req: Request, res: Response, next: NextFunction) {
    const id = extractTokenId(req);
    try {
      const subscription = await service.create({ ...req.body, userId: id });
      res.status(201).send(subscription);
    } catch (error) {
      next(error);
    }
  }

  /** Cancela uma inscrição existente */
  async cancel(req: Request, res: Response, next: NextFunction) {
    const id = extractTokenId(req);
    const userId = Number(id);
    const eventId = Number(req.params.id);
    try {
      await service.cancel(eventId, userId);
      res.status(201).send({ message: "Inscrição cancelada com sucesso." });
    } catch (error) {
      next(error);
    }
  }
}

export default SubscriptionController;