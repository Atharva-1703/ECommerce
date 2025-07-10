require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const PORT = 3000;

const app = express();
app.use(express.json());

connectDB();
app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});

app.use("/api/auth", authRoutes);
app.use("/api/products",productRoutes);

module.exports = app;
