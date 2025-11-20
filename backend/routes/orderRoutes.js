const express = require("express");
const {
  getOrders,
  cancelOrder,
  addOrders,
  getOrderById,
} = require("../controllers/orderController");

const orderRoutes = express.Router();

orderRoutes.get("/user", getOrders);
orderRoutes.delete("/cancel", cancelOrder);
orderRoutes.post("/add", addOrders);
orderRoutes.get("/:id",getOrderById)

module.exports = orderRoutes;
