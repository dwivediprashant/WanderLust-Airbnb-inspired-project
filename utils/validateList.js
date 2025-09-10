const listSchema = require("../joiValidations/listSchema");
const ExpressError = require("../utils/ExpressError");
const validateList = (req, res, next) => {
  let { error } = listSchema.validate(req.body);
  if (error) {
    // console.log(error.details[0].message);
    throw new ExpressError(400, error.details[0].message);
  } else {
    next();
  }
};

module.exports = validateList;
