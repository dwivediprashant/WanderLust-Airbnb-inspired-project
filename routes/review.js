const express = require("express");
const router = express.Router({ mergeParams: true });
const List = require("../models/list.js");
const validatereview = require("../middlewares/validateReview.js");
const isLogin = require("../middlewares/isLogin.js");
const isReviewOwner = require("../middlewares/isReviewOwner.js");
//- review controller
const reviewController = require("../controllers/review");
//-------------review post route--------------
router.route("/").post(isLogin, validatereview, reviewController.createReview);

//--------review delete route-----------------------
router
  .route("/:reviewId")
  .delete(isLogin, isReviewOwner, reviewController.destroyReview);

module.exports = router;
