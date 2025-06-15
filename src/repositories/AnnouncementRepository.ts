import BaseRepository from "./BaseRepository";

// Models
import Announcement from "src/models/Announcement";

class AnnouncementRepository extends BaseRepository<Announcement> {
  constructor() {
    super(Announcement);
  }

  async getAllBySchoolId(schoolId: number): Promise<Announcement[]> {
    return this.model.findAll({ where: { schoolId } });
  }
}

export default AnnouncementRepository;