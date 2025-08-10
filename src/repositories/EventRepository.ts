import { Op, Optional } from "sequelize";
import ErrorMessage from "src/errors/ErrorMessage";
import BaseRepository from "./BaseRepository";

// Models
import Event from "src/models/Event";
import School from "src/models/School";
import EventType from "src/models/EventType";
import User from "src/models/User";
import Venue from "src/models/Venue";
import VenuePicture from "src/models/VenuePicture";
import Subscription from "src/models/Subscription";

// Interfaces
import { IParams } from "src/interfaces/IParams";
import EventUpdates from "src/models/EventUpdates";


class EventRepository extends BaseRepository<Event> {
  constructor() {
    super(Event);
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

  async getAll(params: IParams): Promise<Event[]> {
    const statusNames = typeof params.status === 'string'
      ? params.status.split(',').map(s => s.trim())
      : params.status;

    const eventTypesIds = typeof params.eventTypeIds === 'string'
      ? params.eventTypeIds.split(',').map(q => Number(q.trim()))
      : [];

    const where = {
      ...(params && params.eventId && {
        id: params.eventId
      }),
      ...(params && params.status && {
        status: { [Op.in]: statusNames }
      }),
      ...(params && params.schoolId && {
        schoolId: params.schoolId
      }),
      ...(params && params.eventTypeIds && {
        eventTypeId: { [Op.in]: eventTypesIds }
      })
    }

    return this.model.findAll({
      where,
      include: [
        {
          model: Venue,
          attributes: {
            exclude: ["schoolId"]
          }
        },
        { model: School },
        { model: EventType }
      ],
      attributes: {
        exclude: ["schoolId", "eventTypeId", "organizerUserId", "venueId"]
      },
      limit: params.limit || 100,
      offset: params.offset || 0
    });
  }

  async getAllDetailed(params: IParams): Promise<Event[]> {
    const statusValues = typeof params.status === 'string'
      ? params.status.split(',').map(s => s.trim())
      : params.status;

    const where = {
      ...(params && params.eventId && {
        id: params.eventId
      }),
      ...(params && params.status && {
        status: { [Op.in]: statusValues }
      }),
      ...(params && params.schoolId && {
        schoolId: params.schoolId
      }),
    }

    return this.model.findAll({
      where,
      include: [
        {
          model: Subscription,
          attributes: ["updatedAt"],
          include: [{
            model: User,
            attributes: ["firstName", "lastName", "email"]
          }],
        },
        {
          model: Venue,
          include: [{
            model: VenuePicture,
            attributes: {
              exclude: ["venueId"]
            }
          }],
          attributes: {
            exclude: ["schoolId"]
          }
        },
        { model: School },
        { model: EventType }
      ],
      attributes: {
        exclude: ["schoolId", "eventTypeId", "organizerUserId", "venueId"]
      },
      limit: params.limit || 100,
      offset: params.offset || 0
    });
  }

  async getWithId(params: IParams): Promise<Event | null> {
    const where = {
      id: params.eventId,
      ...(params && params.schoolId && {
        schoolId: params.schoolId
      })
    }

    return this.model.findOne({
      where,
      include: [
        {
          model: Subscription,
          attributes: ["updatedAt"],
          include: [{
            model: User,
            attributes: ["firstName", "lastName", "email"]
          }],
        },
        {
          model: Venue,
          include: [{
            model: VenuePicture,
            attributes: {
              exclude: ["venueId"]
            }
          }],
          attributes: {
            exclude: ["schoolId"]
          }
        },
        {
          model: EventUpdates,
          attributes: {
            exclude: ["userId", "eventId"],
          },
          include: [{
            model: User,
            attributes: ["firstName", "lastName", "email"]
          }],
        },
        { model: School },
        { model: EventType }
      ],
      attributes: {
        exclude: ["schoolId", "eventTypeId", "organizerUserId", "venueId"]
      },
    });
  }

  async deleteById(params: IParams): Promise<number> {
    const where = {
      id: params.eventId,
      ...(params.organizerUserId && {
        organizerUserId: params.organizerUserId
      })
    }

    return this.delete({ where });
  }
}

export default new EventRepository();