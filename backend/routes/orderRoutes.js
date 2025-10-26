const express = require("express");
const {
  getOrders,
  cancelOrder,
  addOrders,
} = require("../controllers/orderController");

const orderRoutes = express.Router();

orderRoutes.get("/user", getOrders);
orderRoutes.delete("/cancel", cancelOrder);
orderRoutes.post("/add", addOrders);

module.exports = orderRoutes;
