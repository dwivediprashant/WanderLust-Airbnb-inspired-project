const List = require("../models/list");

const isOwner = async (req, res, next) => {
  let { id } = req.params;
  const list = await List.findById(id);
  if (list.owner._id != req.session.user._id) {
    req.flash("info", "You are NOT THE OWNER of the list !");
    return res.redirect(`/list/${id}`);
  }
  next();
};

module.exports = isOwner;
