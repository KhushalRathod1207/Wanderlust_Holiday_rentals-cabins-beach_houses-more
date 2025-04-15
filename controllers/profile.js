const User = require('../model/user');
const Listing = require('../model/listing');



module.exports.renderProfilePage = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    const listings = await Listing.find({ owner: user._id });
    res.render("profile.ejs", { user, listings, currUser: req.user });
};

module.exports.updateProfile = async (req, res) => {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body.user, { new: true });
    req.flash("success", "Profile updated successfully!");
    res.redirect(`/profile/${id}`);
};


module.exports.getProfilePage = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);  // Find user by ID
        const listings = await Listing.find({ owner: id });  // Find listings by the user

        // Render the profile page with the user and listings
        res.render('profile.ejs', {  // Make sure 'profile' corresponds to the file 'profile.ejs'
            user: user,
            currUser: req.user,  // Logged-in user
            listings: listings
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading profile');
    }
};
