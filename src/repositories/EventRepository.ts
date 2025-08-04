import { Attributes, FindOptions, Op, Optional } from "sequelize";
import ErrorMessage from "src/errors/ErrorMessage";
import BaseRepository from "./BaseRepository";

// Models
import Event from "src/models/Event";
import School from "src/models/School";
import EventType from "src/models/EventType";
import User from "src/models/User";
import Venue from "src/models/Venue";
import VenuePicture from "src/models/VenuePicture";
import Role from "src/models/Role";

class EventRepository extends BaseRepository<Event> {
  constructor() {
    super(Event);
  }

  private getDefaultOptions(): FindOptions {
    return {
      include: [
        { model: School },
        { model: EventType },
        {
          model: User,
          include: [
            {
              model: Role,
              attributes: ["roleName"]
            }
          ],
          attributes: ["id", "firstName", "lastName", "email", "profilePictureUrl"]
        },
        {
          model: Venue,
          include: [
            { model: VenuePicture }
          ]
        }
      ],
      attributes: {
        exclude: ["schoolId", "eventTypeId", "organizerUserId", "venueId"]
      }
    }
  }

  async create(data: Omit<Optional<any, string>, "id">): Promise<Event> {
    const conflictingEvents = await Event.findAll({
      where: {
        venueId: data.venueId,
        schoolId: data.schoolId,
        [Op.or]: [
          {
            startDate: { [Op.lte]: data.endDate },
            endDate: { [Op.gte]: data.startDate }
          },
          {
            startDate: { [Op.lte]: data.endDate },
            endDate: { [Op.gte]: data.endDate }
          },
          {
            startDate: { [Op.gte]: data.startDate },
            endDate: { [Op.lte]: data.endDate }
          }
        ]
      }
    });

    if (conflictingEvents.length > 0) {
      const eventsIds = conflictingEvents.map(event => event.id).join(", ");
      const message = `Conflito de agendamento com ${conflictingEvents.length} evento(s) existente(s). Ids eventos conflitantes: ${eventsIds}`;
      throw new ErrorMessage(message, 422);
    }

    return this.model.create(data);
  }

  async getAll(options?: FindOptions<Attributes<Event>>): Promise<Event[]> {
    const defaultOptions = this.getDefaultOptions();

    // Combina as opções padrão com as opções passadas
    const mergedOptions: FindOptions<Attributes<Event>> = {
      ...defaultOptions,
      ...options,
      where: {
        ...defaultOptions.where,
        ...options?.where,
      },
    };

    return this.model.findAll(mergedOptions);
  }

  async getAllByEventTypeId(eventTypeIds: number[]): Promise<Event[]> {
    return this.model.findAll({
      ...this.getDefaultOptions(),
      where: {
        eventTypeId: { [Op.in]: eventTypeIds }
      }
    });
  }

  async getAllByEventStatus(statusIds: string[]): Promise<Event[]> {
    return this.model.findAll({
      ...this.getDefaultOptions(),
      where: {
        status: { [Op.in]: statusIds }
      }
    });
  }

  async getAllBySchoolId(schoolId: number): Promise<Event[]> {
    return this.model.findAll({
      ...this.getDefaultOptions(),
      where: { schoolId }
    });
  }

  async getById(id: number | bigint): Promise<Event | null> {
    return this.model.findOne({
      ...this.getDefaultOptions(),
      where: { id }
    })
  }
}

export default EventRepository;