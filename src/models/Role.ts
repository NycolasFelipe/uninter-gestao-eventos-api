import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";

// Models
import User from "./User";
import Permission from "./Permission";
import RolePermission from "./RolePermission";

// Interfaces
export interface RoleAttributes {
  id: number;
  roleName: string;
  description: string | null;
}

export interface RoleCreationAttributes extends Omit<RoleAttributes, 'id'> { }

@Table({
  tableName: 'role',
  timestamps: false
})
class Role extends Model<RoleAttributes, RoleCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id'
  })
  id!: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    field: 'roleName'
  })
  roleName!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    field: 'description'
  })
  description!: string | null;

  @HasMany(() => RolePermission)
  rolePermissions!: RolePermission[];

  @BelongsToMany(() => Permission, () => RolePermission)
  permissions!: Permission[];

  @HasMany(() => User)
  users!: User[];
}

export default Role;
