import { Request, Response, NextFunction } from "express";

// Services
import VenuePictureService from "src/services/VenuePictureService";

class VenuePictureController {
  constructor(private readonly service = VenuePictureService) {}

  /** Obtém todas as imagens de locais cadastradas */
  async getAll(req: Request, res: Response, next: NextFunction) {
    const options = req.query;
    try {
      const venues = await this.service.getAll(options);
      res.status(200).send(venues);
    } catch (error) {
      next(error);
    }
  }

  /** Obtém uma imagem de local específico por ID */
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const venue = await this.service.getById(Number(req.params.id));
      res.status(200).send(venue);
    } catch (error) {
      next(error);
    }
  }

  /** Obtém todas as imagens de um local específico */
  async getAllByVenueId(req: Request, res: Response, next: NextFunction) {
    try {
      const venue = await this.service.getAllByVenueId(Number(req.params.id));
      res.status(200).send(venue);
    } catch (error) {
      next(error);
    }
  }

  /** Cria uma nova imagem associada a um local */
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      await this.service.create(req.body);
      res.status(201).send({ message: "Imagens do local salvas com sucesso." });
    } catch (error) {
      next(error);
    }
  }

  /** Exclui uma imagem de local existente */
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await this.service.delete(Number(req.params.id));
      res.status(201).send({ message: "Imagem do local removida com sucesso." });
    } catch (error) {
      next(error);
    }
  }

  /** Atualiza uma imagem de local existente */
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      await this.service.update(Number(req.params.id), req.body);
      res.status(200).send({ message: "Imagem do local atualizada com sucesso." });
    } catch (error) {
      next(error);
    }
  }
}

export default new VenuePictureController();
