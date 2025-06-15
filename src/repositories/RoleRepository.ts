import BaseRepository from "./BaseRepository";

// Models
import Role from "src/models/Role";
import RolePermission from "src/models/RolePermission";
import Permission from "src/models/Permission";

class RoleRepository extends BaseRepository<Role> {
  constructor() {
    super(Role);
  }

  getAll(): Promise<Role[]> {
    return this.model.findAll({
      include: [{
        model: RolePermission,
        include: [{
          model: Permission
        }]
      }]
    })
  }

  getById(id: number | bigint): Promise<Role | null> {
    return this.model.findOne({
      where: { id },
      include: [{
        model: RolePermission,
        include: [{
          model: Permission
        }]
      }]
    })
  }
}

export default RoleRepository;