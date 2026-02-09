const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
  next();
});

// MongoDB connection


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.log("MongoDB error ❌", err));
  console.log(process.env.MONGO_URI);
// Schema & Model
const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
});

const Todo = mongoose.model("Todo", todoSchema);

// Routes

// Get all todos
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a todo
app.post("/todos", async (req, res) => {
  try {
    const newTodo = new Todo({ task: req.body.task });
    await newTodo.save();
    res.json(newTodo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted ✅" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});