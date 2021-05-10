const mongoose = require('mongoose')

const shelveSchema = new mongoose.Schema({
    status: { type: String, enum: ['read', 'reading', 'want to read'] },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
})

const ShelveModel = mongoose.model('Shelve', shelveSchema)

module.exports = ShelveModel