import BaseRepository from "./BaseRepository";

// Models
import RolePermission from "src/models/RolePermission";

class RolePermissionRepository extends BaseRepository<RolePermission> {
  constructor() {
    super(RolePermission);
  }

  /** Buscar todas as permissões de um cargo */
  async getAllByRoleId(roleId: number): Promise<RolePermission[]> {
    return this.model.findAll({ where: { roleId } });
  }

  /** Desvincular permissões de um cargo */
  async deleteByRoleId(roleId: number, permissionId?: number): Promise<number> {
    return this.model.destroy({ where: permissionId ? { roleId, permissionId } : { roleId } });
  }

  /** Desvincular permissão de todos os cargos */
  async deleteByPermissionId(permissionId: number): Promise<number> {
    return this.model.destroy({ where: { permissionId } });
  }
}

export default RolePermissionRepository;