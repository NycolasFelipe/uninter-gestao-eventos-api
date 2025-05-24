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
  tableName: 'Attendance',
  timestamps: false,
  indexes: [
    {
      name: 'uk_attendance_schedule_user',
      unique: true,
      fields: ['event_schedule_id', 'user_id']
    },
    {
      name: 'idx_attendance_user_id',
      fields: ['user_id']
    }
  ]
})
class Attendance extends Model {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    field: 'attendance_id'
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
    allowNull: false,
    field: 'check_in_time'
  })
  checkInTime!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: 'check_out_time'
  })
  checkOutTime!: Date | null;

  @ForeignKey(() => Users)
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
    field: 'verified_by_user_id',
    onDelete: 'SET NULL'
  })
  verifiedByUserId!: bigint | null;

  @BelongsTo(() => EventSchedules)
  eventSchedule!: EventSchedules;

  @BelongsTo(() => Users, 'user_id')
  user!: Users;

  @BelongsTo(() => Users, 'verified_by_user_id')
  verifiedByUser!: Users | null;
}

export default Attendance;