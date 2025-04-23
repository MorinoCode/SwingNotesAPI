import { Schema, model } from "mongoose";

const noteSchema = new Schema({
  title: {
    type: String,
    unique: [true, "denna titlen finns redan"],
    required: [true, "title är obligatorisk"],
  },
  beskrivning: {
    type: String,
    required: [true, "beskrivning är obligatorisk"],
    minLength: [5, "beskrivning är for kort"],
  },
  userId: {
    type: String,
    required: [true, "userId är obligatorisk"],
  },
  createdAt: {
    type: Date,
    required: true,
  },
  modifiedAt: {
    type: Date,
    required: true,
  },
});

export default model("note", noteSchema);
