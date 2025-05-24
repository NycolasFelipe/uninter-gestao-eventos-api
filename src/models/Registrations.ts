import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import EventSchedules from "./EventSchedules";
import Users from "./Users";

@Table({
  tableName: 'Registrations',
  timestamps: false,
  indexes: [
    {
      name: 'uk_registration_schedule_user',
      unique: true,
      fields: ['event_schedule_id', 'user_id']
    },
    {
      name: 'idx_registration_user_id',
      fields: ['user_id']
    },
    {
      name: 'idx_registration_status',
      fields: ['status']
    }
  ]
})
class Registrations extends Model {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    field: 'registration_id'
  })
  id!: bigint;

  @ForeignKey(() => EventSchedules)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    field: 'event_schedule_id',
    onDelete: 'CASCADE'
  })
  eventScheduleId!: bigint;

  @ForeignKey(() => Users)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    field: 'user_id',
    onDelete: 'CASCADE'
  })
  userId!: bigint;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    field: 'registration_date'
  })
  registrationDate!: Date;

  @Column({
    type: DataType.ENUM('Confirmed', 'Waitlisted', 'Cancelled_ByUser', 'Cancelled_BySystem', 'Attended'),
    allowNull: false,
    defaultValue: 'Confirmed'
  })
  status!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  notes!: string | null;

  @BelongsTo(() => EventSchedules)
  eventSchedule!: EventSchedules;

  @BelongsTo(() => Users)
  user!: Users;
}

export default Registrations;