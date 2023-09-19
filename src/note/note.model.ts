import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { NoteGroup } from "./note-group.model";
import { CreateNoteDto } from "./dto/createNotesDto";

@Table({ tableName: "note", createdAt: false, updatedAt: false })
export class Note extends Model<Note, CreateNoteDto> {
  @ApiProperty({
    example: 1,
    description: "Уникальный идентификатор заметки",
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  noteId: number;

  @ApiProperty({
    example: 1,
    description: "Уникальный идентификатор группы заметок",
  })
  @ForeignKey(() => NoteGroup)
  @BelongsTo(() => NoteGroup, {
    as: "notes",
  })
  @Column({ type: DataType.INTEGER, allowNull: false })
  noteGroupId: number;

  @ApiProperty({
    example: "Описание заметки",
    description: "Текст заметки",
  })
  @Column({ type: DataType.STRING })
  text: string;

  @ApiProperty({
    example: false,
    description: "Должна ли зиметка быть скрыта на фронте",
  })
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  show: boolean;
}
