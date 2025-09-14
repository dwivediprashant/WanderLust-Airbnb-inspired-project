const bcrypt = require("bcrypt");
const User = require("../models/user.js");
//------get registration form------------
module.exports.getRegForm = (req, res) => {
  res.render("users/regForm");
};
//-----------register post route----------
module.exports.regUser = async (req, res, next) => {
  try {
    let { username, password } = req.body;
    let hashedPass = await bcrypt.hash(password, 10);
    let newUser = new User({
      username,
      password: hashedPass,
    });
    await newUser.save();
    req.flash("success", "THANK YOU FOR REGISTERING NOW YOU CAN LOGIN ");
    res.redirect("/login");
  } catch (err) {
    // console.log(err);
    req.flash(
      "error",
      `Username with ${err.keyValue.username} already exists. Try different username !`
    );
    res.redirect("/register");
  }
};

//----get login form-----
module.exports.getLoginForm = (req, res) => {
  res.render("users/loginForm");
};
//-post logon route (this is flash message for login)-----------
module.exports.loginUser = (req, res, next) => {
  try {
    const { username } = req.body;
    console.log(req.session);
    req.flash("success", `welcome ${username} !`.toUpperCase());
    res.redirect("/list");
  } catch (err) {
    console.log(err);
    next(err);
  }
};

//----------logout user----
module.exports.logoutUser = (req, res) => {
  req.flash("success", "You are logged out !"); //--THIS FLASH NOT WORKING BECAUSE OF DESTROY BEHAVIOUR
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }

    res.redirect("/list");
  });
};
