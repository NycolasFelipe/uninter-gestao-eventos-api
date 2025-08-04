import { Sequelize } from "sequelize";
import BaseRepository from "./BaseRepository";

// Models
import User from "src/models/User";
import Role from "src/models/Role";
import Permission from "src/models/Permission";
import School from "src/models/School";

/** Repositório para operações com o modelo User */
class UserRepository extends BaseRepository<User> {
  constructor() {
    super(User);
  }

  /** Obtém todos os usuários */
  async getAll() {
    const users = await this.model.findAll({
      attributes: {
        exclude: ['passwordHash', 'schoolId', 'roleId'],
        include: [
          [Sequelize.col('role.roleName'), 'role'],
          [Sequelize.col('school.name'), 'school']
        ]
      },
      include: [{
        model: Role,
        as: 'role',
        attributes: []
      },
      {
        model: School,
        as: 'school',
        attributes: []
      }],
      raw: true
    });

    return users;
  }

  /** Obtém detalhes de um usuário por ID incluindo relacionamentos */
  async getDetailById(id: number | bigint): Promise<User | null> {
    return this.model.findOne({
      where: { id },
      include: [{
        model: Role,
        include: [{
          model: Permission,
          through: { attributes: [] },
          attributes: ['id', 'permissionName', 'description']
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
          model: Permission,
          through: { attributes: [] },
          attributes: ['id', 'permissionName', 'description']
        }]
      }],
      attributes: {
        exclude: ['passwordHash'] // Remove informação sensível
      }
    });
  }
}

export default UserRepository;