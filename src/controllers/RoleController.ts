import { Request, Response, NextFunction } from "express";
import RoleService from "src/services/RoleService";

// Instância do serviço de escolas
const service = new RoleService();

/** Controlador para operações relacionadas a cargos */
class RoleController {
  /** Obtém todos os cargos */
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const roles = await service.getAll();
      res.status(200).send(roles);
    } catch (error) {
      next(error);
    }
  }

  /** Obtém um cargo específico por ID */
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const role = await service.getById(Number(req.params.id));
      res.status(200).send(role);
    } catch (error) {
      next(error);
    }
  }

  /** Cria um novo cargo */
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const role = await service.create(req.body);
      res.status(201).send(role);
    } catch (error) {
      next(error);
    }
  }

  /** Exclui um cargo existente */
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await service.delete(Number(req.params.id));
      res.status(201).send({ message: "Cargo removido com sucesso." });
    } catch (error) {
      next(error);
    }
  }

  async assignPermissions(req: Request, res: Response, next: NextFunction) {
    try {
      await service.assignPermissions(Number(req.params.id), req.body.permissionsIds);
      res.status(200).send({ message: "Permissões do cargo atualizadas com sucesso." });
    } catch (error) {
      next(error);
    }
  }

  /** Atualiza um cargo existente */
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      await service.update(Number(req.params.id), req.body);
      res.status(200).send({ message: "Cargo atualizado com sucesso." });
    } catch (error) {
      next(error);
    }
  }
}

export default RoleController;