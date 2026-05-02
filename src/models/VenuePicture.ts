import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";

// Models
import Venue from "./Venue";

// Interfaces
export interface VenuePictureAttributes {
  id: number;
  venueId: number;
  pictureUrl: string;
}

export interface VenuePictureCreationAttributes extends Omit<VenuePictureAttributes, 'id'> { }

@Table({
  tableName: 'venue_picture',
  timestamps: false,
  indexes: [
    {
      name: 'idx_venuepicture_venue',
      fields: ['venueId']
    }
  ]
})
class VenuePicture extends Model<VenuePictureAttributes, VenuePictureCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id'
  })
  id!: number;

  @ForeignKey(() => Venue)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'venueId'
  })
  venueId!: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    field: 'pictureUrl'
  })
  pictureUrl!: string;

  // Relacionamentos
  @BelongsTo(() => Venue)
  venue!: Venue;
}

export default VenuePicture;
