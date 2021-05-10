const mongoose = require('mongoose')

const ratingSchema = new mongoose.Schema({
    rate: { type: Number },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' }
})

const RatingModel = mongoose.model('Rating', ratingSchema)

module.exports = RatingModel
