import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";

// Models
import School from "./School";
import EventType from "./EventType";
import User from "./User";
import Venue from "./Venue";
import Subscription from "./Subscription";
import EventUpdates from "./EventUpdates";

// Enums
import { EventStatus } from "src/enums/EventStatusEnum";

// Interfaces
import { IBaseParams } from "src/interfaces/IBaseParams";

export interface IEventParams extends IBaseParams {
  eventId?: number;
  schoolId?: number;
  eventTypeId?: number;
  eventTypeIds?: string;
  organizerUserId?: number | bigint;
  venueId?: number;
  name?: string;
  targetAudience?: string;
  status?: string;
  isPublic?: boolean;
  startDate?: Date;
  endDate?: Date;
}

export interface EventAttributes {
  id: number;
  schoolId: number;
  eventTypeId: number;
  organizerUserId: number | bigint;
  venueId: number;
  name: string;
  description: string | null;
  objective: string | null;
  targetAudience: string | null;
  status: EventStatus;
  isPublic: boolean;
  startDate: Date;
  endDate: Date;
}

export interface EventCreationAttributes extends Omit<EventAttributes, "id"> { }

@Table({
  tableName: 'event',
  timestamps: false,
  indexes: [
    {
      name: 'idx_event_school',
      fields: ['schoolId']
    },
    {
      name: 'idx_event_type',
      fields: ['eventTypeId']
    },
    {
      name: 'idx_event_organizer',
      fields: ['organizerUserId']
    }
  ]
})
class Event extends Model<EventAttributes, EventCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id'
  })
  id!: number;

  @ForeignKey(() => School)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'schoolId'
  })
  schoolId!: number;

  @ForeignKey(() => EventType)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'eventTypeId'
  })
  eventTypeId!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    field: 'organizerUserId'
  })
  organizerUserId!: number | bigint;

  @ForeignKey(() => Venue)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'venueId'
  })
  venueId!: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    field: 'name'
  })
  name!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    field: 'description'
  })
  description!: string | null;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    field: 'objective'
  })
  objective!: string | null;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    field: 'targetAudience'
  })
  targetAudience!: string | null;

  @Column({
    type: DataType.ENUM(...Object.values(EventStatus)),
    allowNull: false,
    field: 'status',
    defaultValue: EventStatus.Draft
  })
  status!: EventStatus;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    field: 'isPublic',
    defaultValue: true
  })
  isPublic!: boolean;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'startDate'
  })
  startDate!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'endDate'
  })
  endDate!: Date;

  // Relacionamentos
  @BelongsTo(() => School)
  school!: School;

  @BelongsTo(() => EventType)
  eventType!: EventType;

  @BelongsTo(() => User)
  organizer!: User;

  @BelongsTo(() => Venue)
  venue!: Venue;

  @HasMany(() => Subscription)
  subscriptions!: Subscription[];

  @HasMany(() => EventUpdates)
  updates!: EventUpdates[];
}

export default Event;
