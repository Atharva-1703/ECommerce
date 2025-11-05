const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Orders = require("../models/Orders");
const User = require("../models/User");
const Product = require("../models/Product");
const getDiscountedPrice = require("../utils/getdiscountedPrice");

exports.addOrders = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const {
    items,
    addressId,
    paymentMethod = "cod",
    expectedDeliveryDate,
  } = req.body;

  if (
    paymentMethod !== "cod" &&
    paymentMethod !== "upi" &&
    paymentMethod !== "card"
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid payment method" });
  }

  const user = await User.findById(userId);
  if (!user || !items || items.length === 0) {
    return res.status(400).json({
      success: false,
      message: "User not found or no items provided",
    });
  }

  const shippingAddress = user.address.id(addressId) || user.address[0];
  if (!shippingAddress) {
    return res.status(400).json({
      success: false,
      message: "No valid shipping address found",
    });
  }
  delete shippingAddress.name;

  const orderItems = [];
  let totalCost = 0;

  for (const item of items) {
    const product = await Product.findOneAndUpdate(
      { _id: item.productId, stock: { $gte: item.quantity } },
      { $inc: { stock: -item.quantity } },
      { new: true }
    );
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Not Sufficient Stock" });
    }

    const totalItemCost =
      getDiscountedPrice(product.price, product.discountPercentage) *
      item.quantity;
    totalCost += totalItemCost;

    orderItems.push({
      product: product._id,
      name: product.title,
      price: product.price,
      quantity: item.quantity,
      totalItemCost,
    });
  }

  const newOrder = await Orders.create({
    user: user._id,
    items: orderItems,
    shippingAddress,
    totalCost,
    paymentMethod,
    isPaid: paymentMethod !== "cod",
    deliveryDate: new Date(expectedDeliveryDate),
  });

  user.orders.push(newOrder._id);
  await user.save();

  res.status(201).json({
    success: true,
    message: "Order placed successfully",
    order: newOrder,
  });
});

exports.getOrders = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const orders = await Orders.find({ user: userId })
    .populate("items.product", "title price thumbnail ")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    orders,
  });
});

exports.cancelOrder = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { orderId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid order ID",
    });
  }

  const order = await Orders.findOne({ _id: orderId, user: userId });
  if (!order) {
    return res.status(404).json({ success: false, message: "Order not found" });
  }

  if (order.status === "delivered") {
    return res.status(400).json({
      success: false,
      message: "Delivered orders cannot be cancelled",
    });
  }

  for (const item of order.items) {
    const product = await Product.findById(item.product);
    if (product) {
      product.stock += item.quantity;
      await product.save();
    }
  }

  order.status = "cancelled";
  await order.save();

  res.status(200).json({
    success: true,
    message: "Order cancelled successfully",
    order,
  });
});
