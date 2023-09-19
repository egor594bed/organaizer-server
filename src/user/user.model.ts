import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";
import { CreateUserDto } from "./dto/createUserDto";

@Table({ tableName: "user", createdAt: false, updatedAt: false })
export class User extends Model<User, CreateUserDto> {
  @ApiProperty({
    example: 1,
    description: "Ункальный идентификатор пользователя",
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  userId: number;

  @ApiProperty({
    example: "1@mail.ru",
    description: "Электронная почта пользователя",
  })
  @Column({ type: DataType.STRING, unique: true })
  email: string;

  @ApiProperty({
    example: "123456",
    description: "Пароль пользователя",
  })
  @Column({ type: DataType.STRING })
  password: string;
}
