const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: [true, "can't be blank"], max: 20 },
    lastName: { type: String, required: [true, "can't be blank"], max: 20 },
    email: { type: String, required: [true, "can't be blank"], match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Invalid Email'], unique: [true, 'Email in exists'] },
    password: { type: String, match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/, 'Invalid Password'], min: 8 },
    image: { type: String, required: true }
})

userSchema.pre('save', async function(next){
    if (this.isNew) {
        try {
          hashed = await bcrypt.hash(this.password, 10);
          this.password = hashed;
        } catch (error) {
          console.log(error);
        }
    }
    next();
})

userSchema.methods.getFullName = function getFullName() {
    return this.first_name + " " + this.last_name;
};

const UserModel = mongoose.model("User", userSchema)

module.exports = UserModel