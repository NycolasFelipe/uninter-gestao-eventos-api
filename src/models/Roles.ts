import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import Users from "./Users";
import UserRoles from "./UserRoles";
import RolePermissions from "./RolePermissions";
import Permissions from "./Permissions";

@Table({
  tableName: 'Roles',
  timestamps: false,
  indexes: [
    {
      name: 'role_name_unique',
      unique: true,
      fields: ['role_name']
    }
  ]
})
class Roles extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'role_id'
  })
  id!: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
    field: 'role_name',
    validate: {
      notEmpty: true,
      len: [1, 50]
    }
  })
  roleName!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  description?: string;

  @BelongsToMany(() => Users, () => UserRoles)
  users!: Users[];

  @BelongsToMany(() => Permissions, () => RolePermissions)
  permissions!: Permissions[];
}

export default Roles;