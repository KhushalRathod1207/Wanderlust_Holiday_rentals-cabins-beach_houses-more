const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    comment: {
        type: String,
        required: true,
    },
    rating: {
        type: String,
        min: 1,
        max: 5,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    listing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing"
    },
    author:
        { type: Schema.Types.ObjectId, ref: 'User' }
});


const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;