import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({
    example: "1@mail.ru",
    description: "Электронная почта пользователя",
  })
  readonly email: string;

  @ApiProperty({
    example: "123456",
    description: "Пароль пользователя",
  })
  readonly password: string;
}
