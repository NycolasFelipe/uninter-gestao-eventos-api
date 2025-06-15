import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";

// Models
import School from "./School";
import Role from "./Role";

@Table({
  tableName: 'user',
  timestamps: false,
  indexes: [
    {
      name: 'idx_user_email',
      fields: ['email'],
      unique: true
    },
    {
      name: 'idx_user_school',
      fields: ['schoolId']
    }
  ]
})
class User extends Model {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    field: 'id'
  })
  id!: bigint;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    field: 'firstName'
  })
  firstName!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    field: 'lastName'
  })
  lastName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'email'
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'passwordHash'
  })
  passwordHash!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'phoneNumber'
  })
  phoneNumber!: string | null;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    field: 'profilePictureUrl'
  })
  profilePictureUrl!: string | null;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    field: 'isActive',
    defaultValue: true
  })
  isActive!: boolean;

  @ForeignKey(() => School)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: 'schoolId'
  })
  schoolId!: number | null;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: 'roleId'
  })
  roleId!: number | null;

  // Relacionamentos
  @BelongsTo(() => School)
  school!: School;

  @BelongsTo(() => Role)
  role!: Role;
}

export default User;