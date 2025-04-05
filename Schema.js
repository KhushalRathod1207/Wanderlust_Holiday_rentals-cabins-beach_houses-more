const Joi = require("joi");

module.exports.Joi_listingSchema = Joi.object({
    // listing object return 
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.string().allow("", null)
    }).required()
});


module.exports.Joi_reviewSchema = Joi.object({
    review: Joi.object({
        comment: Joi.string().required(),
        rating: Joi.string().required().min(1).max(5),
    }).required()
});