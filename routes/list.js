const express = require("express");
const List = require("../models/list.js");
const validateList = require("../middlewares/validateList.js");
const router = express.Router({ mergeParams: true });
const isLogin = require("../middlewares/isLogin.js");
const isOwner = require("../middlewares/isOwner.js");

///-------index route-----------------------
router.get("/", async (req, res, next) => {
  try {
    // console.log(res.locals.currUser);
    const lists = await List.find().sort({ _id: -1 });
    res.render("listing/list", { lists });
  } catch (err) {
    next(err);
  }
});
//-------serve form for adding place------
router.get("/new", isLogin, (req, res) => {
  res.render("listing/form.ejs");
});
//---------post(create) route------------

router.post("/", validateList, async (req, res, next) => {
  try {
    let { title, description, price, location, country, image } = req.body;
    let newList = new List({
      title,
      description,
      price,
      location,
      country,
      image,
    });
    newList.owner = req.session.user._id; //current user ki id
    await newList.save();
    console.log(newList, " added succesfully!");
    console.log(req.session, " request object");
    req.flash("success", "New list added successfully !");
    res.redirect("/list");
  } catch (err) {
    // console.log(err);
    next(err);
  }
});
//--------edit route-------
router.get("/:id/edit", isLogin, isOwner, async (req, res, next) => {
  try {
    let { id } = req.params;
    let list = await List.findById(id);
    res.render("listing/edit.ejs", { list });
  } catch (err) {
    // console.log(err);
    next(err);
  }
});
//------update route----------
router.put("/:id", isLogin, isOwner, validateList, async (req, res, next) => {
  try {
    let { id } = req.params;
    let { title, description, price, location, country, image } = req.body;
    await List.findByIdAndUpdate(
      id,
      {
        title,
        description,
        price,
        location,
        country,
        image,
      },
      { runValidators: true, new: true }
    );
    req.flash("success", "List updated successfully !");
    res.redirect(`/list/${id}`);
  } catch (err) {
    // console.log(err);
    next(err);
  }
});
//---------destroy route--------------
router.delete("/:id", isLogin, isOwner, async (req, res, next) => {
  try {
    let { id } = req.params;
    let deletedList = await List.findByIdAndDelete(id);

    console.log(deletedList, "deleted successfully!");
    req.flash("success", "List deleted successfully !");
    res.redirect("/list");
  } catch (err) {
    // console.log(err);
    next(err);
  }
});
//---------show route(read)----
router.get("/:id", async (req, res, next) => {
  try {
    let { id } = req.params;
    let list = await List.findById(id)
      .populate({ path: "reviews", populate: { path: "revOwner" } })
      .populate("owner");
    console.log(list);
    res.render("listing/show.ejs", {
      list,
    });
  } catch (err) {
    // console.log(err);
    next(err);
  }
});

module.exports = router;
