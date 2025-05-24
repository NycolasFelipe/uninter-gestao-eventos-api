import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import Schools from "./Schools";
import Users from "./Users";
import Events from "./Events";

@Table({
  tableName: 'Announcements',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      name: 'idx_announcement_school_id_status_publish',
      fields: ['school_id', 'status', 'publish_date']
    },
    {
      name: 'idx_announcement_event_id',
      fields: ['event_id']
    }
  ]
})
class Announcements extends Model {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    field: 'announcement_id'
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

  @ForeignKey(() => Users)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    field: 'author_user_id',
    onDelete: 'RESTRICT'
  })
  authorUserId!: bigint;

  @ForeignKey(() => Events)
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
    field: 'event_id',
    onDelete: 'SET NULL'
  })
  eventId!: bigint | null;

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
    allowNull: false
  })
  content!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'publish_date'
  })
  publishDate!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: 'expiry_date'
  })
  expiryDate!: Date | null;

  @Column({
    type: DataType.ENUM(
      'AllSchool',
      'AllStudents',
      'AllParents',
      'AllTeachers',
      'SpecificRoles',
      'SpecificGrades',
      'SpecificUsers'
    ),
    defaultValue: 'AllSchool',
    field: 'target_audience_type'
  })
  targetAudienceType!: string;

  @Column({
    type: DataType.JSON,
    allowNull: true,
    field: 'target_audience_ids'
  })
  targetAudienceIds!: object | null;

  @Column({
    type: DataType.ENUM('Draft', 'Scheduled', 'Published', 'Archived'),
    defaultValue: 'Draft'
  })
  status!: string;

  @BelongsTo(() => Schools)
  school!: Schools;

  @BelongsTo(() => Users)
  author!: Users;

  @BelongsTo(() => Events)
  event!: Events | null;

  declare created_at: Date;
  declare updated_at: Date;
}

export default Announcements;