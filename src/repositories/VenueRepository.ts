import BaseRepository from "./BaseRepository";

// Models
import Venue from "src/models/Venue";
import VenuePicture from "src/models/VenuePicture";

class VenueRepository extends BaseRepository<Venue> {
  constructor() {
    super(Venue);
  }

  /** Obtém todos os locais com as imagens associadas */
  async getAll(): Promise<Venue[]> {
    return this.model.findAll({
      include: [{
        model: VenuePicture
      }]
    });
  }

  /** Obtém todos os locais associados a uma escola */
  async getAllBySchoolId(schoolId: number): Promise<Venue[]> {
    return this.model.findAll({ where: { schoolId } });
  }

  /** Obtém um local pelo ID com as imagens associadas */
  async getById(id: number | bigint): Promise<Venue | null> {
    return this.model.findOne({
      where: { id },
      include: [{
        model: VenuePicture
      }]
    });
  }
}

export default new VenueRepository();
