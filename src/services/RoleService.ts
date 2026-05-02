import ErrorMessage from "src/errors/ErrorMessage";
import { IRoleCreate } from "src/interfaces/IRole";
import Role from "src/models/Role";
import RolePermissionRepository from "src/repositories/RolePermissionRepository";
import RoleRepository from "src/repositories/RoleRepository";
import PermissionService from "./PermissionService";

/** Serviço para operações relacionadas a cargos */
class RoleService {
  constructor(
    private readonly repository = RoleRepository,
    private readonly rolePermissionRepository = RolePermissionRepository,
    private readonly permissionService = PermissionService
  ) {}

  /** Obtém todos os cargos existentes */
  async getAll(): Promise<Role[]> {
    return this.repository.getAll();
  }

  /** Obtém todos os cargos e os usuários vinculados */
  async getAllWithUsers(): Promise<Role[]> {
    return this.repository.getAllWithUsers();
  }

  /** Busca um cargo por ID */
  async getById(id: number): Promise<Role> {
    const role = await this.repository.getById(id);
    if (!role) {
      throw new ErrorMessage(`Cargo com id ${id} não encontrado.`, 404);
    }
    return role;
  }

  /** Cria uma novo cargo */
  async create(data: IRoleCreate): Promise<Role> {
    return this.repository.create(data);
  }

  /** Exclui um cargo existente com tratamento de dependências */
  async delete(id: number): Promise<void> {
    // Valida existência do cargo
    await this.getById(id);

    // Busca todas as permissões vinculadas ao cargo
    const rolePermissions = await this.rolePermissionRepository.getAllByRoleId(id);

    // Remove todos as associações de permissões vinculadas ao cargo
    for (const permission of rolePermissions) {
      try {
        await this.rolePermissionRepository.deleteByRoleId(id, permission.id);
      } catch (error) {
        console.error(`Erro ao atualizar cargo ${id}`, error);
      }
    }

    // Executa exclusão após remover dependências
    await this.repository.delete(id);
  }

  /** Vincular/Desvincular permissões a/de um cargo */
  async assignPermissions(id: number, permissionsIds: number[]) {
    // Validar existência do cargo
    await this.getById(id);

    // Validar formato dos IDs
    if (!Array.isArray(permissionsIds)) {
      throw new ErrorMessage("Campo permissionsIds precisa ser no formato number[]", 400);
    }

    // Validar existência das permissões
    for (const permissionId of permissionsIds) {
      await this.permissionService.getById(permissionId);
    }

    // Atualizar permissões
    // Remover permissões existentes
    await this.rolePermissionRepository.deleteByRoleId(id);

    // Adicionar novas permissões
    for (const permissionId of permissionsIds) {
      await this.rolePermissionRepository.create({ roleId: id, permissionId });
    }
  }

  /** Atualiza dados de um cargo */
  async update(id: number, data: Partial<Role>): Promise<void> {
    // Verifica existência prévia
    await this.getById(id);

    // Executa atualização
    const affectedRows = await this.repository.update(id, data);
    if (affectedRows === 0) {
      throw new ErrorMessage(`Nenhum dado foi alterado para o cargo ${id}.`, 409);
    }
  }
}

export default new RoleService();
