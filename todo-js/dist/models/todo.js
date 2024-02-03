import mongoose, { Schema } from "mongoose";
const todoSchema = new Schema({
    title: String,
    description: String,
    done: Boolean,
    userId: String,
});
export const Todo = mongoose.model("Todo", todoSchema);
