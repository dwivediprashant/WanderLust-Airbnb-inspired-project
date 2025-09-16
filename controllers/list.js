const List = require("../models/list");
//-index-----
module.exports.index = async (req, res, next) => {
  try {
    // console.log(res.locals.currUser);
    const lists = await List.find().sort({ _id: -1 });
    res.render("listing/list", { lists });
  } catch (err) {
    next(err);
  }
};
//------login page render----
module.exports.addForm = (req, res) => {
  res.render("listing/form.ejs");
};

//-post(list) ---------create route----------
module.exports.createNewList = async (req, res, next) => {
  try {
    let { title, description, price, location, country } = req.body;
    let newList = new List({
      title,
      description,
      price,
      location,
      country,
    });
    newList.image.url = req.cloudinaryResult?.secure_url;
    newList.owner = req.session.user._id; //current user ki id
    await newList.save();
    console.log(newList, " added succesfully!");
    // console.log(req.session, " request object");
    req.flash("success", "New list added successfully !");
    res.redirect("/list");
  } catch (err) {
    // console.log(err);
    next(err);
  }
};
//-------get edit form--------
module.exports.getEditForm = async (req, res, next) => {
  try {
    let { id } = req.params;
    let list = await List.findById(id);
    // let originalImgUrl = list.image.url;
    // let modifiedImgUrl = originalImgUrl.replace(
    //   "/upload",
    //   "/upload/h_200,w_200"
    // );
    res.render("listing/edit.ejs", { list });
  } catch (err) {
    // console.log(err);
    next(err);
  }
};
//--------------update list route--------------
module.exports.updateList = async (req, res, next) => {
  try {
    let { id } = req.params;
    let { title, description, price, location, country } = req.body;
    let list = await List.findByIdAndUpdate(
      id,
      {
        title,
        description,
        price,
        location,
        country,
      },
      { runValidators: true, new: true }
    );
    if (req.cloudinaryResult) {
      list.image.url = req.cloudinaryResult?.secure_url;
      await list.save();
    }
    req.flash("success", "List updated successfully !");
    res.redirect(`/list/${id}`);
  } catch (err) {
    // console.log(err);
    next(err);
  }
};
//-----------destry list route----
module.exports.destroyList = async (req, res, next) => {
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
};
//--------show list route-----------------
module.exports.showList = async (req, res, next) => {
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
};
