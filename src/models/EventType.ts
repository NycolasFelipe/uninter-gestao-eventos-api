import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: 'event_type',
  timestamps: false,
  indexes: [
    {
      name: 'idx_eventtype_name',
      fields: ['name'],
      unique: true
    }
  ]
})
class EventType extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id'
  })
  id!: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    field: 'name'
  })
  name!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    field: 'description'
  })
  description!: string | null;
}

export default EventType;