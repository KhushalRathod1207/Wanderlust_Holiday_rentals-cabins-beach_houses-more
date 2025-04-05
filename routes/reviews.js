const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../model/listing.js");
const Review = require("../model/review.js");
const ExpressError = require("../utils/expressError.js");
const WrapAsync = require("../utils/WrapAsync.js");
const { Joi_listingSchema, Joi_reviewSchema } = require("../Schema.js");
const { isLoggedin, validateListing, validateReview, isReviewAuthor } = require("../utils/middleware.js");

const reviewsController = require("../controllers/reviews.js");



// review Route
// "/listings/:id/review"

router.post("/", isLoggedin, validateReview, WrapAsync(reviewsController.create_review));


router.delete("/:reviewId", isLoggedin, isReviewAuthor, WrapAsync(reviewsController.delete_Review));


module.exports = router;