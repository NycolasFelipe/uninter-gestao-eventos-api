import ErrorMessage from "src/errors/ErrorMessage";
import { IVenuePictureCreate } from "src/interfaces/IVenuePicture";
import VenuePicture from "src/models/VenuePicture";
import VenuePictureRepository from "src/repositories/VenuePictureRepository";

// Instância do repositório de locais
const repository = new VenuePictureRepository();

class VenuePictureService {
  /** Obtém todas as fotos de locais cadastradas */
  async getAll(query: { id?: string; venueId?: string }): Promise<VenuePicture[]> {
    if (query.id) {
      const picture = await this.getById(Number(query.id));
      return picture ? [picture] : [];
    }
    if (query.venueId) {
      return this.getAllByVenueId(Number(query.venueId));
    }
    return repository.getAll();
  }

  /** Busca fotos associadas a um local específico */
  async getAllByVenueId(id: number): Promise<VenuePicture[]> {
    return repository.getAllByVenueId(id);
  }

  /** Busca uma foto específica por ID */
  async getById(id: number): Promise<VenuePicture> {
    const venuePicture = await repository.getById(id);
    if (!venuePicture) {
      throw new ErrorMessage(`Local com id ${id} não encontrado.`, 404);
    }
    return venuePicture;
  }

  /** Cria uma nova foto de local */
  async create(data: IVenuePictureCreate[]): Promise<void> {
    for (const item of data) {
      await repository.create(item);
    }
  }

  /** Exclui uma foto de local */
  async delete(id: number): Promise<void> {
    const affectedRows = await repository.delete(id);
    if (affectedRows === 0) {
      throw new ErrorMessage(`Local com id ${id} não encontrado.`, 404);
    }
  }

  /** Atualiza os dados de uma foto de local */
  async update(id: number, data: Partial<VenuePicture>): Promise<void> {
    // Verificação de existência
    await this.getById(id);

    // Executa atualização
    await repository.update(id, data);
  }
}

export default VenuePictureService;