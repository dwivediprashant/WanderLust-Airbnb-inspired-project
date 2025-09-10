const joi = require("joi");

const listSchema = joi.object({
  title: joi.string().required(),
  description: joi.string().min(10).max(200).required(),
  image: joi
    .string()
    .uri()
    .default(
      "https://www.imghotels.com/wp-content/uploads/img-hotels-IADGV_006-Dusk-Exterior-home.jpg"
    )
    .allow(""),
  price: joi.number().min(1).required(),
  location: joi.string().required(),
  country: joi.string().required(),
});

module.exports = listSchema;
