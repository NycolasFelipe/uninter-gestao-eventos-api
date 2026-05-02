import { Column, DataType, Model, Table } from "sequelize-typescript";

// Interfaces
export interface SchoolAttributes {
  id: number;
  name: string;
  address: string | null;
}

export interface SchoolCreationAttributes extends Omit<SchoolAttributes, 'id'> { }

@Table({
  tableName: 'school',
  timestamps: false
})
class School extends Model<SchoolAttributes, SchoolCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id'
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'name'
  })
  name!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    field: 'address'
  })
  address!: string | null;
}

export default School;
