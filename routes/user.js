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

const usersControllers = require("../controllers/users.js");
const { route } = require("./listings.js");

router.route("/singUp")
    .get(usersControllers.signup_Page_Render)
    .post(WrapAsync(usersControllers.user_Singup_On_Website));


router.route("/login")
    .get(usersControllers.login_Page_Render)
    .post(saveRedirectUrl, passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), usersControllers.login_User)

// router.get("/singUp", usersControllers.signup_Page_Render);


// router.post("/singUp", WrapAsync(usersControllers.user_Singup_On_Website));


// router.get("/login", usersControllers.login_Page_Render);


// router.post("/login", saveRedirectUrl, passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), usersControllers.login_User);

router.get("/logout", usersControllers.logout_User);

module.exports = router;
