require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const ratingRoutes = require("./routes/ratingRoutes");
const userRoutes = require("./routes/userRoutes");
const isAuthenticated = require("./middlewares/isAuthenticated");
const orderRoutes = require("./routes/orderRoutes");

const PORT = process.env.PORT;

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

connectDB(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port ", PORT);
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/reviews", isAuthenticated, ratingRoutes);
app.use("/api/user", isAuthenticated, userRoutes);
app.use("/api/orders", isAuthenticated, orderRoutes);

app.get("/healthz", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(), // how long server has been running
    timestamp: Date.now(),
  });
});

module.exports = app;
