import { CreateOptions } from "sequelize";
import BaseRepository from "./BaseRepository";
import VenuePicture from "src/models/VenuePicture";
import { MakeNullishOptional } from "sequelize/types/utils";

class VenuePictureRepository extends BaseRepository<VenuePicture> {
  constructor() {
    super(VenuePicture);
  }

  /** Obtém todas as imagens de um local */
  async getAllByVenueId(id: number): Promise<VenuePicture[]> {
    return this.model.findAll({ where: { venueId: id } });
  }

  /** Cria múltiplas imagens de local em lote */
  async bulkCreate(records: MakeNullishOptional<VenuePicture['_creationAttributes']>[], options?: CreateOptions<VenuePicture['_attributes']>): Promise<VenuePicture[]> {
    return this.model.bulkCreate(records, options);
  }
}

export default VenuePictureRepository;