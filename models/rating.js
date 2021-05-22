const mongoose = require('mongoose')

const rateSchema = new mongoose.Schema({
    value: { type: Number },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' }
})

const rateModel = mongoose.model('Rating', rateSchema)

module.exports = rateModel
