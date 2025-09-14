const express = require("express");
const router = express.Router({ mergeParams: true });
const List = require("../models/list.js");
const validatereview = require("../middlewares/validateReview.js");
const Review = require("../models/review.js");
const isLogin = require("../middlewares/isLogin.js");
const isReviewOwner = require("../middlewares/isReviewOwner.js");

//-------------review post route--------------
router.post("/", isLogin, validatereview, async (req, res, next) => {
  try {
    let { id } = req.params;
    let list = await List.findById(id);
    let { comment, rating } = req.body;
    let newReview = new Review({
      comment,
      rating,
    });
    newReview.revOwner = req.session.user._id;
    console.log(newReview);
    list.reviews.push(newReview);
    await newReview.save();
    await list.save();
    req.flash("success", "Review added successfully !");
    res.redirect(`/list/${list._id}`);
  } catch (err) {
    next(err);
  }
});
//--------review delete route-----------------------
router.delete("/:reviewId", isLogin, isReviewOwner, async (req, res) => {
  try {
    let { id, reviewId } = req.params;
    let pulledReviews = await List.findByIdAndUpdate(
      id,
      {
        $pull: { reviews: reviewId },
      },
      { runValidators: true, new: true }
    );
    let deletedReview = await Review.findByIdAndDelete(reviewId);
    console.log(deletedReview, " is deleted review");
    // console.log(pulledReviews, " is pulled reviews");
    req.flash("success", "Review deleted successfully !");
    res.redirect(`/list/${id}`);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
