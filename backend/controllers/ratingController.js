const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");
const Rating = require("../models/Rating");
const User = require("../models/User");

exports.addRating = asyncHandler(async (req, res) => {
  const { rating, comment, productId } = req.body;
  if (!mongoose.isValidObjectId(productId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Product ID format",
    });
  }
  if (!rating || !productId) {
    return res.status(400).json({
      success: false,
      message: "Incomplete fields",
    });
  }

  if (rating > 5 || rating < 0) {
    return res.status(400).json({
      success: false,
      message: "Rating must be between 0 and 5",
    });
  }

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  const user = req.user;

  const alreadyRated = await Rating.findOne({
    user: user.id,
    product: productId,
  });
  if (alreadyRated) {
    return res.status(405).json({
      success: false,
      message: "You have already rated this product",
    });
  }

  const ratingBody = {
    rating,
    name: user.name,
    product: productId,
    user: user.id,
  };
  if (comment) {
    ratingBody.comment = comment;
  }

  const ratingAdded = await Rating.create(ratingBody);

  product.reviews.push(ratingId);

  const oldTotal = product.rating * product.reviewCount;
  const newTotal = oldTotal + newRating;

  product.reviewCount += 1;
  product.rating = newTotal / product.reviewCount;

  await product.save();

  await User.findByIdAndUpdate(user.id, {
    $push: { reviews: ratingAdded._id },
  });

  return res
    .status(201)
    .json({ success: true, message: "Rating added successfully" });
});

exports.updateRating = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Rating ID format",
    });
  }
  const user = req.user;
  const updates = req.body;
  if (!id || !updates) {
    return res.status(400).json({
      success: false,
      message: "Incomplete fields",
    });
  }
  const rating = await Rating.findById(id);
  if (!rating) {
    return res.status(404).json({
      success: false,
      message: "Review not found",
    });
  }

  const product = await Product.findById(rating.product);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  if (rating.user.toString() !== user.id) {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to update this rating",
    });
  }
  const difference = updates.rating - rating.rating;

  rating.rating = updates.rating;
  rating.comment = updates.comment;
  await rating.save();

  if (difference !== 0) {
    const newAvg =
      (product.rating * product.reviewCount + difference) / product.reviewCount;

    product.rating = newAvg;
    await product.save();
  }

  return res.status(200).json({
    success: true,
    message: "Rating updated successfully",
  });
});

exports.removeRating = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Rating ID format",
    });
  }
  const rating = await Rating.findByIdAndDelete(id);
  if (!rating) {
    return res.status(404).json({
      success: false,
      message: "Rating not found",
    });
  }
  const product = await Product.findById(rating.product);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
  product.reviews = product.reviews.filter(
    (review) => review.toString() !== id
  );

  product.reviewCount = Math.max(product.reviewCount - 1, 0);

  if (product.reviewCount === 0) {
    product.rating = 0;
  } else {
    const newAvg =
      (product.rating * (product.reviewCount + 1) - rating.rating) /
      product.reviewCount;
    product.rating = newAvg;
  }
  await product.save();

  await User.findByIdAndUpdate(rating.user, { $pull: { reviews: rating._id } });

  return res.status(200).json({
    success: true,
    message: "Rating deleted successfully",
  });
});
