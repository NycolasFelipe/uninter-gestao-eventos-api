import { NextFunction, Request, Response } from "express";
import AuthService from "src/services/AuthService";

// Instância do serviço de autenticação
const service = new AuthService();

class AuthController {
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = await service.login(req.body.email, req.body.password);
      res.status(200).send(token);
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;