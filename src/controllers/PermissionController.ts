import { Request, Response, NextFunction } from "express";

// Services
import PermissionService from "src/services/PermissionService";

class PermissionController {
  constructor(private readonly service = PermissionService) {}

  /** Obtém todas as permissões */
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const permissions = await this.service.getAll();
      res.status(200).send(permissions);
    } catch (error) {
      next(error);
    }
  }

  /** Obtém uma permissão específica por ID */
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const permission = await this.service.getById(Number(req.params.id));
      res.status(200).send(permission);
    } catch (error) {
      next(error);
    }
  }

  /** Cria uma nova permissão */
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const permission = await this.service.create(req.body);
      res.status(201).send(permission);
    } catch (error) {
      next(error);
    }
  }

  /** Exclui uma permissão existente */
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await this.service.delete(Number(req.params.id));
      res.status(201).send({ message: "Permissão removida com sucesso." });
    } catch (error) {
      next(error);
    }
  }

  /** Atualiza uma permissão existente */
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      await this.service.update(Number(req.params.id), req.body);
      res.status(200).send({ message: "Permissão atualizada com sucesso." });
    } catch (error) {
      next(error);
    }
  }
}

export default new PermissionController();
