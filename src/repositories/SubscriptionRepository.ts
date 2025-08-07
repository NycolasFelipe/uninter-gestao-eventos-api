import { FindOptions } from "sequelize";
import BaseRepository from "./BaseRepository";

// Models
import Subscription from "src/models/Subscription";
import Event from "src/models/Event";
import School from "src/models/School";
import EventType from "src/models/EventType";
import Venue from "src/models/Venue";

class SubscriptionRepository extends BaseRepository<Subscription> {
  private getDefaultOptions(): FindOptions {
    return {
      include: [{
        model: Event,
        include: [
          { model: School },
          { model: EventType },
          { model: Venue }
        ],
        attributes: {
          exclude: [
            "schoolId",
            "eventTypeId",
            "organizerUserId",
            "venueId",
            "description"
          ]
        }
      }],
    }
  }

  constructor() {
    super(Subscription);
  }

  /** Obtém todas as inscrições associadas a um usuário */
  async getAllByUserId(userId: number): Promise<Subscription[]> {
    console.log("async getAllByUserId(userId: number): Promise<Subscription[]> {");
    return this.model.findAll({
      ...this.getDefaultOptions(),
      where: { userId },
      attributes: {
        exclude: ["eventId", "userId", "updatedAt"]
      }
    });
  }
}

export default SubscriptionRepository;