import { Schema, model } from "mongoose";

const schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String },
  done: { type: Boolean },
  deadline: { type: String },
});

export default model("Task", schema);
