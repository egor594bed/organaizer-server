import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "src/user/user.model";

export interface INoteGroup {
  userId: number;
  noteGroupName: string;
}

@Table({ tableName: "noteGroup", createdAt: false, updatedAt: false })
export class NoteGroup extends Model<NoteGroup, INoteGroup> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  noteGroupId: number;

  @Column({ type: DataType.STRING })
  noteGroupName: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @Column({ type: DataType.STRING })
  notes: string;
}
