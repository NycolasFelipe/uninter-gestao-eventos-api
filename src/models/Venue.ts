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

// Interfaces
export interface VenueAttributes {
  id: number;
  schoolId: number;
  name: string;
  address: string | null;
  capacity: number | null;
  isInternal: boolean;
  venuePictures?: Array<{
    id: number;
    venueId: number;
    pictureUrl: string
  }>;
}

export interface VenueCreationAttributes {
  schoolId: number;
  name: string;
  address?: string | null;
  capacity?: number | null;
  isInternal?: boolean;
}

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
class Venue extends Model<VenueAttributes, VenueCreationAttributes> {
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
  venuePictures!: VenuePicture[];
}

export default Venue;
