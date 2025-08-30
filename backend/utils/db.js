const mongoose = require("mongoose");
require("dotenv").config();


const connectDB = async (startServer ) => {
  await mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Database Connected");
      startServer();
    })
    .catch((err) => {
      console.log("Error connecting to database", err);
    });
};

module.exports = connectDB;
