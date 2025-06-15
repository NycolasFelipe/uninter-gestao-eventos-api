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
import School from "./School";

// Enums
export enum AnnouncementStatus {
  Draft = "Draft",
  Scheduled = "Scheduled",
  Published = "Published",
  Archived = "Archived",
}

export enum TargetAudienceType {
  AllSchool = "AllSchool",
  AllStudents = "AllStudents",
  AllParents = "AllParents",
  AllTeachers = "AllTeachers",
  SpecificRoles = "SpecificRoles",
  SpecificUsers = "SpecificUsers",
  SpecificSchools = "SpecificSchools",
}

@Table({
  tableName: 'announcement',
  timestamps: false,
  indexes: [
    {
      name: 'idx_announcement_event',
      fields: ['eventId']
    },
    {
      name: 'idx_announcement_author',
      fields: ['authorUserId']
    },
    {
      name: 'idx_announcement_school',
      fields: ['schoolId']
    }
  ]
})
class Announcement extends Model {
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
    allowNull: true,
    field: 'eventId'
  })
  eventId!: number | null;

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
    field: 'authorUserId'
  })
  authorUserId!: bigint | null;

  @ForeignKey(() => School)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: 'schoolId'
  })
  schoolId!: number | null;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    field: 'title'
  })
  title!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    field: 'content'
  })
  content!: string | null;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
    field: 'publishDate'
  })
  publishDate!: Date;

  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
    field: 'expiryDate'
  })
  expiryDate!: Date | null;

  @Column({
    type: DataType.ENUM(...Object.values(AnnouncementStatus)),
    allowNull: false,
    field: 'status',
    defaultValue: AnnouncementStatus.Draft
  })
  status!: AnnouncementStatus;

  @Column({
    type: DataType.ENUM(...Object.values(TargetAudienceType)),
    allowNull: false,
    field: 'targetAudienceType',
    defaultValue: TargetAudienceType.AllSchool
  })
  targetAudienceType!: TargetAudienceType;

  @Column({
    type: DataType.JSON,
    allowNull: true,
    field: 'targetAudienceIds'
  })
  targetAudienceIds!: object | null;

  // Relacionamentos
  @BelongsTo(() => Event)
  event!: Event | null;

  @BelongsTo(() => User)
  author!: User | null;

  @BelongsTo(() => School)
  school!: School | null;
}

export default Announcement;