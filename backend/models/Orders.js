const mongoose = require("mongoose");

const orderSchema = {
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  quantity: { type: Number, required: true,min:1 },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  delivered: { type: Boolean, required: true, default: false },

  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
};

const Orders= mongoose.model("Orders", orderSchema);
module.exports = Orders;