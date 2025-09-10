const express = require("express");
const List = require("../models/list.js");
const validateList = require("../utils/validateList.js");
const router = express.Router({ mergeParams: true });

///-------index route-----------------------
router.get("/", async (req, res, next) => {
  try {
    let lists = await List.find().sort({ _id: -1 });
    let createdFlash = req.flash("listCreated")[0];
    let deletedFlash = req.flash("listDeleted")[0];
    res.render("listing/list", { lists, createdFlash, deletedFlash });
  } catch (err) {
    next(err);
  }
});
//-------serve form for adding place------
router.get("/new", (req, res) => {
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

    await newList.save();
    console.log(newList, " added succesfully!");
    req.flash("listCreated", "New list added successfully !");
    res.redirect("/list");
  } catch (err) {
    // console.log(err);
    next(err);
  }
});
//--------edit route-------
router.get("/:id/edit", async (req, res, next) => {
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
router.put("/:id", validateList, async (req, res, next) => {
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
    req.flash("updatedList", "List updated successfully !");
    res.redirect(`/list/${id}`);
  } catch (err) {
    // console.log(err);
    next(err);
  }
});
//---------destroy route--------------
router.delete("/:id", async (req, res, next) => {
  try {
    let { id } = req.params;
    let deletedList = await List.findByIdAndDelete(id);

    console.log(deletedList, "deleted successfully!");
    req.flash("listDeleted", "List deleted successfully !");
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
    let list = await List.findById(id).populate("reviews").populate("owner");
    let updatedFlash = req.flash("updatedList")[0];
    let reviewFlash = req.flash("addedReview")[0];
    let reviewDelFlash = req.flash("deletedReview")[0];
    res.render("listing/show.ejs", {
      list,
      updatedFlash,
      reviewFlash,
      reviewDelFlash,
    });
  } catch (err) {
    // console.log(err);
    next(err);
  }
});

module.exports = router;
