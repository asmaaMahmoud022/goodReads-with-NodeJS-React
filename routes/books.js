var express = require("express");
var router = express.Router();
var Book = require("../models/book");
var Rate = require("../models/rate");
var Review = require("../models/review");
var Todo = require("../models/todo");

const authUser = require("../middlewares/auth");
const upload = require("../middlewares/imageUpload");

router.get("/", async (req, res) => {
  try {
    const books = await Book.find().populate("author").populate("category");
    res.json({
      message: "All books",
      data: books,
    });
  } catch (err) {
    console.log(err);
    return res.status(403).send({ message: "can not get all books" });
  }
});

router.get("/:id", authUser, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate("author")
      .populate("category");
    const rate = await Rate.find({}).where("book").equals(book);
    const reviews = await Review.find({})
      .sort({ date: -1 })
      .where("book")
      .equals(book)
      .populate("user", "firstName lastName");
    const todo = await Todo.findOne()
      .where("user")
      .equals(req.user.id)
      .where("book")
      .equals(book);
    const myRate = await Rate.findOne()
      .where("user")
      .equals(req.user.id)
      .where("book")
      .equals(book);

    res.json({
      message: "show book details",
      data: {
        ...book.toObject(),
        rates: rate,
        reviews: reviews,
        todo,
        myRate: myRate,
      },
    });
  } catch (err) {
    return res.status(404).send({ message: "can not get this book" });
  }
});

router.post("/", authUser, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(401).send({ message: "you can not do this only admins" });
  }
  try {
    upload(req, res, async (err) => {
      try {
        if (req.file == undefined) {
          return res.status(400).send({ message: "Enter book image" });
        } else {
          const image = req.file.filename;
          const { name, author, category } = req.body;
          let book = await Book.create({ name, image, author, category });

          book = await book
            .populate("author")
            .populate("category")
            .execPopulate();
          res.json({
            message: "book added successfully",
            data: book,
          });
        }
      } catch (err) {
        console.log("eee", err);
        return res
          .status(400)
          .send({ message: "Failed, check entered data !!" });
      }
    });
  } catch (err) {
    return res.status(403).send({ message: "book added failed" });
  }
});

router.patch("/:id", authUser, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(401).send({ message: "you can not do this only admins" });
  }
  try {
    let book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate("author")
      .populate("category");
    res.json({
      message: "book updated successfully",
      data: book,
    });
  } catch (err) {
    return res.status(403).send({ message: "book updated failed" });
  }
});

router.delete("/:id", authUser, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(401).send({ message: "you can not do this only admins" });
  }
  try {
    let book = await Book.findByIdAndDelete(req.params.id);
    res.json({
      message: "book deleted successfully",
    });
  } catch (err) {
    return res.status(403).send({ message: "book deleted failed" });
  }
});

module.exports = router;
