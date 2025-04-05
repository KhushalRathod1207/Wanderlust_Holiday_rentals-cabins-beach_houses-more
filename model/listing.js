const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("../model/review.js");


const listSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description:
    {
        type: String,
        required: true,
    },
    image:
    {
        // type: String,
        // // if not set value of image (null & undefine)
        // default: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        // // if set image but not pass value (Khali) (client and serverside Error aave tyare occur)
        // set: (v) => v === "" ? "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v

        url: String,
        filename: String,
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        require: true,
    },
    country: {
        type: String,
        require: true,
    },
    // one to many reation review 
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review",
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },

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