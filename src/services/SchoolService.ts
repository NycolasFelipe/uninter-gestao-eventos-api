import ErrorMessage from "src/errors/ErrorMessage";
import { ISchoolCreate } from "src/interfaces/ISchool";
import SchoolRepository from "src/repositories/SchoolRepository";

// Models
import School from "src/models/School";
import User from "src/models/User";

// Services
import AnnouncementService from "./AnnouncementService";
import EventService from "./EventService";
import UserService from "./UserService";
import VenueService from "./VenueService";

// Instância do repositório de escolas
const repository = new SchoolRepository();

/** Serviço para operações relacionadas a escolas */
class SchoolService {
  /** Obtém todas as escolas cadastradas */
  async getAll(): Promise<School[]> {
    return repository.getAll();
  }

  /** Obtém todos os usuários associados a uma escola */
  async getAllUsersById(id: number): Promise<User[]> {
    const userService = new UserService();
    return await userService.getAllBySchoolId(id);
  }

  /** Busca uma escola por ID */
  async getById(id: number): Promise<School> {
    const school = await repository.getById(id);
    if (!school) {
      throw new ErrorMessage(`Escola com id ${id} não encontrada.`, 404);
    }
    return school;
  }

  /** Cria uma nova escola */
  async create(data: ISchoolCreate): Promise<School> {
    return repository.create(data);
  }

  /** Exclui uma escola existente com tratamento de dependências */
  async delete(id: number): Promise<void> {
    // Valida existência da escola
    await this.getById(id);

    // Remove associação da escola em todos os usuários vinculados
    const userService = new UserService();
    const users = await userService.getAllBySchoolId(id);

    for (const user of users) {
      try {
        await userService.update(user.id, { schoolId: null });
      } catch (error) {
        console.error(`Erro ao atualizar usuário ${user.id}.`, error);
      }
    }

    // Remove associação da escola em todos eventos vinculados
    const eventService = new EventService();
    const events = await eventService.getAllBySchoolId(id);
    await this.deleteAssociatedItems(eventService, events, "evento", "escola", id);

    // Remove associação da escola em todos os locais vinculados
    const venueService = new VenueService();
    const venues = await venueService.getAllBySchoolId(id);
    await this.deleteAssociatedItems(venueService, venues, "local", "escola", id);

    // Remove associaçãod a escola em todos os anúncios vinculados
    const announcementService = new AnnouncementService();
    const announcements = await announcementService.getAllBySchoolId(id);
    await this.deleteAssociatedItems(announcementService, announcements, "anúncio", "escola", id);

    // Executa exclusão após remover dependências
    await repository.delete(id);
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
  async update(id: number, data: Partial<School>): Promise<void> {
    // Verifica existência prévia
    await this.getById(id);

    // Executa atualização
    const affectedRows = await repository.update(id, data);
    if (affectedRows === 0) {
      throw new ErrorMessage(`Nenhum dado foi alterado para a escola ${id}.`, 409);
    }
  }
}

export default SchoolService;