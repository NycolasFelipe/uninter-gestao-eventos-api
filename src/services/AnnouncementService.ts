import ErrorMessage from "src/errors/ErrorMessage";
import { IAnnouncementCreate } from "src/interfaces/IAnnouncement";
import Announcement from "src/models/Announcement";
import AnnouncementRepository from "src/repositories/AnnouncementRepository";

/** Serviço para operações relacionadas a anúncios */
class AnnouncementService {
  constructor(private readonly repository = AnnouncementRepository) {}

  /** Obtém todos os anúncios existentes */
  async getAll(): Promise<Announcement[]> {
    return this.repository.getAll();
  }

  /** Busca todos os anúncios de uma escola por ID */
  async getAllBySchoolId(id: number): Promise<Announcement[]> {
    return this.repository.getAllBySchoolId(id);
  }

  /** Busca um anúncio por ID */
  async getById(id: number): Promise<Announcement> {
    const announcement = await this.repository.getById(id);
    if (!announcement) {
      throw new ErrorMessage(`Anúncio com id ${id} não encontrado.`, 404);
    }
    return announcement;
  }

  /** Cria um novo anúncio */
  async create(data: IAnnouncementCreate): Promise<Announcement> {
    return this.repository.create(data);
  }

  /** Exclui um anúncio existente com tratamento de dependências */
  async delete(id: number): Promise<void> {
    // Valida existência da permissão
    await this.getById(id);

    // Executa exclusão
    await this.repository.delete(id);
  }

  /** Atualiza dados de um anúncio */
  async update(id: number, data: Partial<Announcement>): Promise<void> {
    // Verifica existência prévia
    await this.getById(id);

    // Executa atualização
    const affectedRows = await this.repository.update(id, data);
    if (affectedRows === 0) {
      throw new ErrorMessage(`Nenhum dado foi alterado para o anúncio ${id}.`, 409);
    }
  }
}

export default new AnnouncementService();
