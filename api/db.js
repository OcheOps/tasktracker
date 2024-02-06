const Mongoose = require("mongoose");
require("dotenv").config();
const localDB = process.env.MONGO_URI;
const connectDB = async () => {
  await Mongoose.connect(localDB);
  console.log("MongoDB Connected");
};
module.exports = connectDB;
