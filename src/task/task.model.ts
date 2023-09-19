import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "src/user/user.model";
import { CreateTaskDto } from "./dto/createTaskDto";

@Table({ tableName: "task", createdAt: false, updatedAt: false })
export class Task extends Model<Task, CreateTaskDto> {
  @ApiProperty({
    example: 1,
    description: "Уникальный идентификатор задачи",
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  taskId: number;

  @ApiProperty({
    example: 1,
    description: "Уникальный идентификатор пользователя",
  })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @ApiProperty({
    example: "Описание задачи",
    description: "Текст задачи",
  })
  @Column({ type: DataType.STRING })
  text: string;

  @ApiProperty({
    example: false,
    description: "Статус выполнения задачи",
  })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  done: boolean;

  @ApiProperty({
    example: "2022-01-01",
    description: "Дедлайн задачи",
  })
  @Column({ type: DataType.STRING })
  deadline: string;
}
