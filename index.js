const express = require("express")
const mongoose = require("mongoose")
const app = express()
const port = 3000

mongoose.connect('mongodb://localhost:27017/goodreads',(err) => {
    if(err)
    {
        console.error(err)
        return
    }else{
        console.log("connected to db successfully")
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
