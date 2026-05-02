import ErrorMessage from "src/errors/ErrorMessage";

// Interfaces
import { UserAttributes } from "src/models/User";
import { SchoolAttributes, SchoolCreationAttributes } from "src/models/School";

// Repositories
import SchoolRepository from "src/repositories/SchoolRepository";

// Services
import AnnouncementService from "./AnnouncementService";
import EventService from "./EventService";
import UserService from "./UserService";
import VenueService from "./VenueService";

/** Serviço para operações relacionadas a escolas */
class SchoolService {
  constructor(
    private readonly repository = SchoolRepository,
    private readonly announcementService = AnnouncementService,
    private readonly eventService = EventService,
    private readonly userService = UserService,
    private readonly venueService = VenueService
  ) { }

  /** Obtém todas as escolas cadastradas */
  async getAll(): Promise<SchoolAttributes[]> {
    return this.repository.getAll();
  }

  /** Obtém todos os usuários associados a uma escola */
  async getAllUsersById(id: number): Promise<UserAttributes[]> {
    return this.userService.getAllBySchoolId(id);
  }

  /** Busca uma escola por ID */
  async getById(id: number): Promise<SchoolAttributes> {
    const school = await this.repository.getById(id);
    if (!school) {
      throw new ErrorMessage(`Escola com id ${id} não encontrada.`, 404);
    }
    return school;
  }

  /** Cria uma nova escola */
  async create(data: SchoolCreationAttributes): Promise<SchoolAttributes> {
    return this.repository.create(data);
  }

  /** Exclui uma escola existente com tratamento de dependências */
  async delete(id: number): Promise<void> {
    // Valida existência da escola
    await this.getById(id);

    // Remove associação da escola em todos os usuários vinculados
    const users = await this.userService.getAllBySchoolId(id);

    for (const user of users) {
      try {
        await this.userService.update(BigInt(user.id), { schoolId: null });
      } catch (error) {
        console.error(`Erro ao atualizar usuário ${user.id}.`, error);
      }
    }

    // Remove associação da escola em todos eventos vinculados
    const events = await this.eventService.getAllBySchoolId(id);
    await this.deleteAssociatedItems(this.eventService, events, "evento", "escola", id);

    // Remove associação da escola em todos os locais vinculados
    const venues = await this.venueService.getAllBySchoolId(id);
    await this.deleteAssociatedItems(this.venueService, venues, "local", "escola", id);

    // Remove associaçãod a escola em todos os anúncios vinculados
    const announcements = await this.announcementService.getAllBySchoolId(id);
    await this.deleteAssociatedItems(this.announcementService, announcements, "anúncio", "escola", id);

    // Executa exclusão após remover dependências
    await this.repository.delete(id);
  }

  /** Função auxiliar para remover itens associados */
  private async deleteAssociatedItems(
    service: any,
    associatedItems: any[],
    itemName: string,
    parentItemName: string,
    parentId: string | number
  ): Promise<void> {
    for (const item of associatedItems) {
      try {
        await service.delete(item.id);
      } catch (error) {
        console.error(`Erro ao remover ${parentItemName} ${item.id} de ${itemName} ${parentId}`, error);
      }
    }
  }

  /** Atualiza dados de uma escola */
  async update(id: number, data: Partial<SchoolCreationAttributes>): Promise<void> {
    // Verifica existência prévia
    await this.getById(id);

    // Executa atualização
    const affectedRows = await this.repository.update(id, data);
    if (affectedRows === 0) {
      throw new ErrorMessage(`Nenhum dado foi alterado para a escola ${id}.`, 409);
    }
  }
}

export default new SchoolService();
