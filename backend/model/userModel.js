import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email är obligatorisk"],
    unique: [true, "Email address är redan registerad"],
    match: [
      /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
      "Email addres är inte giltigt",
    ],
  },
  password: {
    type: String,
    required: true,
    minLength: [5, "Password är for kort"],
    maxLenght: 15,
    match: [/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/, "Password är inte giltigt"],
  },
});

export default model("User", userSchema);
