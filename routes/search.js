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

const searchControllers = require("../controllers/search.js");
const { route } = require("./listings.js");
const { search_model } = require("../controllers/search.js");




router.route("/search")
    .get(WrapAsync(searchControllers.search_model));


module.exports = router;
