import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: 'school',
  timestamps: false
})
class School extends Model {
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