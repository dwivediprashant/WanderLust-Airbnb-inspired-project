const mongoose = require("mongoose");
const data = require("./data.js");
const List = require("../models/list.js");

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

let initData = async () => {
  await List.deleteMany({});
  let listWithOwner = data.map((obj) => ({
    ...obj,
    owner: "68c6ff6538aab2d20ceb221c",
  }));
  await List.insertMany(listWithOwner);
  console.log("data added to DB successfully.");
};

initData();
