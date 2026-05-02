import { Request, Response, NextFunction } from "express";

// Services
import SchoolService from "src/services/SchoolService";

/** Controlador para operações relacionadas a escolas */
class SchoolController {
  constructor(private readonly service = SchoolService) {}

  /** Obtém todas as escolas */
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const schools = await this.service.getAll();
      res.status(200).send(schools);
    } catch (error) {
      next(error);
    }
  }

  /** Obtém todos os usuários associados a uma escola específica */
  async getAllUsersById(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.service.getAllUsersById(Number(req.params.id));
      res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  }

  /** Obtém uma escola específica por ID */
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const school = await this.service.getById(Number(req.params.id));
      res.status(200).send(school);
    } catch (error) {
      next(error);
    }
  }

  /** Cria uma nova escola */
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const school = await this.service.create(req.body);
      res.status(201).send(school);
    } catch (error) {
      next(error);
    }
  }

  /** Exclui uma escola existente */
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await this.service.delete(Number(req.params.id));
      res.status(201).send({ message: "Escola removida com sucesso." });
    } catch (error) {
      next(error);
    }
  }

  /** Atualiza uma escola existente */
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      await this.service.update(Number(req.params.id), req.body);
      res.status(200).send({ message: "Escola atualizada com sucesso." });
    } catch (error) {
      next(error);
    }
  }
}

export default new SchoolController();
