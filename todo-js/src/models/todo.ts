import mongoose, { Document, Schema } from "mongoose";
interface TodoDoc extends Document {
  title: string;
  description: string;
  done: boolean;
  userId: string;
}
const todoSchema: Schema<TodoDoc> = new Schema({
  title: String,
  description: String,
  done: Boolean,
  userId: String,
});
export const Todo = mongoose.model("Todo", todoSchema);
