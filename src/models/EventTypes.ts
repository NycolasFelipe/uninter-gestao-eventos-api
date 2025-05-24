import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import Schools from "./Schools";
import Events from "./Events";

@Table({
  tableName: 'EventTypes',
  timestamps: false,
  indexes: [
    {
      name: 'idx_eventtype_school_id',
      fields: ['school_id']
    }
  ]
})
class EventTypes extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'event_type_id'
  })
  id!: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      len: [1, 100]
    }
  })
  name!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  description?: string;

  @ForeignKey(() => Schools)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: 'school_id',
    onDelete: 'CASCADE'
  })
  schoolId!: number | null;

  @BelongsTo(() => Schools)
  school!: Schools | null;

  @HasMany(() => Events)
  events!: Events[];
}

export default EventTypes;