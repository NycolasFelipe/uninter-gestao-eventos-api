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
import SurveyQuestionTypes from "./SurveyQuestionTypes";
import SurveyQuestionOptions from "./SurveyQuestionOptions";
import SurveyAnswers from "./SurveyAnswers";

@Table({
  tableName: 'SurveyQuestions',
  timestamps: false,
  indexes: [
    {
      name: 'idx_question_survey',
      fields: ['survey_id']
    },
    {
      name: 'idx_question_type',
      fields: ['question_type_id']
    }
  ]
})
class SurveyQuestions extends Model {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    field: 'question_id'
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

  @ForeignKey(() => SurveyQuestionTypes)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'question_type_id',
    onDelete: 'RESTRICT'
  })
  questionTypeId!: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  questionText!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'order_in_survey',
    validate: {
      min: 1
    }
  })
  orderInSurvey!: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    field: 'is_mandatory'
  })
  isMandatory!: boolean;

  @Column({
    type: DataType.JSON,
    allowNull: true,
    field: 'config_options'
  })
  configOptions!: object | null;

  @BelongsTo(() => Surveys)
  survey!: Surveys;

  @BelongsTo(() => SurveyQuestionTypes)
  questionType!: SurveyQuestionTypes;

  @HasMany(() => SurveyQuestionOptions)
  options!: SurveyQuestionOptions[];

  @HasMany(() => SurveyAnswers)
  answers!: SurveyAnswers[];
}

export default SurveyQuestions;