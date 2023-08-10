import { Types, Document } from "mongoose";
import NoteGroup from "../models/NoteGroup";

export class NoteGroupDTO {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  groupName: string;
  notes: Array<any>;
  actualData: boolean;

  constructor(noteGroup: typeof NoteGroup & Document) {
    this._id = noteGroup.get("_id");
    this.userId = noteGroup.get("userId");
    this.groupName = noteGroup.get("groupName");
    this.notes = noteGroup.get("notes");
    this.actualData = true;
  }
}
