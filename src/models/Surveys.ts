import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import Events from "./Events";
import Schools from "./Schools";
import Users from "./Users";
import SurveyQuestions from "./SurveyQuestions";
import SurveyResponses from "./SurveyResponses";

@Table({
  tableName: 'Surveys',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      name: 'idx_survey_school_id_status',
      fields: ['school_id', 'status']
    },
    {
      name: 'idx_survey_event_id',
      fields: ['event_id']
    }
  ]
})
class Surveys extends Model {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    field: 'survey_id'
  })
  id!: bigint;

  @ForeignKey(() => Events)
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
    field: 'event_id',
    onDelete: 'SET NULL'
  })
  eventId!: bigint | null;

  @ForeignKey(() => Schools)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'school_id',
    onDelete: 'CASCADE'
  })
  schoolId!: number;

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

  @ForeignKey(() => Users)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    field: 'creator_user_id',
    onDelete: 'RESTRICT'
  })
  creatorUserId!: bigint;

  @Column({
    type: DataType.ENUM('Draft', 'Active', 'Closed', 'Archived'),
    defaultValue: 'Draft'
  })
  status!: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: 'start_date'
  })
  startDate!: Date | null;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: 'end_date'
  })
  endDate!: Date | null;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    field: 'is_anonymous'
  })
  isAnonymous!: boolean;

  @BelongsTo(() => Events)
  event!: Events | null;

  @BelongsTo(() => Schools)
  school!: Schools;

  @BelongsTo(() => Users)
  creator!: Users;

  @HasMany(() => SurveyQuestions)
  questions!: SurveyQuestions[];

  @HasMany(() => SurveyResponses)
  responses!: SurveyResponses[];

  declare created_at: Date;
  declare updated_at: Date;
}

export default Surveys;