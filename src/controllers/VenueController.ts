import { Request, Response, NextFunction } from "express";
import VenueService from "src/services/VenueService";

// Instância do serviço de locais
const service = new VenueService();

/** Controlador para operações relacionadas a locais */
class VenueController {
  /** Obtém todos os locais cadastrados */
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const venues = await service.getAll();
      res.status(200).send(venues);
    } catch (error) {
      next(error);
    }
  }

  /** Obtém um local específico por ID */
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const venue = await service.getById(Number(req.params.id));
      res.status(200).send(venue);
    } catch (error) {
      next(error);
    }
  }

  /** Cria um novo local */
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const venue = await service.create(req.body);
      res.status(201).send(venue);
    } catch (error) {
      next(error);
    }
  }

  /** Exclui um local existente */
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await service.delete(Number(req.params.id));
      res.status(201).send({ message: "Local removido com sucesso." });
    } catch (error) {
      next(error);
    }
  }

  /** Atualiza um local existente */
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      await service.update(Number(req.params.id), req.body);
      res.status(200).send({ message: "Local atualizado com sucesso." });
    } catch (error) {
      next(error);
    }
  }
}

export default VenueController;