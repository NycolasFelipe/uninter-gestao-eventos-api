import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import Event from "./Event";
import User from "./User";

@Table({
  tableName: 'subscription',
  indexes: [
    {
      name: 'idx_subscription_event',
      fields: ['eventId']
    },
    {
      name: 'idx_subscription_user',
      fields: ['userId']
    }
  ]
})
class Subscription extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id'
  })
  id!: number;

  @ForeignKey(() => Event)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'eventId'
  })
  eventId!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    field: 'userId'
  })
  userId!: number;

  @BelongsTo(() => Event)
  event!: Event;

  @BelongsTo(() => User)
  user!: User;
}

export default Subscription;