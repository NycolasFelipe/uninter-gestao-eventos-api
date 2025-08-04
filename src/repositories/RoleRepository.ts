import BaseRepository from "./BaseRepository";

// Models
import Role from "src/models/Role";
import Permission from "src/models/Permission";
import User from "src/models/User";

class RoleRepository extends BaseRepository<Role> {
  constructor() {
    super(Role);
  }

  getAll(): Promise<Role[]> {
    return this.model.findAll({
      include: [{
        model: Permission,
        through: { attributes: [] },
        attributes: ['id', 'permissionName', 'description']
      }]
    });
  }
  getAllWithUsers(): Promise<Role[]> {
    return this.model.findAll({
      include: [
        {
          model: Permission,
          through: { attributes: [] },
          attributes: ['id', 'permissionName', 'description']
        },
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName', 'email', 'isActive'],
        }
      ]
    });
  }

  getById(id: number | bigint): Promise<Role | null> {
    return this.model.findOne({
      where: { id },
      include: [{
        model: Permission,
        through: { attributes: [] },
        attributes: ['id', 'permissionName', 'description']
      }]
    });
  }
}

export default RoleRepository;