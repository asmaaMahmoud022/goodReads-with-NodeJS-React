const express = require("express")
const mongoose = require("mongoose")
const app = express()
const port = 3000
const CategoryModel = require('./models/category')

app.use(express.json())

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
