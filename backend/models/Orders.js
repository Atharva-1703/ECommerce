const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: { type: String, required: true }, 
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, min: 1 },
        totalItemCost: { type: Number, required: true },
      },
    ],

    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
      phone: { type: String, required: true },
    },

    paymentMethod: {
      type: String,
      enum: ["card", "cod", "upi"],
      default: "cod",
    }, 

    totalCost: { type: Number, required: true },

    status: {
      type: String,
      enum: ["pending", "processing", "delivered", "cancelled"],
      default: "pending",
    },

    isPaid: { type: Boolean, default: false },

    deliveredAt: { type: Date },

    deliveryDate: { type: Date },

  },
  { timestamps: true } 
);

module.exports = mongoose.model("Orders", orderSchema);
