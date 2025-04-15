const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("../model/review.js");
const { types } = require("joi");


const ProfileSchema = new Schema({
    mobileno: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    date: { type: Date, default: Date.now }
});


// delete review when user listings delete

listSchema.post("findOneAndDelete", async (listing) => {
    //  listing.reviews.length > 0
    if (listing.reviews.length) {
        let res = await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
})

const Listing = mongoose.model("Listing", listSchema);

module.exports = Listing;