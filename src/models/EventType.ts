import { Column, DataType, Model, Table } from "sequelize-typescript";

// Interfaces
export interface EventTypeAttributes {
  id: number;
  name: string;
  description: string | null;
}

export interface EventTypeCreationAttributes extends Omit<EventTypeAttributes, 'id'> { }

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
class EventType extends Model<EventTypeAttributes, EventTypeCreationAttributes> {
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
