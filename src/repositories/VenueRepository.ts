import VenuePicture from "src/models/VenuePicture";
import BaseRepository from "./BaseRepository";

// Models
import Venue from "src/models/Venue";

class VenueRepository extends BaseRepository<Venue> {
  constructor() {
    super(Venue);
  }

  getAll(): Promise<Venue[]> {
    return this.model.findAll({
      include: [{
        model: VenuePicture
      }]
    });
  }

  async getAllBySchoolId(schoolId: number): Promise<Venue[]> {
    return this.model.findAll({ where: { schoolId } });
  }

  getById(id: number | bigint): Promise<Venue | null> {
    return this.model.findOne({
      where: { id },
      include: [{
        model: VenuePicture
      }]
    });
  }
}

export default VenueRepository;