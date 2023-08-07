import { Schema, model } from "mongoose";

const schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  Id: { type: Schema.Types.ObjectId },
  done: { type: Boolean },
  deadline: { type: Boolean || String },
});

export default model("Task", schema);
