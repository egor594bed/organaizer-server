import { Types, Document } from "mongoose";
import Task from "../models/Task";

export class TaskDTO {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  text: string;
  done: boolean;
  deadline: string;
  actualData: boolean;

  constructor(task: typeof Task & Document) {
    this._id = task.get("_id");
    this.userId = task.get("userId");
    this.text = task.get("text");
    this.done = task.get("done");
    this.deadline = task.get("deadline");
    this.actualData = true;
  }
}
