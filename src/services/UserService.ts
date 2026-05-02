import ErrorMessage from "src/errors/ErrorMessage";

// Interfaces
import { PermissionAttributes } from "src/models/Permission";
import { UserAttributes, UserCreationAttributes, UserDetailAttributes } from "src/models/User";

// Util
import hashPassword from "src/util/hashPassword";

// Repositories
import UserRepository from "src/repositories/UserRepository";

type UserCreateInput = Omit<UserCreationAttributes, "passwordHash"> & {
  password: string;
};

/** Serviço para operações relacionadas a usuários */
class UserService {
  constructor(private readonly repository = UserRepository) { }

  /** Obtém todos os usuários */
  async getAll(): Promise<UserAttributes[]> {
    return this.repository.getAll();
  }

  /** Busca um usuário por ID */
  async getById(id: bigint): Promise<UserAttributes> {
    const user = await this.repository.getById(id);
    if (!user) {
      throw new ErrorMessage(`Usuário com id ${id} não encontrado.`, 404);
    }
    return user;
  }

  /** Busca um usuário por email */
  async getByEmail(email: string): Promise<UserAttributes | null> {
    return this.repository.getByEmail(email);
  }

  /** Obtém todos os usuários de uma escola específica */
  async getAllBySchoolId(id: number): Promise<UserAttributes[]> {
    return this.repository.getAllBySchoolId(id);
  }

  /** Obtém detalhes completos de um usuário (com relacionamentos) */
  async getDetailById(id: bigint): Promise<UserDetailAttributes> {
    const user = await this.repository.getDetailById(id);
    if (!user) {
      throw new ErrorMessage(`Usuário com id ${id} não encontrado.`, 404);
    }
    return user.get({ plain: true }) as unknown as UserDetailAttributes;
  }

  /** Obtém todas as permissões de um usuário */
  async getAllPermissions(id: bigint): Promise<PermissionAttributes[]> {
    const userDetails = await this.getDetailById(id);
    return userDetails.role.permissions;
  }

  /** Cria um novo usuário */
  async create(user: UserCreateInput): Promise<UserAttributes> {
    // Cria versão segura do usuário com hash da senha
    const { password, ...safeUserData } = user;
    const userWithHashPassword: UserCreationAttributes = {
      ...safeUserData,
      passwordHash: hashPassword(password)
    }
    return this.repository.create(userWithHashPassword);
  }

  /** Exclui um usuário */
  async delete(id: bigint): Promise<void> {
    const affectedRows = await this.repository.delete(id);
    if (affectedRows === 0) {
      throw new ErrorMessage(`Usuário com id ${id} não encontrado.`, 404);
    }
  }

  /** Atualiza um usuário existente */
  async update(id: bigint, data: Partial<UserCreationAttributes>): Promise<void> {
    // Verifica existência antes de atualizar
    await this.getById(id);

    // Executa atualização
    const affectedRows = await this.repository.update(id, data);
    if (affectedRows === 0) {
      throw new ErrorMessage(`Nenhum dado foi alterado para o usuário ${id}.`, 409);
    }
  }
}

export default new UserService();
