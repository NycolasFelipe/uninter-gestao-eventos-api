import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import SurveyQuestions from "./SurveyQuestions";
import SurveyAnswers from "./SurveyAnswers";

@Table({
  tableName: 'SurveyQuestionOptions',
  timestamps: false,
  indexes: [
    {
      name: 'idx_option_question_order',
      fields: ['question_id', 'order_in_question']
    },
    {
      name: 'idx_option_question',
      fields: ['question_id']
    }
  ]
})
class SurveyQuestionOptions extends Model {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    field: 'option_id'
  })
  id!: bigint;

  @ForeignKey(() => SurveyQuestions)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    field: 'question_id',
    onDelete: 'CASCADE'
  })
  questionId!: bigint;

  @Column({
    type: DataType.STRING(512),
    allowNull: false,
    field: 'option_text',
    validate: {
      notEmpty: true
    }
  })
  optionText!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  value!: string | null;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'order_in_question',
    validate: {
      min: 1
    }
  })
  orderInQuestion!: number;

  @BelongsTo(() => SurveyQuestions)
  question!: SurveyQuestions;

  @HasMany(() => SurveyAnswers)
  answers!: SurveyAnswers[];
}

export default SurveyQuestionOptions;