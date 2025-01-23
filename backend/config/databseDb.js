const mongoose = require("mongoose");
const envConfig = require("./env");

const connectDB = async () => {
  try {
    await mongoose.connect(envConfig.database.mongoURI);
    console.log("database connected successfully");
  } catch (error) {
    console.log("database connection error", error);
  }
};

module.exports = connectDB;
