import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

// Models
import User from "./User";
import Event, { EventStatus } from "./Event";

@Table({
  tableName: 'event_updates',
  timestamps: false,
})
class EventUpdates extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id'
  })
  id!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    field: 'userId'
  })
  userId!: number;

  @ForeignKey(() => Event)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'eventId'
  })
  eventId!: number;

  @Column({
    type: DataType.ENUM(...Object.values(EventStatus)),
    allowNull: false,
    field: 'status'
  })
  status!: EventStatus;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    allowNull: true,
    field: 'updateDate'
  })
  updateDate!: Date;
}

export default EventUpdates;