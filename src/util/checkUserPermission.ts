import UserService from "src/services/UserService";

// Instância do serviço de usuários
const service = new UserService();

const checkUserPermission = async (userId: bigint, permissionUser: string): Promise<boolean> => {
  const permissions = await service.getAllPermissions(userId);
  return permissions.some(permission => permission.permissionName === permissionUser);
}

export default checkUserPermission;