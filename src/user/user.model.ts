import { Column, DataType, Model, Table } from "sequelize-typescript";

export interface IUserCreationAttributes {
  email: string;
  password: string;
}

@Table({ tableName: "user", createdAt: false, updatedAt: false })
export class User extends Model<User, IUserCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  userId: number;

  @Column({ type: DataType.STRING, unique: true })
  email: string;

  @Column({ type: DataType.STRING })
  password: string;
}
