import { Schema, model } from "mongoose";

const schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  Id: { type: Schema.Types.ObjectId },
  groupName: { type: String },
  notes: { type: Array },
});

export default model("NoteGroup", schema, "noteGroups");
