import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  PrimaryKey
} from "sequelize-typescript";
import Roles from "./Roles";
import Permissions from "./Permissions";

@Table({
  tableName: 'RolePermissions',
  timestamps: false,
})
class RolePermissions extends Model {
  @PrimaryKey
  @ForeignKey(() => Roles)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'role_id',
    onDelete: 'CASCADE'
  })
  id!: number;

  @PrimaryKey
  @ForeignKey(() => Permissions)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'permission_id',
    onDelete: 'CASCADE'
  })
  permissionId!: number;

  @BelongsTo(() => Roles)
  role!: Roles;

  @BelongsTo(() => Permissions)
  permission!: Permissions;
}

export default RolePermissions;