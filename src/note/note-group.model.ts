import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "src/user/user.model";
import { CreateNoteGroupDto } from "./dto/createNotesDto";
import { Note } from "./note.model";

@Table({ tableName: "noteGroup", createdAt: false, updatedAt: false })
export class NoteGroup extends Model<NoteGroup, CreateNoteGroupDto> {
  @ApiProperty({
    example: 1,
    description: "Уникальный идентификатор группы заметок",
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  noteGroupId: number;

  @ApiProperty({
    example: "Пароли для всех банков где деньги лежат",
    description: "Название группы заметок",
  })
  @Column({ type: DataType.STRING })
  noteGroupName: string;

  @ApiProperty({
    example: 1,
    description: "Уникальный идентификатор пользователя",
  })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @ApiProperty({
    isArray: true,
    type: Note,
    description: "Массив заметок",
  })
  notes: Note[];
}
