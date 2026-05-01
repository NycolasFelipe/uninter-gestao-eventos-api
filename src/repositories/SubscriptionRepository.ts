import { Attributes, FindOptions } from "sequelize";
import BaseRepository from "./BaseRepository";

// Models
import Subscription from "src/models/Subscription";
import Event from "src/models/Event";
import School from "src/models/School";
import EventType from "src/models/EventType";
import Venue from "src/models/Venue";

class SubscriptionRepository extends BaseRepository<Subscription> {
  constructor() {
    super(Subscription);
  }

  /** Obtém as opções padrão para consultas */
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

  /** Obtém todas as inscrições associadas a um usuário */
  async getAllByUserId(userId: number): Promise<Subscription[]> {
    return this.model.findAll({
      ...this.getDefaultOptions(),
      where: { userId },
      attributes: {
        exclude: ["eventId", "userId", "updatedAt"]
      }
    });
  }

  async delete(options?: FindOptions<Attributes<Subscription>> | undefined): Promise<number>;
  async delete(id: number | bigint): Promise<number>;
  async delete(eventId: number, userId: number): Promise<number>;
  async delete(identifier?: number | bigint | FindOptions<Attributes<Subscription>>, userId?: number): Promise<number> {
    if (userId !== undefined && typeof identifier === "number") {
      return this.model.destroy({ where: { eventId: identifier, userId } });
    }
    if (typeof identifier === "number" || typeof identifier === "bigint") {
      return super.delete(identifier);
    }
    return super.delete(identifier);
  }
}

export default new SubscriptionRepository();
