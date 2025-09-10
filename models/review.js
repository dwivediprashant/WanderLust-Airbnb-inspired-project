const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  comment: { type: String },
  rating: { type: Number },
  created_at: { type: Date, default: Date.now() },
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
