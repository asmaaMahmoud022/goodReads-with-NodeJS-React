const express = require("express")
const mongoose = require("mongoose")
const userRouter = require("./routes/user")
const categoryRouter = require("./routes/category")
const bookRouter = require("./routes/book")
const authorRouter = require("./routes/author")
<<<<<<< HEAD
const ratingRouter = require("./routes/ratings")
=======
>>>>>>> e794dbd9436a7b332fe9e5aaa54c5f706a6b2277
const app = express()
const port = 3000

app.use(express.json())
app.use('/categories',categoryRouter)
app.use('/books',bookRouter)
app.use('/authors',authorRouter)
app.use('/ratings',ratingRouter)
app.use('/users',userRouter)
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
