const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    firstName: { type: String, required: [true, "can't be blank"], max: 20 },
    lastName: { type: String, required: [true, "can't be blank"], max: 20 },
    dob: { type: Date, required: true },
    image: { type: String, required: true }
})

authorSchema.methods.getFullName = function getFullName() {
    return this.firstName + " " + this.lastName
}

const AuthorModel = mongoose.model('Author', authorSchema)

module.exports = AuthorModel