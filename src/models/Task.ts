import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";

// Models
import Event from "./Event";
import User from "./User";

// Definindo Enums
export enum TaskStatus {
  ToDo = "ToDo",
  InProgress = "InProgress",
  Completed = "Completed",
  Blocked = "Blocked",
  Cancelled = "Cancelled",
}

export enum TaskPriority {
  Low = "Low",
  Medium = "Medium",
  High = "High",
}

@Table({
  tableName: 'task',
  timestamps: false,
  indexes: [
    {
      name: 'idx_task_event',
      fields: ['eventId']
    },
    {
      name: 'idx_task_assigned',
      fields: ['assignedToUserId']
    },
    {
      name: 'idx_task_creator',
      fields: ['createdByUserId']
    }
  ]
})
class Task extends Model {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    field: 'id'
  })
  id!: bigint;

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
    field: 'assignedToUserId'
  })
  assignedToUserId!: bigint;

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    field: 'createdByUserId'
  })
  createdByUserId!: bigint;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    field: 'title'
  })
  title!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    field: 'description'
  })
  description!: string | null;

  @Column({
    type: DataType.ENUM(...Object.values(TaskStatus)),
    allowNull: false,
    field: 'status',
    defaultValue: TaskStatus.ToDo
  })
  status!: TaskStatus;

  @Column({
    type: DataType.ENUM(...Object.values(TaskPriority)),
    allowNull: false,
    field: 'priority',
    defaultValue: TaskPriority.Medium
  })
  priority!: TaskPriority;

  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
    field: 'due_date'
  })
  dueDate!: Date | null;

  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
    field: 'plannedStartDate'
  })
  plannedStartDate!: Date | null;

  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
    field: 'actualStartDate'
  })
  actualStartDate!: Date | null;

  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
    field: 'plannedEndDate'
  })
  plannedEndDate!: Date | null;

  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
    field: 'actualEndDate'
  })
  actualEndDate!: Date | null;

  // Relacionamentos
  @BelongsTo(() => Event)
  event!: Event;

  @BelongsTo(() => User, 'assignedToUserId')
  assignedTo!: User;

  @BelongsTo(() => User, 'createdByUserId')
  createdBy!: User;
}

export default Task;