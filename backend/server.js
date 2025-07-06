const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = 3000;
const cors = require("cors");

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => console.log("Server is running"));
  })
  .catch((err) => {
    console.log("Couldn't connect to database", err);
  });
