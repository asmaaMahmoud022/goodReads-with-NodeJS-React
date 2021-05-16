const express = require("express")
const category_model = require("../models/category")
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
    category_model.find({},(err, data) => {
        if (err) {
            return res.send('Error while get data: ', err)
        } else {
            return res.json(data)
        }
    });
  })

// get category with id
router.get('/:id', (req, res) => {
    category_model.findById({ _id : req.params.id},(err, data) => {
        if (err) {
            return res.send('Error while fet data: ', err)
        } else {
            return res.json(data)
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