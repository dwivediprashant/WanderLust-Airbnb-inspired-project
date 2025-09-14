const List = require("../models/list");
const Review = require("../models/review");
module.exports.createReview = async (req, res, next) => {
  try {
    let { id } = req.params;
    let list = await List.findById(id);
    let { comment, rating } = req.body;
    let newReview = new Review({
      comment,
      rating,
    });
    newReview.revOwner = req.session.user._id;
    // console.log(newReview);
    list.reviews.push(newReview);

    await newReview.save();
    await list.save();
    // console.log(list);
    req.flash("success", "Review added successfully !");
    res.redirect(`/list/${list._id}`);
  } catch (err) {
    next(err);
  }
};

//-destroy review=------------
module.exports.destroyReview = async (req, res) => {
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
};
