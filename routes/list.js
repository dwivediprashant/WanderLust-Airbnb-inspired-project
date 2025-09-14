const express = require("express");
const validateList = require("../middlewares/validateList.js");
const router = express.Router({ mergeParams: true });
const isLogin = require("../middlewares/isLogin.js");
const isOwner = require("../middlewares/isOwner.js");
//-controller of list---------------
const listControllers = require("../controllers/list.js");
//-----/ ki all requests===----------
router
  .route("/")
  .get(listControllers.index)
  .post(validateList, listControllers.createNewList);

//-------/new  all reequests------
router.route("/new").get(isLogin, listControllers.addForm);

//--------edit route-------
router.route("/:id/edit").get(isLogin, isOwner, listControllers.getEditForm);
//------/:id ki all req route----------
router
  .route("/:id")
  .put(isLogin, isOwner, validateList, listControllers.updateList)
  .delete(isLogin, isOwner, listControllers.destroyList)
  .get(listControllers.showList);

module.exports = router;
