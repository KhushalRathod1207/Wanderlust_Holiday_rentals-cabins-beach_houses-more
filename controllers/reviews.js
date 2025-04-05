const Listing = require("../model/listing.js");
const Review = require("../model/review.js");


module.exports.create_review = async (req, res) => {
    // both side inseert listings , reviews 
    let listing = await Listing.findById(req.params.id);
    let newReview = await Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Created");
    res.redirect(`/listings/${listing._id}`);
};



module.exports.delete_Review = async (req, res) => {
    let { id, reviewId } = req.params;
    // pull mean remove  clientside brower but not remove in listing in database 
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findById(reviewId);
    req.flash("success", " Review Deleted!");
    res.redirect(`/listings/${id}`);
}