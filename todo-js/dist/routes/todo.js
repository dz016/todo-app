import express from "express";
import { jwtAuth } from "../middleware/jstAuth.js";
import { Todo } from "../models/todo.js";
const router = express.Router();
router.get("/", jwtAuth, async (req, res) => {
  try {
    const userId = req.headers["userId"];
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
    const userId = req.headers["userId"];
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
router.post("/:id/done", jwtAuth, async (req, res) => {
  console.log("done");
  try {
    const userId = req.headers["userId"];
    if (!userId) {
      return res.status(403).json({ message: "User not logged in" });
    }
    const todoId = req.params.id;
    // Find the todo by id and user
    const todo = await Todo.findOne({ _id: todoId, userId });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    // Toggle the 'done' property
    todo.done = !todo.done;
    // Save the updated todo
    const updatedTodo = await todo.save();
    res.status(200).json({ todo: updatedTodo });
  } catch (error) {
    console.error("Error marking todo as done:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.put("/:id", jwtAuth, async (req, res) => {
  try {
    const { title, description, done } = req.body;
    const todoId = req.params.id;
    const userId = req.headers["userId"];
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
    const userId = req.headers["userId"];
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
