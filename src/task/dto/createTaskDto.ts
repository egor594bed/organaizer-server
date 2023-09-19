import { ApiProperty } from "@nestjs/swagger";
export class CreateTaskDto {
  @ApiProperty({
    example: 1,
    description: "Уникальный идентификатор пользователя",
  })
  readonly userId: number;

  @ApiProperty({
    example: "Описание задачи",
    description: "Текст задачи",
  })
  readonly text: string;

  @ApiProperty({
    example: "2022-01-01",
    description: "Дедлайн задачи",
  })
  readonly deadline?: string;
}
