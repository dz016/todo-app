import express from "express";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
const router = express.Router();
const SECRET = "ghustaba";
import bcrypt from "bcrypt";

router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    // Check if username and password are provided
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user with the hashed password
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    // Issue a JWT token
    const token = jwt.sign({ id: newUser._id }, SECRET, { expiresIn: "1h" });
    // Respond with a 201 status code and the token
    res.status(201).json({ message: "User created successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    // Check if username and password are provided
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }
    // Check if the user exists
    const user = await User.findOne({ username });
    if (user) {
      // Compare the entered password with the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        // Issue a JWT token
        const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1h" });
        return res.status(200).json({ message: "Login successful", token });
      } else {
        // Incorrect password
        return res.status(401).json({ message: "Invalid password" });
      }
    } else {
      // User doesn't exist
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
export default router;
