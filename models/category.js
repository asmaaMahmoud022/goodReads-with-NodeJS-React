const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({

})

const CategoryModel = mongoose.model('Category', categorySchema)

module.exports = CategoryModel