import { Schema, Types, model } from "mongoose";

const schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: false,
  },
  groupName: { type: String },
  notes: { type: Array, default: [] },
});

export default model("NoteGroup", schema, "noteGroups");
