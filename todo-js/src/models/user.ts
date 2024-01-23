import mongoose, { Document, Schema } from "mongoose";

interface UserDoc extends Document {
  username: string;
  password: string;
}
const userSchema: Schema<UserDoc> = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});
export const User = mongoose.model("User", userSchema);
