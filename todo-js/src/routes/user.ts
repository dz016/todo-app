import express, { Request, Response, Router } from "express";
import { User } from "../models/user";
import jwt from "jsonwebtoken";
const router = express.Router();
const SECRET = "ghustaba";
import bcrypt from "bcrypt";
import { jwtAuth } from "../middleware/jstAuth";
import { upload } from "../middleware/jstAuth";

router.post("/signup", async (req, res) => {
  try {
    const { username, password, firstname, lastname } = req.body;
    console.log({ username, password });

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
    const newUser = new User({
      username,
      password: hashedPassword,
      firstname,
      lastname,
    });
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
router.post("/login", async (req: Request, res: Response) => {
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
router.get("/me", jwtAuth, async (req, res) => {
  try {
    const userId = req.headers["userId"];

    if (!userId) {
      return res.status(403).json({ message: "User not logged in" });
    }

    const user = await User.findOne({ _id: userId });

    if (user) {
      return res.json({ username: user.username });
    } else {
      return res.status(403).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error in /me route:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
// POST update user details or upload profile picture
router.post(
  "/profile",
  jwtAuth,
  upload.single("profilepicture"),
  async (req, res) => {
    try {
      console.log("inRoute");
      const userId = req.headers["userId"];

      if (!userId) {
        return res.status(403).json({ message: "User not logged in" });
      }
      console.log(req.file);

      const updatedUser: any = {};

      if (req.file) {
        updatedUser.image = req.file.path;
      }

      if (req.body.username) {
        updatedUser.username = req.body.username;
      }

      console.log(req.body.firstname);
      console.log(req.body.lastname);

      if (req.body.firstname) {
        updatedUser.firstname = req.body.firstname;
      }

      if (req.body.lastname) {
        updatedUser.lastname = req.body.lastname;
      }
      const user = await User.findByIdAndUpdate(userId, updatedUser, {
        new: true,
      });

      if (user) {
        return res
          .status(200)
          .json({ message: "Profile updated successfully" });
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error("Error in /profile POST route:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

// GET profile picture
router.get("/profile", jwtAuth, async (req, res) => {
  try {
    const userId = req.headers["userId"];

    if (!userId) {
      return res.status(403).json({ message: "User not logged in" });
    }

    const user = await User.findOne({ _id: userId });

    if (user) {
      const { username, image, firstname, lastname } = user;
      console.log(username, image, firstname, lastname);
      // Respond with the profile picture URL
      return res.json({ username, image, firstname, lastname });
    } else {
      return res.status(404).json({ message: "Profile picture not found" });
    }
  } catch (error) {
    console.error("Error in /profile GET route:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
