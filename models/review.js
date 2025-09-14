const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  comment: { type: String },
  rating: { type: Number },
  created_at: { type: Date, default: Date.now },
  revOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
