import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import SurveyResponses from "./SurveyResponses";
import SurveyQuestions from "./SurveyQuestions";
import SurveyQuestionOptions from "./SurveyQuestionOptions";

@Table({
  tableName: 'SurveyAnswers',
  timestamps: false,
  indexes: [
    {
      name: 'idx_surveyanswer_response_id',
      fields: ['response_id']
    },
    {
      name: 'idx_surveyanswer_question_id',
      fields: ['question_id']
    }
  ]
})
class SurveyAnswers extends Model {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    field: 'answer_id'
  })
  id!: bigint;

  @ForeignKey(() => SurveyResponses)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    field: 'response_id',
    onDelete: 'CASCADE'
  })
  responseId!: bigint;

  @ForeignKey(() => SurveyQuestions)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    field: 'question_id',
    onDelete: 'CASCADE'
  })
  questionId!: bigint;

  @ForeignKey(() => SurveyQuestionOptions)
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
    field: 'chosen_option_id',
    onDelete: 'SET NULL'
  })
  chosenOptionId!: bigint | null;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    field: 'answer_text'
  })
  answerText!: string | null;

  // Relacionamentos
  @BelongsTo(() => SurveyResponses)
  response!: SurveyResponses;

  @BelongsTo(() => SurveyQuestions)
  question!: SurveyQuestions;

  @BelongsTo(() => SurveyQuestionOptions)
  chosenOption!: SurveyQuestionOptions | null;
}

export default SurveyAnswers;