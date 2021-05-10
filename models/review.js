const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    review: { type: String, required: [true, "can't be blank"] },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" }
});
  
const ReviewModel = mongoose.model("Review", reviewSchema);
  
module.exports = ReviewModel;