const express = require("express")
const book_model = require("../models/book")
const rating_model = require("../models/rating")
const router= express.Router()


// create new book 
router.post('/', (req, res) => {
    // get book data from body
    const bookData=req.body
    // create new instance
    const bookInstance= new book_model({
        name: bookData.name,
        cover: bookData.cover,
        auther: bookData.auther,
        category: bookData.category
    });
    // save new book to db
    bookInstance.save((err, doc) => {
        if (err) {
            return res.send('Error while saving data: ', err)
        } else {
            return res.json(doc)
        }
    });
});

// list all book
router.get('/', (req, res) => {
    const limitVar = parseInt(req.query.limit); 
    const skipVar = parseInt(req.query.skip);
    book_model.find().limit(limitVar).skip(skipVar).populate('author').exec((err, data) => {    
        if (err) {
            return res.send('Error while get data: ', err)
        } else {
            return res.json(data)
        }
    });
})

// get book with id
router.get('/:id', (req, res, next) => {
    book_model.findById(req.params.id).populate('author').populate('category').exec((err, data) => {
        rating_model.find({"book":req.params.id},(err, rates) => {   
            return res.json({
                book_data:data,
                rate:rates
             });
        })
    })
});

   
// update book with id
router.put('/:id', (req, res) => {
    const bookData=req.body
    book_model.findOneAndUpdate({ _id : req.params.id}, {$set: {name: bookData.name, cover: bookData.cover,auther: bookData.auther, category: bookData.category}}, (err, data) => {
        if (err) {
            return res.send('Error while update data: ', err)
        } else {
            return res.json(data)
        }
    });

});
   
// delete book with id
router.delete('/:id', (req, res) => {
    book_model.remove({ _id: req.params.id,}, (err) => {
        if (err) {
            return res.send('Error while delete book : ', err)
        } else {
            return res.send('book deleted successfully ')
        }
    });
});  

module.exports = router