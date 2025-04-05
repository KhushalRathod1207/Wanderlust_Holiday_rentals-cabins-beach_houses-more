const { Joi_listingSchema, Joi_reviewSchema } = require("../Schema.js");
const Listing = require("../model/listing.js");
const Review = require("../model/review.js");


module.exports.isLoggedin = (req, res, next) => {
    // console.log(req.user, "...", req.originalUrl);
    if (!req.isAuthenticated()) {
        // redirectUrl user login direct create new post , but user not login then show login form and direct whose page user stop create listings
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to listing!");
        return res.redirect("/login");
    }
    next();
}

/*

question:- Why need this extra middleware ?
ans : becase when user go to create listings page but not login then show login page and user login , when user redirect direct "/listings" page but it's not good so use req.session.redirectUrl store rediect url information 

- main part of create middleware beacuse when user login then passport update req.original url then save on req.session.redirectUrl

 */

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

//  validateListing using schema  ()
// validation listing for use for joi_schema 
// validate using joi schema  (server side check any filed missing when user input )



module.exports.validateListing = (req, res, next) => {
    let { error } = Joi_listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(404, errMsg);
    }
    else {
        next();
    }
}




// validation listing for use for joi_schema 
// validate using joi schema  (server side check any filed missing when user input )



module.exports.validateReview = (req, res, next) => {
    let { error } = Joi_reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(404, errMsg);
    }
    else {
        next();
    }
}


module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner._id.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not owner of this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isReviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if (!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not author of this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
}