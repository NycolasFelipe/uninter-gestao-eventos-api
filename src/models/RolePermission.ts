import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";

// Models
import Role from "./Role";
import Permission from "./Permission";

// Interfaces
export interface RolePermissionAttributes {
  id: number;
  roleId: number;
  permissionId: number;
}

export interface RolePermissionCreationAttributes extends Omit<RolePermissionAttributes, "id"> { }

@Table({
  tableName: 'role_permission',
  timestamps: false,
  indexes: [
    {
      name: 'idx_rolepermission_role',
      fields: ['roleId']
    },
    {
      name: 'idx_rolepermission_permission',
      fields: ['permissionId']
    }
  ]
})
class RolePermission extends Model<RolePermissionAttributes, RolePermissionCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id'
  })
  id!: number;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'roleId'
  })
  roleId!: number;

  @ForeignKey(() => Permission)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'permissionId'
  })
  permissionId!: number;

  // Relacionamentos
  @BelongsTo(() => Role)
  role!: Role;

  @BelongsTo(() => Permission)
  permission!: Permission;
}

export default RolePermission;
