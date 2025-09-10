const mongoose = require("mongoose");
const Review = require("./review");
const listSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  image: {
    type: String,
    default:
      "https://www.imghotels.com/wp-content/uploads/img-hotels-IADGV_006-Dusk-Exterior-home.jpg",
    set: (link) =>
      link === ""
        ? "https://www.imghotels.com/wp-content/uploads/img-hotels-IADGV_006-Dusk-Exterior-home.jpg"
        : link,
  },
  price: { type: Number },
  location: { type: String },
  country: { type: String },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

listSchema.post("findOneAndDelete", async (list) => {
  if (list) {
    await Review.deleteMany({ _id: { $in: list.reviews } });
  }
});

const List = mongoose.model("List", listSchema);
module.exports = List;
