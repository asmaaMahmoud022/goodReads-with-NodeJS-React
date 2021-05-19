// /categories/:id?page=1 GET  #anoyone
// CRUD operations..
// rate and review .. POST to add (userid, bookid, comment);
// get(by book id) .. will take a book id and return reviews or rates.

const express = require('express')
const app = express.Router();
var Rate = require('../models/rate');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
const authUser = require('../middlewares/authMWare')
var User = require('../models/user');

// Get all rates
app.get('/', async(req, res) => {

    try {
        let rate = await Rate.find({});
        res.json({
            message: "Category list",
            data: rate
        });
    } catch (err) {
        res.json({
            message: 'error',
            err: err,
        });
    }
})

// get a rate with a given book id.
app.get('/:book', async(req, res) => {
    book = req.params.book
    try {
        let rate = await Rate.find({ 'book': book });
        res.json({
            message: "rate list",
            data: rate
        });
    } catch (err) {
        return res.status(403).send({ message: "something went wrong !!" })
    }
})

// Add a new rate
app.post('/:book', authUser, async(req, res) => {
    console.log(req.body, req.user.id, req.params.book)
    const u = User.findById(req.user.id)
    if (!u) {
        return res.status(401).send({ message: "login first" })
    }
    try {
        let rate = await Rate.create({ value: req.body.value, user: req.user.id, book: req.params.book });
        res.json({
            message: "rate added successfully",
            data: rate
        });
    } catch (err) {
        return res.status(401).send({ message: "somting went wrong!!" })
    }
});

// Update a rate with a given id
app.patch('/:id', async(req, res) => {
    try {
        let rate = await Rate.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json({
            message: "rate updated successfully",
            data: rate
        });
    } catch (err) {
        res.json({
            message: 'error',
            err: err
        });
    }
});

// delete a rate with a given id.
app.delete('/:id', async(req, res) => {
    try {
        let rate = await Rate.findByIdAndDelete(req.params.id);
        res.json({
            message: "rate deleted successfully"
        });
    } catch (err) {
        res.json({
            message: 'error',
            err: err
        });
    }
});


module.exports = app