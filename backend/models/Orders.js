const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  quantity: { type: Number, required: true, min: 1 },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },

  status: {
    type: String,
    enum: ["pending", "delivered", "failed", "cancelled"],
    default: "pending",
  },

  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true },
  },
  deliveryDate: { type: Date, required: true },
},{
  timestamps: true
});

const Orders = mongoose.model("Orders", orderSchema);
module.exports = Orders;
