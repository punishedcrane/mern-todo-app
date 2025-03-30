const express = require("express");
const Todo = require("../models/Todo");

const router = express.Router();

// Get all todos
router.get("/todos", async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

// Add a new todo
router.post("/todos", async (req, res) => {
    const newTodo = new Todo({ text: req.body.text });
    await newTodo.save();
    res.json(newTodo);
});

// Delete a todo
router.delete("/todos/:id", async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
});

module.exports = router;
