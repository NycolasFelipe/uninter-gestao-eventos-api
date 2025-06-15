import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";

// Models
import School from "./School";
import VenuePicture from "./VenuePicture";

@Table({
  tableName: 'venue',
  timestamps: false,
  indexes: [
    {
      name: 'idx_venue_school',
      fields: ['schoolId']
    }
  ]
})
class Venue extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id'
  })
  id!: number;

  @ForeignKey(() => School)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'schoolId'
  })
  schoolId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'name'
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'address'
  })
  address!: string | null;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: 'capacity'
  })
  capacity!: number | null;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    field: 'isInternal',
    defaultValue: true
  })
  isInternal!: boolean;

  // Relacionamentos
  @BelongsTo(() => School)
  school!: School;

  @HasMany(() => VenuePicture)
  venuePictures!: Venue[];
}

export default Venue;