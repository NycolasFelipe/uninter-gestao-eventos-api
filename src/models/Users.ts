import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
  HasMany
} from "sequelize-typescript";
import Schools from "./Schools";
import Roles from "./Roles";
import UserRoles from "./UserRoles";
import Events from "./Events";
import Registrations from "./Registrations";
import Attendance from "./Attendance";
import Tasks from "./Tasks";
import Announcements from "./Announcements";
import Notifications from "./Notifications";
import Surveys from "./Surveys";
import SurveyResponses from "./SurveyResponses";

@Table({
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
  indexes: [
    {
      name: 'idx_user_email',
      fields: ['email'],
      unique: true
    },
    {
      name: 'idx_user_school_id',
      fields: ['school_id']
    }
  ]
})
class Users extends Model {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    field: 'user_id'
  })
  id!: bigint;

  @ForeignKey(() => Schools)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: 'school_id'
  })
  schoolId!: number | null;

  @BelongsTo(() => Schools)
  school!: Schools;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true
    },
    field: 'first_name'
  })
  firstName!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true
    },
    field: 'last_name'
  })
  lastName!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  })
  email!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    field: 'password_hash'
  })
  passwordHash!: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: true,
    field: 'phone_number'
  })
  phoneNumber!: string | null;

  @Column({
    type: DataType.STRING(512),
    allowNull: true,
    field: 'profile_picture_url'
  })
  profilePictureUrl!: string | null;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    field: 'created_at'
  })
  createdAt!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: 'last_login'
  })
  lastLogin!: Date | null;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
    field: 'is_active'
  })
  isActive!: boolean;

  @BelongsToMany(() => Roles, () => UserRoles)
  roles!: Roles[];

  @HasMany(() => Events)
  organizedEvents!: Events[];

  @HasMany(() => Registrations)
  registrations!: Registrations[];

  @HasMany(() => Attendance)
  attendances!: Attendance[];

  @HasMany(() => Attendance, 'verified_by_user_id')
  verifiedAttendances!: Attendance[];

  @HasMany(() => Tasks, 'assigned_to_user_id')
  assignedTasks!: Tasks[];

  @HasMany(() => Tasks, 'created_by_user_id')
  createdTasks!: Tasks[];

  @HasMany(() => Announcements)
  authoredAnnouncements!: Announcements[];

  @HasMany(() => Notifications)
  notifications!: Notifications[];

  @HasMany(() => Surveys)
  createdSurveys!: Surveys[];

  @HasMany(() => SurveyResponses)
  surveyResponses!: SurveyResponses[];
}

export default Users;