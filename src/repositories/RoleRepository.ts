import BaseRepository from "./BaseRepository";

// Models
import Role from "src/models/Role";
import Permission from "src/models/Permission";
import User from "src/models/User";

class RoleRepository extends BaseRepository<Role> {
  constructor() {
    super(Role);
  }

  /** Obtém todos os papéis */
  async getAll(): Promise<Role[]> {
    return this.model.findAll({
      include: [{
        model: Permission,
        through: { attributes: [] },
        attributes: ['id', 'permissionName', 'description']
      }]
    });
  }

  /** Obtém todos os papéis com os usuários associados */
  async getAllWithUsers(): Promise<Role[]> {
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

  /** Obtém um papel específico por ID */
  async getById(id: number): Promise<Role | null> {
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

export default new RoleRepository();
