if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}

const express = require("express");
const app = express();

const port = 3000;

const Listing = require("./model/listing.js");
const Review = require("./model/review.js");
const User = require("./model/user.js");

const ExpressError = require("./utils/expressError.js");
const WrapAsync = require("./utils/WrapAsync.js");

const listingsRoute = require("./routes/listings.js");
const reviewsRoute = require("./routes/reviews.js");
const userRoute = require("./routes/user.js");
const searchRoute = require("./routes/search.js");

const { joi_listingSchema, Joi_reviewSchema } = require("./Schema.js");

const path = require("path");
app.set("view Engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public/css")));
app.use(express.static(path.join(__dirname, "/public/js")));

const ejsMate = require("ejs-mate");
app.engine('ejs', ejsMate);

const session = require("express-session");
const MongoStore = require('connect-mongo');


const flash = require("connect-flash");


const passport = require("passport");
const passport_local_strategy = require("passport-local");
const passport_local_mongoose_strategy = require("passport-local-mongoose");

var methodOverride = require('method-override');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const mongoose = require("mongoose");

const dbUrl = process.env.ATLASDB_URL;

main().then(() => {
    console.log(`Connected to DataBase`);
}).catch((err) => {
    console.log(err);
});

async function main() {
    // await mongoose.connect(MONGO_URL);
    await mongoose.connect(dbUrl);
};



const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET
    },// session update 
    touchAfter: 24 * 3600,
});


store.on("err", () => {
    console.log("ERROR IN MONGO SESSION STORE : ", err);
})

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    //  set expire date (use this date available without login)
    cookie:
    {
        // DAY - HOURSE - MIN - SEC - MILISEC
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        // defend for crooce scripting attect 
        httpOnly: true
    },
};




app.use(session(sessionOptions));
app.use(flash());

// Passport 

// password impelete need session -local Strategy (session need passport middleware)


app.use(passport.initialize()); // initialize passport
app.use(passport.session()); // user session 
// use static authenticate method of model in LocalStrategy
passport.use(new passport_local_strategy(User.authenticate()));// LocalStrategy to thow authenticate 
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req, res, next) => {
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    // req.user can't access direct 
    res.locals.currUser = req.user;
    next();
});



// its use to Destructure your code command path require 
app.use("/listings", listingsRoute);
// its combination of parent and child :id is parameter  use in router review.js {mergeParams : true}
app.use("/listings/:id/reviews", reviewsRoute);
app.use("/", userRoute);
app.use("/", searchRoute);




app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something Went Wrong!" } = err; // defualt value 
    res.status(statusCode).render("Error.ejs", { message });
});

app.listen(port, () => {
    console.log(`server is listening to port :${port}`);
})