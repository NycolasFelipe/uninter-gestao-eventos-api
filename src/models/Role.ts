import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import RolePermission from "./RolePermission";

@Table({
  tableName: 'role',
  timestamps: false
})
class Role extends Model {
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
}

export default Role;