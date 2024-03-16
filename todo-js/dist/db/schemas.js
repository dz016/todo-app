import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});
const todoSchema = new Schema({
  title: String,
  description: String,
  done: Boolean,
  userId: String,
});
export const User = mongoose.model("User", userSchema);
export const Todo = mongoose.model("Todo", todoSchema);
