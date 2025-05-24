import { Column, DataType, Model, Table, HasMany } from "sequelize-typescript";
import Users from "./Users";
import EventTypes from "./EventTypes";
import Venues from "./Venues";
import Events from "./Events";
import Resources from "./Resources";
import Announcements from "./Announcements";
import Surveys from "./Surveys";

@Table({
  tableName: 'schools',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      name: 'idx_school_name',
      fields: ['name']
    }
  ]
})
class Schools extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'school_id'
  })
  id!: number;

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
  address?: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    field: 'contact_info'
  })
  contactInfo?: string;

  @HasMany(() => Users)
  users!: Users[];

  @HasMany(() => EventTypes)
  eventTypes!: EventTypes[];

  @HasMany(() => Venues)
  venues!: Venues[];

  @HasMany(() => Events)
  events!: Events[];

  @HasMany(() => Resources)
  resources!: Resources[];

  @HasMany(() => Announcements)
  announcements!: Announcements[];

  @HasMany(() => Surveys)
  surveys!: Surveys[];

  declare created_at: Date;
  declare updated_at: Date;
}

export default Schools;