import ErrorMessage from "src/errors/ErrorMessage";
import { IAnnouncementCreate } from "src/interfaces/IAnnouncementCreate";
import Announcement from "src/models/Announcement";
import AnnouncementRepository from "src/repositories/AnnouncementRepository";

// Instância do repositório de anúncios
const repository = new AnnouncementRepository();

/** Serviço para operações relacionadas a anúncios */
class AnnouncementService {
  /** Obtém todos os anúncios existentes */
  async getAll(): Promise<Announcement[]> {
    return repository.getAll();
  }

  /** Busca todos os anúncios de uma escola por ID */
  async getAllBySchoolId(id: number): Promise<Announcement[]> {
    return repository.getAllBySchoolId(id);
  }

  /** Busca um anúncio por ID */
  async getById(id: number): Promise<Announcement> {
    const announcement = await repository.getById(id);
    if (!announcement) {
      throw new ErrorMessage(`Anúncio com id ${id} não encontrado.`, 404);
    }
    return announcement;
  }

  /** Cria um novo anúncio */
  async create(data: IAnnouncementCreate): Promise<Announcement> {
    return repository.create(data);
  }

  /** Exclui um anúncio existente com tratamento de dependências */
  async delete(id: number): Promise<void> {
    // Valida existência da permissão
    await this.getById(id);

    // Executa exclusão
    await repository.delete(id);
  }

  /** Atualiza dados de um anúncio */
  async update(id: number, data: Partial<Announcement>): Promise<void> {
    // Verifica existência prévia
    await this.getById(id);

    // Executa atualização
    const affectedRows = await repository.update(id, data);
    if (affectedRows === 0) {
      throw new ErrorMessage(`Nenhum dado foi alterado para o anúncio ${id}.`, 409);
    }
  }
}

export default AnnouncementService;