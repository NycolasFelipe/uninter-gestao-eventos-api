import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import Surveys from "./Surveys";
import Users from "./Users";
import SurveyAnswers from "./SurveyAnswers";

@Table({
  tableName: 'SurveyResponses',
  timestamps: false,
  indexes: [
    {
      name: 'idx_response_survey',
      fields: ['survey_id']
    },
    {
      name: 'idx_response_respondent',
      fields: ['respondent_user_id']
    }
  ]
})
class SurveyResponses extends Model {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    field: 'response_id'
  })
  id!: bigint;

  @ForeignKey(() => Surveys)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    field: 'survey_id',
    onDelete: 'CASCADE'
  })
  surveyId!: bigint;

  @ForeignKey(() => Users)
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
    field: 'respondent_user_id',
    onDelete: 'SET NULL'
  })
  respondentUserId!: bigint | null;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    field: 'submission_date'
  })
  submissionDate!: Date;

  @Column({
    type: DataType.STRING(45),
    allowNull: true,
    field: 'ip_address'
  })
  ipAddress!: string | null;

  @BelongsTo(() => Surveys)
  survey!: Surveys;

  @BelongsTo(() => Users)
  respondent!: Users | null;

  @HasMany(() => SurveyAnswers)
  answers!: SurveyAnswers[];
}

export default SurveyResponses;