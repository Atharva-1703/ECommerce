const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    comment: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    name: {
      type: String,
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Ratings = mongoose.model("Ratings", ratingSchema);

module.exports = Ratings;
