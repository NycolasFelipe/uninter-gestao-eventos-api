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
import EventResources from "./EventResources";

@Table({
  tableName: 'Resources',
  timestamps: false,
  indexes: [
    {
      name: 'idx_resource_school_type',
      fields: ['school_id', 'type']
    },
    {
      name: 'idx_resource_type',
      fields: ['type']
    }
  ]
})
class Resources extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'resource_id'
  })
  id!: number;

  @ForeignKey(() => Schools)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: 'school_id',
    onDelete: 'CASCADE'
  })
  schoolId!: number | null;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  })
  name!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  description!: string | null;

  @Column({
    type: DataType.ENUM('Equipment', 'VenueSpace', 'Material', 'DigitalAsset', 'Service'),
    allowNull: false
  })
  type!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: 'quantity_available',
    validate: {
      min: 0
    }
  })
  quantityAvailable!: number | null;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    field: 'availability_details'
  })
  availabilityDetails!: string | null;

  @BelongsTo(() => Schools)
  school!: Schools | null;

  @HasMany(() => EventResources)
  eventUsages!: EventResources[];
}

export default Resources;