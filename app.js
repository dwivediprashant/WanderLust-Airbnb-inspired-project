if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

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
const checkLogin = require("./middlewares/checkLogin.js");

const listRouter = require("./routes/list.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
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
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    },
  })
);
app.use(flash()); //--------for pop up messages and  only once appear
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.info = req.flash("info");
  res.locals.currUser = req.session.user;
  next();
});

//------------routers----------------------
app.use("/list", listRouter);
app.use("/list/:id/review", reviewRouter);
app.use("/", userRouter);

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
