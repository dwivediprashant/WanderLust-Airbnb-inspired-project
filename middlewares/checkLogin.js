const bcrypt = require("bcrypt");
const User = require("../models/user");

const checkLogin = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    req.flash("error", "Username or password is incorrect !");
    return res.redirect("/login");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    req.flash("error", "Username or password is incorrect !");
    return res.redirect("/login");
  }
  req.session.user = {
    _id: user._id,
    username: user.username,
  };
  next();
};

module.exports = checkLogin;
