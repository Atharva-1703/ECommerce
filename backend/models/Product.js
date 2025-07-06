const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  discountPercentage: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
    default: "Unknown",
  },
  thumbnail: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  warrantyInformation: {
    type: String,
    required: true,
  },
  shippingInformation: {
    type: String,
    required: true,
  },
  availabilityStatus: {
    type: String,
    required: true,
    enum: ["In Stock","Low Stock", "Out of Stock"],
  },
  returnPolicy: {
    type: String,
    required: true,
  },
  reviews:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Ratings"
  }]
},{
    timestamps: true
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
