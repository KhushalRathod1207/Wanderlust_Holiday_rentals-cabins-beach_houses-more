
const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../model/listing.js");
const Review = require("../model/review.js");
const ExpressError = require("../utils/expressError.js");
const WrapAsync = require("../utils/WrapAsync.js");
const { Joi_listingSchema, Joi_reviewSchema } = require("../Schema.js");
const { isLoggedin, validateListing, validateReview, isReviewAuthor } = require("../utils/middleware.js");

const profileController = require("../controllers/profile.js");
const { getProfilePage } = require("../controllers/profile.js");


const { renderProfilePage } = require("../controllers/profile.js");
const { updateProfile } = require("../controllers/profile.js");


// View profile page
router.get("/:id", isLoggedin, WrapAsync(profileController.renderProfilePage));

// Handle update form submission
router.post("/:id/update", isLoggedin, WrapAsync(profileController.updateProfile));


router.route("/:id")
    .get(WrapAsync(profileController.getProfilePage));


module.exports = router;
