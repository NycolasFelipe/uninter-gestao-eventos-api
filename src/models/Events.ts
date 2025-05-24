import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  Index,
  HasMany
} from "sequelize-typescript";
import Schools from "./Schools";
import EventTypes from "./EventTypes";
import Users from "./Users";
import EventSchedules from "./EventSchedules";
import Tasks from "./Tasks";
import Announcements from "./Announcements";
import Surveys from "./Surveys";

@Table({
  tableName: 'Events',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      name: 'idx_event_school_id_status',
      fields: ['school_id', 'status']
    },
    {
      name: 'idx_event_name',
      fields: ['name']
    },
    {
      name: 'idx_event_registration_deadline',
      fields: ['registration_deadline']
    }
  ]
})
class Events extends Model {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    field: 'event_id'
  })
  id!: bigint;

  @ForeignKey(() => Schools)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'school_id',
    onDelete: 'CASCADE'
  })
  schoolId!: number;

  @ForeignKey(() => EventTypes)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: 'event_type_id',
    onDelete: 'SET NULL'
  })
  eventTypeId!: number | null;

  @ForeignKey(() => Users)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    field: 'organizer_user_id'
  })
  organizerUserId!: bigint;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  })
  name!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  description!: string | null;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  objective!: string | null;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    field: 'target_audience'
  })
  targetAudience!: string | null;

  @Column({
    type: DataType.ENUM('Draft', 'Planned', 'Published', 'Ongoing', 'Completed', 'Cancelled', 'Archived'),
    allowNull: false,
    defaultValue: 'Draft'
  })
  status!: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
    field: 'is_public'
  })
  isPublic!: boolean;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: 'registration_deadline'
  })
  registrationDeadline!: Date | null;

  @BelongsTo(() => Schools)
  school!: Schools;

  @BelongsTo(() => EventTypes)
  eventType!: EventTypes | null;

  @BelongsTo(() => Users)
  organizer!: Users;

  @HasMany(() => EventSchedules)
  schedules!: EventSchedules[];

  @HasMany(() => Tasks)
  tasks!: Tasks[];

  @HasMany(() => Announcements)
  announcements!: Announcements[];

  @HasMany(() => Surveys)
  surveys!: Surveys[];

  declare created_at: Date;
  declare updated_at: Date;
}

export default Events;