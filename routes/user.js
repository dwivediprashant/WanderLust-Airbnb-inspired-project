const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const checkLogin = require("../middlewares/checkLogin.js");

//-----------user register---------------------------------route---
router.get("/register", (req, res) => {
  res.render("users/regForm");
});
//-----register post route-------------
router.post("/register", async (req, res, next) => {
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
});
//----------login route----------
router.get("/login", (req, res) => {
  res.render("users/loginForm");
});
//--login post route------
router.post("/login", checkLogin, (req, res, next) => {
  try {
    const { username } = req.body;
    console.log(req.session);
    req.flash("success", `welcome ${username} !`.toUpperCase());
    res.redirect("/list");
  } catch (err) {
    console.log(err);
    next(err);
  }
});
//-------logout route--------------------
router.get("/logout", (req, res) => {
  req.flash("success", "You are logged out !"); //--THIS FLASH NOT WORKING BECAUSE OF DESTROY BEHAVIOUR
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }

    res.redirect("/list");
  });
});

module.exports = router;
