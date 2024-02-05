import mongoose, { Document, Schema } from "mongoose";

interface UserDoc extends Document {
  username: string;
  password: string;
  lastname: string;
  firstname: string;
  image?: string; // Optional image field
}

const userSchema: Schema<UserDoc> = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  lastname: { type: String, required: true },
  firstname: { type: String, required: true },
  image: { type: String }, // Assuming the image is stored as a string (path or URL)
});

export const User = mongoose.model<UserDoc>("User", userSchema);
