const Review = require("../models/review");

const isReviewOwner = async (req, res, next) => {
  let { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  console.log(review);
  console.log(req.session);
  if (review.revOwner != req.session.user._id) {
    req.flash("error", "This review is created by OTHER USER!");
    return res.redirect(`/list/${id}`);
  }
  next();
};

module.exports = isReviewOwner;
