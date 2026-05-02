import ErrorMessage from "src/errors/ErrorMessage";
import { IPermissionCreate } from "src/interfaces/IPermission";
import Permission from "src/models/Permission";
import PermissionRepository from "src/repositories/PermissionRepository";
import RolePermissionRepository from "src/repositories/RolePermissionRepository";

/** Serviço para operações relacionadas a permissões */
class PermissionService {
  constructor(
    private readonly repository = PermissionRepository,
    private readonly rolePermissionRepository = RolePermissionRepository
  ) {}

  /** Obtém todas as permissões existentes */
  async getAll(): Promise<Permission[]> {
    return this.repository.getAll();
  }

  /** Busca uma permissão por ID */
  async getById(id: number): Promise<Permission> {
    const permission = await this.repository.getById(id);
    if (!permission) {
      throw new ErrorMessage(`Permissão com id ${id} não encontrada.`, 404);
    }
    return permission;
  }

  /** Cria uma nova permissão */
  async create(data: IPermissionCreate): Promise<Permission> {
    return this.repository.create(data);
  }

  /** Exclui uma permissão existente com tratamento de dependências */
  async delete(id: number): Promise<void> {
    // Valida existência da permissão
    await this.getById(id);

    // Desvincula permissão de todos os cargos
    await this.rolePermissionRepository.deleteByPermissionId(id);

    // Executa exclusão após remover dependências
    await this.repository.delete(id);
  }

  /** Atualiza dados de uma permissão */
  async update(id: number, data: Partial<Permission>): Promise<void> {
    // Verifica existência prévia
    await this.getById(id);

    // Executa atualização
    const affectedRows = await this.repository.update(id, data);
    if (affectedRows === 0) {
      throw new ErrorMessage(`Nenhum dado foi alterado para a permissão ${id}.`, 409);
    }
  }
}

export default new PermissionService();
