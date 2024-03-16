import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    lastname: { type: String, required: true },
    firstname: { type: String, required: true },
    image: { type: String }, // Assuming the image is stored as a string (path or URL)
});
export const User = mongoose.model("User", userSchema);
