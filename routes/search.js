
const express = require("express");
const app = express.Router();
var bodyParser = require("body-parser");
var Book = require("../models/book");
app.use(bodyParser.json());

app.get("/:q", async (req, res) => {
  // Object of the user to sign up.
  search_object = req.params.q;
  // with regex to get the search_object ('like' command).
  const found_by_name = await Book.find({
    name: { $regex: ".*" + search_object + ".*" },
  }).populate("author");

  if (found_by_name) {
    obj_name = {
      message: "found by name",
      data: found_by_name,
    };
    res.send(obj_name);
  }
});

module.exports = app;