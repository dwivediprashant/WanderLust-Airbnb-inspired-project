const joi = require("joi");

const listSchema = joi.object({
  title: joi.string().required(),
  description: joi.string().min(10).max(200).required(),
  price: joi.number().min(1).required(),
  location: joi.string().required(),
  country: joi.string().required(),
});

module.exports = listSchema;
