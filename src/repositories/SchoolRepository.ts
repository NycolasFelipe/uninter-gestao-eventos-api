import BaseRepository from "./BaseRepository";

// Models
import School from "src/models/School";

class SchoolRepository extends BaseRepository<School> {
  constructor() {
    super(School);
  }
}

export default SchoolRepository;