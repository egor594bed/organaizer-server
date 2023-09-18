import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { NoteGroup } from "./note-group.model";

export interface INote {
  noteGroupId: number;
  text: string;
}

@Table({ tableName: "note", createdAt: false, updatedAt: false })
export class Note extends Model<Note, INote> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  noteId: number;

  @ForeignKey(() => NoteGroup)
  @Column({ type: DataType.INTEGER, allowNull: false })
  noteGroupId: number;

  @Column({ type: DataType.STRING })
  text: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  show: boolean;
}
