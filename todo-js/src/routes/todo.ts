import express from "express";
import { jwtAuth } from "../middleware/jstAuth";
import { Todo } from "../models/todo";
const router = express.Router();

router.get("/", jwtAuth, async (req, res) => {
  try {
    const userId = req.headers["userId"] as string;

    if (!userId) {
      return res.status(403).json({ message: "User not logged in" });
    }

    const todos = await Todo.find({ userId });

    res.status(200).json(todos);
  } catch (error) {
    console.error("Error in / route:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", jwtAuth, async (req, res) => {
  try {
    const userId = req.headers["userId"] as string;

    if (!userId) {
      return res.status(403).json({ message: "User not logged in" });
    }

    const { title, description, done } = req.body;

    const todo = new Todo({ title, description, done, userId });

    await todo.save();

    res.status(201).json(todo);
  } catch (error) {
    console.error("Error in POST / route:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.put("/:id", jwtAuth, async (req, res) => {
  try {
    const { title, description, done } = req.body;
    const todoId = req.params.id;
    const userId = req.headers["userId"] as string;

    if (!userId) {
      return res.status(403).json({ message: "User not logged in" });
    }

    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: todoId, userId },
      { title, description, done },
      { new: true }
    );

    if (!updatedTodo) {
      return res
        .status(404)
        .json({ message: "Todo not found or unauthorized" });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error("Error in PUT /:id route:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:id", jwtAuth, async (req, res) => {
  try {
    const todoId = req.params.id;
    const userId = req.headers["userId"] as string;

    if (!userId) {
      return res.status(403).json({ message: "User not logged in" });
    }

    const deletedTodo = await Todo.findOneAndDelete({ _id: todoId, userId });

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted successfully", deletedTodo });
  } catch (error) {
    console.error("Error in DELETE /:id route:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
