import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import EventSchedules from "./EventSchedules";
import Resources from "./Resources";

@Table({
  tableName: 'EventResources',
  timestamps: false,
  indexes: [
    {
      name: 'idx_eventresource_event',
      fields: ['event_schedule_id']
    },
    {
      name: 'idx_eventresource_resource',
      fields: ['resource_id']
    }
  ]
})
class EventResources extends Model {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    field: 'event_resource_id'
  })
  id!: bigint;

  @ForeignKey(() => EventSchedules)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    field: 'event_schedule_id',
    onDelete: 'CASCADE'
  })
  eventScheduleId!: bigint;

  @ForeignKey(() => Resources)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'resource_id',
    onDelete: 'CASCADE'
  })
  resourceId!: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 1,
    field: 'quantity_needed',
    validate: {
      min: 1
    }
  })
  quantityNeeded!: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    field: 'cost_planned'
  })
  costPlanned!: number | null;

  @Column({
    type: DataType.DECIMAL(10, 2),
    field: 'cost_actual'
  })
  costActual!: number | null;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  notes!: string | null;

  @BelongsTo(() => EventSchedules)
  eventSchedule!: EventSchedules;

  @BelongsTo(() => Resources)
  resource!: Resources;
}

export default EventResources;