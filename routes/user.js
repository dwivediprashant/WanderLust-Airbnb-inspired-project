const express = require("express");
const router = express.Router();

const checkLogin = require("../middlewares/checkLogin.js");
//---user controller-------
const userController = require("../controllers/user.js");
//--------/register path all requests
router
  .route("/register")
  .get(userController.getRegForm)
  .post(userController.regUser);
//----------/login path all requests route----------
router
  .route("/login")
  .get(userController.getLoginForm)
  .post(checkLogin, userController.loginUser);

//-------/logout route--------------------
router.route("/logout").get(userController.logoutUser);

module.exports = router;
