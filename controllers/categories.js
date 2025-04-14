const categories = require("../routes/categories");
const Listing = require("../model/listing.js");


module.exports.categories_display = async (req, res) => {
    const { category } = req.params;
    const listings = await Listing.find({ category });
    res.render("category.ejs", { category, listings });
};