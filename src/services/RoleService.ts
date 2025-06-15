import ErrorMessage from "src/errors/ErrorMessage";
import { IRoleCreate } from "src/interfaces/IRole";
import Role from "src/models/Role";
import RolePermissionRepository from "src/repositories/RolePermissionRepository";
import RoleRepository from "src/repositories/RoleRepository";
import PermissionService from "./PermissionService";

// Instância do repositório de cargos
const repository = new RoleRepository();

/** Serviço para operações relacionadas a cargos */
class RoleService {
  /** Obtém todos os cargos existentes */
  async getAll(): Promise<Role[]> {
    return repository.getAll();
  }

  /** Busca um cargo por ID */
  async getById(id: number): Promise<Role> {
    const role = await repository.getById(id);
    if (!role) {
      throw new ErrorMessage(`Cargo com id ${id} não encontrado.`, 404);
    }
    return role;
  }

  /** Cria uma novo cargo */
  async create(data: IRoleCreate): Promise<Role> {
    return repository.create(data);
  }

  /** Exclui um cargo existente com tratamento de dependências */
  async delete(id: number): Promise<void> {
    // Valida existência do cargo
    await this.getById(id);

    // Busca todas as permissões vinculadas ao cargo
    const rolePermissionRepository = new RolePermissionRepository();
    const rolePermissions = await rolePermissionRepository.getAllByRoleId(id);

    // Remove todos as associações de permissões vinculadas ao cargo
    for (const permission of rolePermissions) {
      try {
        await rolePermissionRepository.deleteByRoleId(id, permission.id);
      } catch (error) {
        console.error(`Erro ao atualizar cargo ${id}`, error);
      }
    }

    // Executa exclusão após remover dependências
    await repository.delete(id);
  }

  /** Vincular/Desvincular permissões a/de um cargo */
  async assignPermissions(id: number, permissionsIds: number[]) {
    // Validar existência do cargo
    await this.getById(id);

    // Inicialia serviços/permissões necessárias
    const permissionService = new PermissionService();
    const rolePermissionRepository = new RolePermissionRepository();

    // Verifica se permissionsIds tem formato correto
    if (!Array.isArray(permissionsIds)) {
      throw new ErrorMessage("Campo permissionsIds precisa ser no formato number[]", 400);
    }

    // Validar existência das permissões
    for (const permissionId of permissionsIds) {
      await permissionService.getById(permissionId);
    }

    // Remove todas as permissões vinculadas atualmente
    await rolePermissionRepository.deleteByRoleId(id);

    // Vincula permissões atualizadas
    for (const permissionId of permissionsIds) {
      await rolePermissionRepository.create({ roleId: id, permissionId });
    }
  }

  /** Atualiza dados de um cargo */
  async update(id: number, data: Partial<Role>): Promise<void> {
    // Verifica existência prévia
    await this.getById(id);

    // Executa atualização
    const affectedRows = await repository.update(id, data);
    if (affectedRows === 0) {
      throw new ErrorMessage(`Nenhum dado foi alterado para o cargo ${id}.`, 409);
    }
  }
}

export default RoleService;