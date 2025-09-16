const mongoose = require("mongoose");
const Review = require("./review");
const listSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  image: {
    url: { type: String },
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
