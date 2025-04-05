const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passport_local_mongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    }
    // username and passport 
    // auto define username and passport field
});

// autho define 
userSchema.plugin(passport_local_mongoose);
module.exports = mongoose.model("User", userSchema);