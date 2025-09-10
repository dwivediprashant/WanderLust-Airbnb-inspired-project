const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const User = require("./models/user.js");
const bcrypt = require("bcrypt");

const listRouter = require("./routes/list.js");
const reviewRouter = require("./routes/review.js");
const List = require("./models/list.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}
//------session cookie setup--------------------
app.use(
  session({
    secret: "mysecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    },
  })
);
app.use(flash()); //--------for pop up messages and  only once appear

//------------routers----------------------
app.use("/list", listRouter);
app.use("/list/:id/review", reviewRouter);
//-----------user register---------------------------------route---
app.get("/register", (req, res) => {
  res.render("users/regForm");
});
//-----register post route-------------
app.post("/register", async (req, res, next) => {
  try {
    let { username, password } = req.body;
    let hashedPass = await bcrypt.hash(password, 10);
    let newUser = new User({
      username,
      password: hashedPass,
    });
    await newUser.save();
    res.redirect("/login");
  } catch (err) {
    console.log(err);
    next(err);
  }
});
//----------login route----------
app.get("/login", (req, res) => {
  res.render("users/loginForm");
});
//--login post route------
app.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      // req.flash("userNotFound", "user not found !");
      return res.redirect("/login");
    }
    // req.flash("reg-success", `welcome ${username} !`);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.redirect("/login");
    }
    req.session.user = user;
    console.log(req.session);
    res.redirect("/list");
  } catch (err) {
    console.log(err);
    next(err);
  }
});
//--------------no route matched page not found!--------
app.all(/.*/, (req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
});
//--------midllewares for error-----------------------------
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "something went wrong" } = err;

  res.status(statusCode).render("errorlog/error.ejs", { statusCode, message });
});
//---------------listen server at port 8080--------
app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
