const joi = require("joi");

const reviewSchema = joi.object({
  comment: joi.string().required().min(10).max(200),
  rating: joi.number().min(1).max(5).required(),
});

module.exports = reviewSchema;
