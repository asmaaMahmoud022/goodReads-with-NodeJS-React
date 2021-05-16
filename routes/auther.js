const express = require("express")
const author_model = require("../models/author")
const router= express.Router()


// create new author 
router.post('/', (req, res) => {
    // get author data from body
    const authorData=req.body
    // create new instance
    const authorInstance= new author_model({
        firstName: authorData.firstName,
        lastName: authorData.lastName,
        dob: authorData.dob,
        image: authorData.image,
    });
    // save new author to db
    authorInstance.save((err, doc) => {
        if (err) {
            return res.send('Error while saving data: ', err)
        } else {
            return res.json(doc)
        }
      });
    // return res.send('created author');
});

// list all author
router.get('/', (req, res) => {
    author_model.find({},(err, data) => {
        if (err) {
            return res.send('Error while get data: ', err)
        } else {
            return res.json(data)
        }
    });
  })

// get author with id
router.get('/:id', (req, res) => {
    author_model.findById({ _id : req.params.id},(err, data) => {
        if (err) {
            return res.send('Error while fet data: ', err)
        } else {
            return res.json(data)
        }
    });
});

   
// update author with id
router.put('/:id', (req, res) => {
const authorData=req.body
author_model.findOneAndUpdate({ _id : req.params.id}, {$set: {firstName: authorData.firstName, lastName: authorData.lastName,dob: authorData.dob,image: authorData.image}}, (err, data) => {
    if (err) {
        return res.send('Error while fet data: ', err)
    } else {
        return res.json(data)
    }
});

});
   
// delete author with id
router.delete('/:id', (req, res) => {
    author_model.remove({ _id: req.params.id,}, (err) => {
        if (err) {
            return res.send('Error while delete author : ', err)
        } else {
            return res.send('author deleted successfully: ')
        }
    });
});  

module.exports = router