import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";

// Models
import RolePermission from "./RolePermission";

// Interfaces
export interface PermissionAttributes {
  id: number;
  permissionName: string;
  description: string | null;
}

export interface PermissionCreationAttributes extends Omit<PermissionAttributes, 'id'> { }

@Table({
  tableName: 'permission',
  timestamps: false
})
class Permission extends Model<PermissionAttributes, PermissionCreationAttributes> {
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
