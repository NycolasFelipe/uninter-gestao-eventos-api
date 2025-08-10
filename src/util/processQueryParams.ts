import { requestContext } from "src/context/requestContext";
import { IParams } from "src/interfaces/IParams";
import UserService from "src/services/UserService";

enum UserRole {
  ADMINISTRATOR = "Administrador"
}

/**
 * Processa os parâmetros de consulta com base no papel do usuário.
 * Para não-administradores, adiciona filtros de usuário e escola automaticamente.
 */
async function processQueryParams<T extends IParams>(params?: T): Promise<T> {
  // Obtém contexto da requisição e ID do usuário
  const context = requestContext.get();
  const userId = context?.payload.id;

  // Busca informações completas do usuário
  const user = await UserService.getDetailById(userId);
  const isAdmin = user.role.roleName === UserRole.ADMINISTRATOR;

  // Se não for administrador, adiciona filtros obrigatórios
  if (!isAdmin) {
    return {
      ...params,
      userId: Number(user.id),
      schoolId: Number(user.school.id)
    } as unknown as T;
  }

  // Para administradores retorna os parâmetros originais
  return {
    ...params,
    adminId: Number(user.id),
  } as unknown as T;
}

export default processQueryParams;