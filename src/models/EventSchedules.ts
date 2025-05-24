import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import Events from "./Events";
import Venues from "./Venues";
import Registrations from "./Registrations";
import Attendance from "./Attendance";
import EventResources from "./EventResources";

@Table({
  tableName: 'EventSchedules',
  timestamps: false,
  indexes: [
    {
      name: 'idx_eventschedule_event_id',
      fields: ['event_id']
    },
    {
      name: 'idx_eventschedule_start_datetime',
      fields: ['start_datetime']
    },
    {
      name: 'idx_eventschedule_venue_id',
      fields: ['venue_id']
    }
  ]
})
class EventSchedules extends Model {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    field: 'event_schedule_id'
  })
  id!: bigint;

  @ForeignKey(() => Events)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    field: 'event_id',
    onDelete: 'CASCADE'
  })
  eventId!: bigint;

  @ForeignKey(() => Venues)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: 'venue_id',
    onDelete: 'SET NULL'
  })
  venueId!: number | null;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'start_datetime'
  })
  startDatetime!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'end_datetime'
  })
  endDatetime!: Date;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    field: 'schedule_name'
  })
  scheduleName!: string | null;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  notes!: string | null;

  @BelongsTo(() => Events)
  event!: Events;

  @BelongsTo(() => Venues)
  venue!: Venues | null;

  @HasMany(() => Registrations)
  registrations!: Registrations[];

  @HasMany(() => Attendance)
  attendanceRecords!: Attendance[];

  @HasMany(() => EventResources)
  resources!: EventResources[];
}

export default EventSchedules;