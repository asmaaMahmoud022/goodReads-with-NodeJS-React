const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    firstName: { type: String, required: [true, "can't be blank"], max: 20 },
    lastName: { type: String, required: [true, "can't be blank"], max: 20 },
    email: { type: String, match: [/\S+@\S+\.\S+/, 'Invalid Email'], unique: [true, 'Email in exists'] },
    password: { type: String, match: [/(?=.*[0-9])/, 'Invalid Password'], min: 8 },
    image: { type: String },
    books: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' }
})

userSchema.methods.getFullName = function getFullName() {
    return this.firstName + " " + this.lastName
}

const userModel = mongoose.model('User', userSchema)

module.exports = userModel