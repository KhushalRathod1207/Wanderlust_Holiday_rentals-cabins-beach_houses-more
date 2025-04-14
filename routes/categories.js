const express = require("express");
const router = express.Router();
const Listing = require("../model/listing.js");
const Review = require("../model/review.js");
const User = require("../model/user.js")
const ExpressError = require("../utils/expressError.js");
const WrapAsync = require("../utils/WrapAsync.js");
const { Joi_listingSchema, Joi_reviewSchema } = require("../Schema.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../utils/middleware.js");
const categoriesControllers = require("../controllers/search.js");

const { route } = require("./listings.js");
const { categories_display } = require("../controllers/categories.js");


router.route("/category/:category")
    .get(WrapAsync(categories_display));


module.exports = router;
