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
  const user = req.user;
  if (!mongoose.isValidObjectId(user.id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid User ID format",
    });
  }

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
    name:user.name,
    product: productId,
    user: user.id,
  };
  if (comment) {
    ratingBody.comment = comment;
  }

  const ratingAdded = await Rating.create(ratingBody);
  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  product.reviews.push(ratingAdded._id);
  await product.save();

  await User.findByIdAndUpdate(
    user.id,
    { $push: { reviews: ratingAdded._id } },
    { new: true }
  );

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
    return req.status(404).json({
      success: false,
      message: "Review not found",
    });
  }

  if (rating.user.toString() !== user.id) {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to update this rating",
    });
  }
  rating.rating = updates.rating ? updates.rating : rating.rating;
  rating.comment = updates.comment ? updates.comment : rating.comment;
  await rating.save();

  return res.status(200).json({
    success: true,
    message: "Rating updated successfully"
  });
});

exports.removeRating=asyncHandler(async(req,res)=>{
    const id=req.params.id;
    if(!mongoose.isValidObjectId(id)){
        return res.status(400).json({
            success:false,
            message:"Invalid Rating ID format"
        })
    }
    const rating=await Rating.findByIdAndDelete(id);
    if(!rating){
        return res.status(404).json({
            success:false,
            message:"Rating not found"
        })
    }
    const product=await Product.findById(rating.product);
    if(!product){
        return res.status(404).json({
            success:false,
            message:"Product not found"
        })
    }
    product.reviews=product.reviews.filter((review)=>review.toString()!==id);
    await product.save();

    const user=await User.findById(rating.user);
    if(!user){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }
    user.reviews=user.reviews.filter((review)=>review.toString()!==id);
    await user.save();

    return res.status(200).json({
        success:true,
        message:"Rating deleted successfully"
    })
})