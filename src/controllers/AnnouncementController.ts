import { Request, Response, NextFunction } from "express";
import AnnouncementService from "src/services/AnnouncementService";

// Instância do serviço de anúncios
const service = new AnnouncementService();

/** Controlador para operações relacionadas a anúncios */
class AnnouncementController {
  /** Obtém todos os anúncios */
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const announcements = await service.getAll();
      res.status(200).send(announcements);
    } catch (error) {
      next(error);
    }
  }

  /** Obtém todos os anúncios de uma escola por ID */
  async getAllBySchoolId(req: Request, res: Response, next: NextFunction) {
    try {
      const announcements = await service.getAllBySchoolId(Number(req.params.schoolId));
      res.status(200).send(announcements);
    } catch (error) {
      next(error);
    }
  }

  /** Obtém um anúncio específico por ID */
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const announcement = await service.getById(Number(req.params.id));
      res.status(200).send(announcement);
    } catch (error) {
      next(error);
    }
  }

  /** Cria um novo anúncio */
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const event = await service.create(req.body);
      res.status(201).send(event);
    } catch (error) {
      next(error);
    }
  }

  /** Exclui um anúncio existente */
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await service.delete(Number(req.params.id));
      res.status(201).send({ message: "Anúncio removido com sucesso." });
    } catch (error) {
      next(error);
    }
  }

  /** Atualiza um anúncio existente */
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      await service.update(Number(req.params.id), req.body);
      res.status(200).send({ message: "Anúncio atualizado com sucesso." });
    } catch (error) {
      next(error);
    }
  }
}

export default AnnouncementController;