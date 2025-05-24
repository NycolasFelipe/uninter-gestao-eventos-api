import {
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import SurveyQuestions from "./SurveyQuestions";

@Table({
  tableName: 'SurveyQuestionTypes',
  timestamps: false,
  indexes: [
    {
      name: 'type_name_unique',
      unique: true,
      fields: ['type_name']
    }
  ]
})
class SurveyQuestionTypes extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'question_type_id'
  })
  id!: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
    field: 'type_name',
    validate: {
      notEmpty: true,
      len: [1, 100]
    }
  })
  typeName!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  description!: string | null;

  @HasMany(() => SurveyQuestions)
  questions!: SurveyQuestions[];
}

export default SurveyQuestionTypes;