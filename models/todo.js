const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    shelve: { type: String, enum: ['read', 'reading', 'want to read'] },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
})

const todoModel = mongoose.model('Todo', todoSchema)

module.exports = todoModel