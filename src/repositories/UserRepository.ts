import BaseRepository from "./BaseRepository";

// Models
import User from "src/models/User";
import Role from "src/models/Role";
import Permission from "src/models/Permission";
import School from "src/models/School";
import RolePermission from "src/models/RolePermission";

/** Repositório para operações com o modelo User */
class UserRepository extends BaseRepository<User> {
  constructor() {
    super(User);
  }

  /** Obtém detalhes de um usuário por ID incluindo relacionamentos */
  async getDetailById(id: number | bigint): Promise<User | null> {
    return this.model.findOne({
      where: { id },
      include: [{
        model: Role,
        include: [{
          model: RolePermission,
          include: [{
            model: Permission
          }]
        }]
      }, {
        model: School
      }],
      attributes: {
        exclude: ["passwordHash", "schoolId", "roleId"] // Exclui campos sensíveis/desnecessários
      }
    });
  }

  /** Busca um usuário pelo email */
  async getByEmail(email: string): Promise<User | null> {
    return this.model.findOne({ where: { email } });
  }

  /** Obtém todos os usuários de uma escola específica */
  async getAllBySchoolId(id: number | bigint): Promise<User[]> {
    return this.model.findAll({
      where: { schoolId: id },
      attributes: {
        exclude: ['passwordHash'] // Remove informação sensível
      }
    });
  }

  /** Obtém todos os usuários com cargos e permissões */
  async getAllWithRoles(): Promise<User[]> {
    return this.model.findAll({
      include: [{
        model: Role,
        include: [{
          model: Permission // Associação direta entre Role e Permission
        }]
      }],
      attributes: {
        exclude: ['passwordHash'] // Remove informação sensível
      }
    });
  }
}

export default UserRepository;