import { Request, Response, NextFunction } from "express";
import { IUserCreateResponse } from "src/interfaces/IUser";
import UserService from "src/services/UserService";

// Util
import checkUserPermission from "src/util/checkUserPermission";
import extractTokenId from "src/util/extractTokenId";

// Instância do serviço de usuários
const service = new UserService();

/** Controlador para operações relacionadas a usuários */
class UserController {
  /** Obtém todos os usuários */
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await service.getAll();
      res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  }

  /** Obtém um usuário por ID */
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await service.getById(BigInt(req.params.id));
      const userData = user.get({ plain: true });
      const { passwordHash, ...userWithoutPassword } = userData;
      res.status(200).send(userWithoutPassword);
    } catch (error) {
      next(error);
    }
  }

  /** Obtém detalhes completos de um usuário */
  async getDetailById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: requestedId } = req.params;
      const authenticatedUserId = extractTokenId(req);

      // Determinar qual ID usar
      let userId: bigint;

      // Caso de visualização do próprio usuário
      if (!requestedId || requestedId === authenticatedUserId) {
        userId = BigInt(authenticatedUserId);

        // Caso de visualização de outro usuário - verificar permissão
      } else {
        const hasPermission = await checkUserPermission(BigInt(authenticatedUserId), 'users.get');
        if (!hasPermission) {
          res.status(403).json({ message: 'Acesso não autorizado para visualização de outros usuários' });
        }
        userId = BigInt(requestedId);
      }

      // Obter e retornar os dados do usuário
      const user = await service.getDetailById(userId);
      res.status(200).json(user);

    } catch (error) {
      next(error);
    }
  }

  /** Cria um novo usuário */
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await service.create(req.body);
      const userData = user.get({ plain: true });
      const { passwordHash, ...userWithoutPassword } = userData; // Remove senha

      // Retorna usuário criado sem senha com tipo específico
      res.status(201).send(userWithoutPassword as unknown as IUserCreateResponse);
    } catch (error) {
      next(error);
    }
  }

  /** Exclui um usuário */
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await service.delete(BigInt(req.params.id));
      res.status(201).send({ message: "Usuário removido com sucesso." });
    } catch (error) {
      next(error);
    }
  }

  /** Atualiza um usuário existente */
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      await service.update(BigInt(req.params.id), req.body);
      res.status(200).send({ message: "Usuário atualizado com sucesso." });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;