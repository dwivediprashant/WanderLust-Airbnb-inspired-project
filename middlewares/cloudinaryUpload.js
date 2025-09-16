const cloudinary = require("../cloudConfig");
const cloudinaryUpload = (req, res, next) => {
  if (!req.file) {
    // req.cloudinaryResult=;
    return next();
  }
  const stream = cloudinary.uploader.upload_stream(
    {
      folder: "wanderLust_DEV",
      allowed_formats: ["jpg", "jpeg", "png"],
    },
    (err, result) => {
      if (err) {
        req.flash(
          "error",
          "File format not supported. Please upload JPG, JPEG, or PNG."
        );
        return res.redirect("/list/new"); // pass error to Express error handler
      }
      // attach result to req
      //   console.log(result);
      req.cloudinaryResult = result;
      next();
    }
  );

  stream.end(req.file.buffer);
};

module.exports = cloudinaryUpload;
