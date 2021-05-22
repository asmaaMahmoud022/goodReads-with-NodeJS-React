
const express = require('express')
const app = express.Router();
var Category = require('../models/category');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
const authUser = require('../middlewares/authMWare')

// Get all categories
app.get('/', async(req, res) => {

    try {
        let category = await Category.find({});
        res.json({
            message: "Categories list",
            data: category
        });
    } catch (err) {
        return res.status(403).send({ message: 'can not get all categories' })
    }
})

// get a category with an id
app.get('/:id', async(req, res) => {

    categoryId = req.params.id
    try {
        let category = await Category.findById(categoryId);
        res.json({
            message: "Category details",
            data: category
        });
    } catch (err) {
        return res.status(404).send({ message: 'can not get this category' })
    }
})

// Add a new category
app.post('/', authUser, async(req, res) => {
    if (!req.user.isAdmin) {
        return res.status(401).send({ message: "you can not do this only admins" })
    }
    try {

        let category = await Category.create(req.body);
        res.json({
            message: "Category added successfully",
            data: category
        });
    } catch (err) {
        return res.status(401).send({ message: 'Category added field' })
    }
});

// Update a categoty with a given id
app.patch('/:id', authUser, async(req, res) => {
    if (!req.user.isAdmin) {
        return res.status(401).send({ message: "you can not do this only admins" })
    }
    try {
        let category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({
            message: "category updated successfully",
            data: category
        });
    } catch (err) {
        return res.status(401).send({ message: 'Category updated field' })
    }
});

// delete a category with a given id.
app.delete('/:id', authUser, async(req, res) => {
    if (!req.user.isAdmin) {
        return res.status(401).send({ message: "you can not do this only admins" })
    }
    try {
        let category = await Category.findByIdAndDelete(req.params.id);
        res.json({
            message: "category deleted successfully"
        });
    } catch (err) {
        return res.status(401).send({ message: 'Category deleted field' })
    }
});


module.exports = app