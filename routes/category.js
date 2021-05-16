const express = require("express")
const category_model = require("../models/category")
const book_model = require("../models/book")
const router= express.Router()


// create new category 
router.post('/', (req, res) => {
    // get category data from body
    const categoryData=req.body
    // create new instance
    const categoryInstance= new category_model({
        name: categoryData.name,
    });
    // save new category to db
    categoryInstance.save((err, doc) => {
        if (err) {
            return res.send('Error while saving data: ', err)
        } else {
            return res.json(doc)
        }
      });
});

// list all categories
router.get('/', (req, res) => {
    const limitVar = parseInt(req.query.limit); 
    const skipVar = parseInt(req.query.skip);
    category_model.find({} ,(err, data) => {
        if (err) {
            return res.send('Error while get data: ', err)
        } else {
            return res.json(data)
        }
    }).limit(limitVar)
      .skip(skipVar);
  })

// get category with id
router.get('/:id', (req, res) => {
    const limitVar = parseInt(req.query.limit); 
    const skipVar = parseInt(req.query.skip);
    category_model.findById(req.params.id).exec((err, c_data) => {    
        if (err) {
            return res.send('Error while get data: ', err)
        } else {
            book_model.find({"category":req.params.id}).limit(limitVar).skip(skipVar).populate('author').exec((err,b_data) => { 
                return res.json({
                    category_data:c_data,
                    books:b_data,
                });     
            })
        }
    });
});

   
// update category with id
router.put('/:id', (req, res) => {

const categoryData=req.body
category_model.findOneAndUpdate({ _id : req.params.id}, {$set: { name: categoryData.name}}, (err, data) => {
    if (err) {
        return res.send('Error while fet data: ', err)
    } else {
        return res.json(data)
    }
});

});
   
// delete category with id
router.delete('/:id', (req, res) => {
    category_model.remove({ _id: req.params.id,}, (err) => {
        if (err) {
            return res.send('Error while delete this category : ', err)
        } else {
            return res.send('category deleted successfully ')
        }
    });
});  

module.exports = router