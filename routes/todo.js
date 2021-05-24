const express = require("express");
const User = require("../models/user");
const Todo = require("../models/todo");
const authUser = require("../middlewares/auth");
const router = express.Router();

router.get("/", authUser, async (req, res) => {
  const u = User.findById(req.user.id);
  if (!u) return res.status(401).send({ message: "Login First" });
  try {
    const list = await Todo.find({ user: req.user.id }).populate("book");
    return res.json({
      message: "your todo list",
      data: list,
    });
  } catch (error) {
    return res.status(403).send({ message: error });
  }
});

router.post("/:book", authUser, async (req, res) => {
  const u = User.findById(req.user.id);
  if (!u) return res.status(401).send({ message: "Login First" });
  try {
    const todo = await Todo.create({
      shelve: req.body.shelve,
      user: req.user.id,
      book: req.params.book,
    });
    return res.json({
      message: "todo added successfully",
      data: todo,
    });
  } catch (error) {
    return res.status(403).send({ message: error });
  }
});

router.patch("/:book", authUser, async (req, res) => {
  const u = User.findById(req.user.id);
  if (!u) return res.status(401).send({ message: "Login First" });
  try {
    const todo = await Todo.findOneAndUpdate(
      { book: req.params.book, user: req.user.id },
      { shelve: req.body.shelve },
      { new: true }
    );
    return res.json({
      message: "shelve updated successfully",
      data: todo,
    });
  } catch (error) {
    return res.status(403).send({ message: error });
  }
});

module.exports = router;