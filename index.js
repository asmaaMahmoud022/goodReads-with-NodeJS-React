const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const authRouter = require("./routes/auth");
const authMWare = require("./middlewares/authMWare");
const app = express();
const authorRouter = require("./routes/authors");
const bookRouter = require("./routes/books");
const categRouter = require("./routes/category");
const searchRouter = require("./routes/search");
const rateRouter = require("./routes/rate");
const reviewRouter = require("./routes/reviews");
const todoRouter = require("./routes/todo");

app.use(express.json());
app.use(cors());
app.use(bodyparser.json());
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use("/api/books", bookRouter);
app.use("/api/authors", authorRouter);
app.use(bodyparser.urlencoded({ extended: true }));
app.use("/api/", authRouter);
app.use("/api/categories", categRouter);
app.use("/api/search", searchRouter);
app.use("/api/rates", rateRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/todos", todoRouter);

app.get("/*", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

mongoose.connect(
    "mongodb://localhost:27017/good-reads",
    {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    },
    (err) => {
        if (!err) console.log("Mongod Connected...");
    }
);

app.listen(5000, (err) => {
    if (!err) return console.log("welcome to good reads server");
    console.log(err);
});