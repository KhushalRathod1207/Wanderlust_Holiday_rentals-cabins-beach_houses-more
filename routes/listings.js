const express = require("express");
const router = express.Router();
const Listing = require("../model/listing.js");
const Review = require("../model/review.js");
const ExpressError = require("../utils/expressError.js");
const WrapAsync = require("../utils/WrapAsync.js");
const { Joi_listingSchema, Joi_reviewSchema } = require("../Schema.js");
const { isLoggedin, validateListing, isOwner, } = require("../utils/middleware.js");

const listingsController = require("../controllers/listings.js");


const multer = require('multer')
const { storage } = require("../cloudConfing.js");
const upload = multer({ storage }); // multer save file on cloud storage 



//  validateListing using schema  ()
// validation listing for use for joi_schema 
// validate using joi schema  (server side check any filed missing when user input )


router.route("/")
    // index  route - All route
    .get(WrapAsync(listingsController.index))
    // create route post request 
    .post(isLoggedin, upload.single('listing[image]'), WrapAsync(listingsController.show_New_Create_Listing));
// are use upload on cloud
// .post(upload.single('listing[image]'), (req, res) => {
//     res.send(req.file);
// })


// create route  - write new Route this beacuse check id 

router.get("/new", isLoggedin, listingsController.render_New_Listing_Form);


router.route("/:id")
    // show route
    .get(WrapAsync(listingsController.show_Perticular_Listing))
    // update put request
    .put(isLoggedin, isOwner, upload.single('listing[image]'), validateListing, WrapAsync(listingsController.show_Update_Listing))
    // delete
    .delete(isLoggedin, isOwner, WrapAsync(listingsController.delete_listing))





// index  route - All route

// router.get("/", WrapAsync(listingsController.index));



// router.post("/", isLoggedin, validateListing, WrapAsync(listingsController.show_New_Create_Listing));


// show route 

// router.get("/:id", WrapAsync(listingsController.show_Perticular_Listing));

// update/edit  route 

router.get("/:id/edit", isLoggedin, isOwner, WrapAsync(listingsController.show_Perticular_Listing_Update_Form));



// router.put("/:id", isLoggedin, isOwner, validateListing, WrapAsync(listingsController.show_Update_Listing));


// delete route 

// router.delete("/:id", isLoggedin, isOwner, WrapAsync(listingsController.delete_listing));


module.exports = router;