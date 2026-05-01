import ErrorMessage from "src/errors/ErrorMessage";
import { IVenueCreate } from "src/interfaces/IVenue";
import Venue from "src/models/Venue";
import VenueRepository from "src/repositories/VenueRepository";
import VenuePictureService from "./VenuePictureService";

/** Serviço para operações relacionadas a locais */
class VenueService {
  constructor(
    private readonly repository = VenueRepository,
    private readonly venuePictureService = VenuePictureService
  ) {}

  /** Obtém todos os locais cadastrados */
  async getAll(): Promise<Venue[]> {
    return this.repository.getAll();
  }

  async getAllBySchoolId(schoolId: number): Promise<Venue[]> {
    return this.repository.getAllBySchoolId(schoolId);
  }

  /** Busca um local específico por ID */
  async getById(id: number): Promise<Venue> {
    const venue = await this.repository.getById(id);
    if (!venue) {
      throw new ErrorMessage(`Local com id ${id} não encontrado.`, 404);
    }
    return venue;
  }

  /** Cria um novo local */
  async create(data: IVenueCreate): Promise<Venue> {
    if (data.capacity && data.capacity < 1) {
      throw new ErrorMessage("Capacidade não pode ser menor que 1.", 400);
    }
    return this.repository.create(data);
  }

  /** Exclui um local e suas fotos associadas */
  async delete(id: number): Promise<void> {
    // Verifica existência prévia
    await this.getById(id);

    // Remove fotos associadas
    const venues = await this.venuePictureService.getAllByVenueId(id);

    for (const venue of venues) {
      try {
        await this.venuePictureService.delete(venue.id);
      } catch (error) {
        console.error(`Erro ao remover local ${venue.id}`, error);
      }
    }

    // Executa exclusão do local principal
    const affectedRows = await this.repository.delete(id);
    if (affectedRows === 0) {
      throw new ErrorMessage(`Local com id ${id} não encontrado.`, 404);
    }
  }

  /** Atualiza dados de um local */
  async update(id: number, data: Partial<Venue>): Promise<void> {
    // Verifica existência prévia
    await this.getById(id);

    // Executa atualização
    await this.repository.update(id, data);
  }
}

export default new VenueService();
