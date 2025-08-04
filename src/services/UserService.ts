import ErrorMessage from "src/errors/ErrorMessage";
import { IUserCreate } from "src/interfaces/IUser";
import Permission from "src/models/Permission";
import User from "src/models/User";
import UserRepository from "src/repositories/UserRepository";
import hashPassword from "src/util/hashPassword";

// Instância do repositório de usuários
const repository = new UserRepository();

/** Serviço para operações relacionadas a usuários */
class UserService {
  /** Obtém todos os usuários */
  async getAll(): Promise<User[]> {
    return repository.getAll();
  }

  /** Busca um usuário por ID */
  async getById(id: bigint): Promise<User> {
    const user = await repository.getById(id);
    if (!user) {
      throw new ErrorMessage(`Usuário com id ${id} não encontrado.`, 404);
    }
    return user;
  }

  /** Busca um usuário por email */
  async getByEmail(email: string): Promise<User |null> {
    return await repository.getByEmail(email);
  }

  /** Obtém todos os usuários de uma escola específica */
  async getAllBySchoolId(id: number): Promise<User[]> {
    return await repository.getAllBySchoolId(id);
  }

  /** Obtém detalhes completos de um usuário (com relacionamentos) */
  async getDetailById(id: bigint): Promise<User> {
    const user = await repository.getDetailById(id);
    if (!user) {
      throw new ErrorMessage(`Usuário com id ${id} não encontrado.`, 404);
    }
    return user;
  }

  /** Obtém todas as permissões de um usuário */
  async getAllPermissions(id: bigint): Promise<Permission[]> {
    const userDetails = await this.getDetailById(id);
    return userDetails.role.permissions;
  }

  /** Cria um novo usuário */
  async create(user: IUserCreate): Promise<User> {
    // Cria versão segura do usuário com hash da senha
    const userWithHashPassword = {
      ...user,
      passwordHash: hashPassword(user.password)
    }
    return repository.create(userWithHashPassword);
  }

  /** Exclui um usuário */
  async delete(id: bigint): Promise<void> {
    const affectedRows = await repository.delete(id);
    if (affectedRows === 0) {
      throw new ErrorMessage(`Usuário com id ${id} não encontrado.`, 404);
    }
  }

  /** Atualiza um usuário existente */
  async update(id: bigint, data: Partial<User>): Promise<void> {
    // Verifica existência antes de atualizar
    await this.getById(id);

    // Executa atualização
    const affectedRows = await repository.update(id, data);
    if (affectedRows === 0) {
      throw new ErrorMessage(`Nenhum dado foi alterado para o usuário ${id}.`, 409);
    }
  }
}

export default UserService;