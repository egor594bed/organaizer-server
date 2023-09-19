import { ApiProperty } from "@nestjs/swagger";

export class CreateNoteDto {
  @ApiProperty({
    example: 1,
    description: "Уникальный идентификатор группы заметок",
  })
  readonly noteGroupId: number;

  @ApiProperty({
    example: "Описание заметки",
    description: "Текст заметки",
  })
  readonly text: string;
}

export class CreateNoteGroupDto {
  @ApiProperty({
    example: 1,
    description: "Уникальный идентификатор пользователя",
  })
  readonly userId: number;

  @ApiProperty({
    example: "Пароли для всех банков где деньги лежат",
    description: "Название группы заметок",
  })
  readonly noteGroupName: string;
}
