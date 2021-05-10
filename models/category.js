const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: { type: String, required: [true, "can't be blank"], unique: [true, 'Name must be unique'] }
})

const CategoryModel = mongoose.model('Category', categorySchema)

module.exports = CategoryModel