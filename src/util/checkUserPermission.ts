import UserService from "src/services/UserService";

const service = UserService;

const checkUserPermission = async (userId: bigint, permissionUser: string): Promise<boolean> => {
  const permissions = await service.getAllPermissions(userId);
  return permissions.some(permission => permission.permissionName === permissionUser);
}

export default checkUserPermission;
