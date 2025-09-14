const isLogin = (req, res, next) => {
  if (!req.session.user) {
    req.flash("info", "Login required !");
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = isLogin;
