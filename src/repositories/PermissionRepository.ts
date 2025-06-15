import BaseRepository from "./BaseRepository";

// Models
import Permission from "src/models/Permission";

class PermissionRepository extends BaseRepository<Permission> {
  constructor() {
    super(Permission);
  }
}

export default PermissionRepository;