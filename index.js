const express = require("express")
const mongoose = require("mongoose")
const authRouter = require("./routes/auth");
const categoryRouter = require("./routes/category")
const bookRouter = require("./routes/book")
const authorRouter = require("./routes/author")
const rateRouter = require("./routes/rate");
const reviewRouter = require("./routes/reviews");
const app = express()
const port = 3000

app.use(express.json())
app.use('/categories',categoryRouter)
app.use('/books',bookRouter)
app.use('/authors',authorRouter)
app.use('/rates',rateRouter)
app.use("/reviews", reviewRouter);
app.use('/users',authRouter)
mongoose.connect('mongodb://localhost:27017/goodreads', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    }, (err) => {
            if(err)
            {
                console.error(err)
                return
            } else{
                console.log("connected to db successfully")
            }
    })

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
