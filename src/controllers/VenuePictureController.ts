import { Request, Response, NextFunction } from "express";
import VenuePictureService from "src/services/VenuePictureService";

// Instância do serviço de imagens de locais
const service = new VenuePictureService();

/** Controlador para operações relacionadas a imagens de locais */
class VenuePictureController {
  /** Cria uma nova imagem associada a um local */
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const venuePicture = await service.create(req.body);
      res.status(201).send(venuePicture);
    } catch (error) {
      next(error);
    }
  }

  /** Exclui uma imagem de local existente */
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await service.delete(Number(req.params.id));
      res.status(201).send({ message: "Imagem do local removida com sucesso." });
    } catch (error) {
      next(error);
    }
  }

  /** Atualiza uma imagem de local existente */
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      await service.update(Number(req.params.id), req.body);
      res.status(200).send({ message: "Imagem do local atualizada com sucesso." });
    } catch (error) {
      next(error);
    }
  }
}

export default VenuePictureController;