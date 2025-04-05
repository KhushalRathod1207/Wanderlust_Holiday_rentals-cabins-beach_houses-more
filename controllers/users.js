const Listing = require("../model/listing.js");
const Review = require("../model/review.js");
const User = require("../model/user.js");

module.exports.signup_Page_Render = (req, res) => {
    res.render("users/singUp.ejs");
}

module.exports.user_Singup_On_Website = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const registerUser = await User.register(newUser, password);
        console.log(registerUser);
        req.login(registerUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to Wanderlust");
            res.redirect("/listings");
        })
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/singUp");
    }
};

module.exports.login_Page_Render = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.login_User = async (req, res) => {
    req.flash("success", "Welcome back to Wanderlust !")
    // error login time 
    let redirectUrl = res.locals.redirectUrl || '/listings';
    res.redirect(redirectUrl);
};

module.exports.logout_User = (req, res) => {
    // callback parameter 
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "logged you out!");
        res.redirect("/listings");
    })
}