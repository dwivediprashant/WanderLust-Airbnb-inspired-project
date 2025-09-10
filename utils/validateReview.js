const reviewSchema = require("../joiValidations/reviewSchema");
const ExpressError = require("../utils/ExpressError");

const validatereview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error.details[0].message);
  } else {
    next();
  }
};

module.exports = validatereview;
