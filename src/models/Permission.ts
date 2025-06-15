import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import RolePermission from "./RolePermission";

@Table({
  tableName: 'permission',
  timestamps: false
})
class Permission extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id'
  })
  id!: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    field: 'permissionName'
  })
  permissionName!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    field: 'description'
  })
  description!: string | null;

  @HasMany(() => RolePermission)
  rolePermissions!: RolePermission[];
}

export default Permission;