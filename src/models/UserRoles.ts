import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  PrimaryKey
} from "sequelize-typescript";
import Users from "./Users";
import Roles from "./Roles";

@Table({
  tableName: 'UserRoles',
  timestamps: false,
})
class UserRoles extends Model {
  @PrimaryKey
  @ForeignKey(() => Users)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    field: 'user_id',
    onDelete: 'CASCADE'
  })
  id!: bigint;

  @PrimaryKey
  @ForeignKey(() => Roles)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'role_id',
    onDelete: 'CASCADE'
  })
  roleId!: number;

  @BelongsTo(() => Users)
  user!: Users;

  @BelongsTo(() => Roles)
  role!: Roles;
}

export default UserRoles;