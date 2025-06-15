import BaseRepository from "./BaseRepository";

// Models
import VenuePicture from "src/models/VenuePicture";

class VenuePictureRepository extends BaseRepository<VenuePicture> {
  constructor() {
    super(VenuePicture);
  }

  /** Obtém todas as imagens de um local */
  async getAllByVenueId(id: number): Promise<VenuePicture[]> {
    return this.model.findAll({ where: { venueId: id } });
  }
}

export default VenuePictureRepository;