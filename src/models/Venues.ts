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
import EventSchedules from "./EventSchedules";

@Table({
  tableName: 'Venues',
  timestamps: false,
  indexes: [
    {
      name: 'idx_venue_school_id_name',
      fields: ['school_id', 'name']
    }
  ]
})
class Venues extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'venue_id'
  })
  id!: number;

  @ForeignKey(() => Schools)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'school_id',
    onDelete: 'CASCADE'
  })
  schoolId!: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  })
  name!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    field: 'address_or_room_number'
  })
  addressOrRoomNumber!: string | null;

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  capacity!: number | null;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    field: 'resources_available'
  })
  resourcesAvailable!: string | null;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
    field: 'is_internal'
  })
  isInternal!: boolean;

  @BelongsTo(() => Schools)
  school!: Schools;

  @HasMany(() => EventSchedules)
  events!: EventSchedules[];
}

export default Venues;