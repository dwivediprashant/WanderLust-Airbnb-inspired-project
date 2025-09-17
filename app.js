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
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const User = require("./models/user.js");
const bcrypt = require("bcrypt");
const checkLogin = require("./middlewares/checkLogin.js");

const listRouter = require("./routes/list.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const List = require("./models/list.js");
//atlas db url--
const dbUrl = process.env.ATLAS_DB_URL;
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
  await mongoose.connect(dbUrl);
}
//----------mongo connect session store------
const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 60 * 60, //seconds
});

store.on("error", (err) => {
  console.log("mongo store error", err);
});
//------session cookie setup--------------------
app.use(
  session({
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, //in millisec
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
//-------filter routes------
app.get("/list/:category", async (req, res) => {
  let { category } = req.params;
  console.log(category);
  const list = await List.find({ category });
  console.log(list);
  res.send("success");
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
