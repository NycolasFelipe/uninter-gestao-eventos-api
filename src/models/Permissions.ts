import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import Roles from "./Roles";
import RolePermissions from "./RolePermissions";

@Table({
  tableName: 'Permissions',
  timestamps: false,
  indexes: [
    {
      name: 'permission_name_unique',
      unique: true,
      fields: ['permission_name']
    }
  ]
})
class Permissions extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'permission_id'
  })
  id!: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
    field: 'permission_name',
    validate: {
      notEmpty: true,
      len: [1, 100]
    }
  })
  permissionName!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  description?: string;

  @BelongsToMany(() => Roles, () => RolePermissions)
  roles!: Roles[];
}

export default Permissions;