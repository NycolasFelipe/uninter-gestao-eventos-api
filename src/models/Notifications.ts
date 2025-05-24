import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  Index
} from "sequelize-typescript";
import Users from "./Users";

@Table({
  tableName: 'Notifications',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
  indexes: [
    {
      name: 'idx_notification_recipient_read_created',
      fields: ['recipient_user_id', 'is_read', 'created_at']
    }
  ]
})
class Notifications extends Model {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    field: 'notification_id'
  })
  id!: bigint;

  @ForeignKey(() => Users)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    field: 'recipient_user_id',
    onDelete: 'CASCADE'
  })
  recipientUserId!: bigint;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
    field: 'triggering_event_type'
  })
  triggeringEventType!: string | null;

  @Column({
    type: DataType.BIGINT,
    allowNull: true,
    field: 'reference_id'
  })
  referenceId!: bigint | null;

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  content!: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    field: 'is_read'
  })
  isRead!: boolean;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: 'read_at'
  })
  readAt!: Date | null;

  @BelongsTo(() => Users)
  recipient!: Users;

  declare created_at: Date;
}

export default Notifications;