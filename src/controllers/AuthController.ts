import { NextFunction, Request, Response } from "express";

// Services
import AuthService from "src/services/AuthService";

class AuthController {
  constructor(private readonly service = AuthService) {}

  /** Realiza o login de um usuário */
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = await this.service.login(req.body.email, req.body.password);
      res.status(200).send(token);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
