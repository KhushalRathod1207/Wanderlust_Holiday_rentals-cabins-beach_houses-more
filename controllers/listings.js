const Listing = require("../model/listing.js");

// index route 

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    req.flash("success", "Welcome to WanderLust");
    res.render("listings/index.ejs", { allListings });
};

module.exports.render_New_Listing_Form = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.show_New_Create_Listing = async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;
    // console.log(url, "...", filename);
    const newListing = new Listing(req.body.listing); // listing obj create on new.ejs like listings[title]...
    // save current user id 
    newListing.owner = req.user._id; // current user
    newListing.image = { url, filename };
    console.log(newListing);
    await newListing.save();
    req.flash("success", "successfully add new Listing");
    res.redirect("/listings");
}



module.exports.show_Perticular_Listing = async (req, res) => {
    let { id } = req.params;
    // populate method are use to display all reviews  and user populate all infomation
    const listing = await Listing.findById(id).populate({
        path: "reviews", populate: {
            path: "author"
        }
    }).populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested for does not exits");
        res.redirect("/listings");
    }
    // console.log(listing);
    res.render("listings/show.ejs", { listing });
};



module.exports.show_Perticular_Listing_Update_Form = async (req, res) => {

    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exits");
        res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
}



module.exports.show_Update_Listing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });// pass object destruct of body 
    if (typeof req.file != "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }

    req.flash("success", "Listing successfully Edit!");
    res.redirect(`/listings/${id}`);
};



module.exports.delete_listing = async (req, res) => {
    let { id } = req.params;
    let userDelete = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
}