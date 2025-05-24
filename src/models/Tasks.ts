import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import Events from "./Events";
import Users from "./Users";

@Table({
  tableName: 'Tasks',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      name: 'idx_task_event_id',
      fields: ['event_id']
    },
    {
      name: 'idx_task_assigned_to_user_id',
      fields: ['assigned_to_user_id']
    },
    {
      name: 'idx_task_status',
      fields: ['status']
    },
    {
      name: 'idx_task_due_date',
      fields: ['due_date']
    }
  ]
})
class Tasks extends Model {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    field: 'task_id'
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

  @ForeignKey(() => Users)
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
    field: 'assigned_to_user_id',
    onDelete: 'SET NULL'
  })
  assignedToUserId!: bigint | null;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  })
  title!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  description!: string | null;

  @Column({
    type: DataType.ENUM('ToDo', 'InProgress', 'Completed', 'Blocked', 'Cancelled'),
    allowNull: false,
    defaultValue: 'ToDo'
  })
  status!: string;

  @Column({
    type: DataType.ENUM('Low', 'Medium', 'High'),
    defaultValue: 'Medium'
  })
  priority!: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: 'due_date'
  })
  dueDate!: Date | null;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: 'planned_start_date'
  })
  plannedStartDate!: Date | null;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: 'actual_start_date'
  })
  actualStartDate!: Date | null;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: 'planned_end_date'
  })
  plannedEndDate!: Date | null;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: 'actual_end_date'
  })
  actualEndDate!: Date | null;

  @ForeignKey(() => Users)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    field: 'created_by_user_id'
  })
  createdByUserId!: bigint;

  @BelongsTo(() => Events)
  event!: Events;

  @BelongsTo(() => Users, 'assigned_to_user_id')
  assignedTo!: Users | null;

  @BelongsTo(() => Users, 'created_by_user_id')
  createdBy!: Users;

  declare created_at: Date;
  declare updated_at: Date;
}

export default Tasks;