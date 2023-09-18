import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "src/user/user.model";

export interface ITask {
  userId: number;
  text: string;
  deadline?: string;
}

@Table({ tableName: "task", createdAt: false, updatedAt: false })
export class Task extends Model<Task, ITask> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  taskId: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @Column({ type: DataType.STRING })
  text: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  done: boolean;

  @Column({ type: DataType.STRING })
  deadline: string;
}
