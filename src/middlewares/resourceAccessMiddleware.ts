import { Request, Response, NextFunction } from "express";
import ErrorMessage from "src/errors/ErrorMessage";
import UserService from "src/services/UserService";

const userService = new UserService();

const resourceAccessMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // Extrai o nome do recurso da URL usando regex: /api/vX/recurso
  const resourceMatch = req.originalUrl.match(/\/api\/v\d+\/([^\/?]+)/);
  if (!resourceMatch) {
    throw new ErrorMessage("URL inválida: padrão não reconhecido", 400);
  }
  const resource = resourceMatch[1];

  // Normaliza o método HTTP para minúsculas
  const method = req.method.toLowerCase();

  // Constrói a permissão no formato 'metodo.recurso'
  const requiredPermission = `${resource}.${method}`;

  // Verifica acesso administrativo via token especial
  if (req.headers["x-admin-token"]) {
    return next();
  }

  // Valida a estrutura do payload do token JWT
  if (!req.payload || typeof req.payload !== 'object' || !('id' in req.payload)) {
    throw new ErrorMessage("Token inválido: payload ausente ou malformado", 401);
  }
  const userId = req.payload.id;

  // Obtém todas as permissões do usuário
  const userPermissions = await userService.getAllPermissions(userId);
  const permissionNames = userPermissions.map(p => p.permissionName);

  // Verifica se o usuário possui a permissão necessária
  if (!permissionNames.includes(requiredPermission)) {
    console.log(`Acesso negado: Usuário ${userId} não tem permissão para ${requiredPermission}`);
    throw new ErrorMessage(`Acesso negado: Usuário não tem permissão para ${requiredPermission}`, 403);
  }

  next();
}

export default resourceAccessMiddleware;