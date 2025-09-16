const express = require("express");
const validateList = require("../middlewares/validateList.js");
const router = express.Router({ mergeParams: true });
const isLogin = require("../middlewares/isLogin.js");
const isOwner = require("../middlewares/isOwner.js");
//-controller of list---------------
const listControllers = require("../controllers/list.js");
//-----multer -file uploads-------
const multer = require("multer");
const cloudinaryUpload = require("../middlewares/cloudinaryUpload.js");
const storage = multer.memoryStorage();
const uploads = multer({ storage });

//-----/ ki all requests===----------
router
  .route("/")
  .get(listControllers.index)
  .post(
    uploads.single("image"),
    cloudinaryUpload,
    isLogin,
    validateList,
    listControllers.createNewList
  );

//-------/new  all reequests------
router.route("/new").get(isLogin, listControllers.addForm);

//--------edit route-------
router.route("/:id/edit").get(isLogin, isOwner, listControllers.getEditForm);
//------/:id ki all req route----------
router
  .route("/:id")
  .put(
    isLogin,
    isOwner,
    uploads.single("image"),
    cloudinaryUpload,
    validateList,
    listControllers.updateList
  )
  .delete(isLogin, isOwner, listControllers.destroyList)
  .get(listControllers.showList);

module.exports = router;
