const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");
const productValidationSchema = require("../validators/productValidator");
const Ratings = require("../models/Rating");

exports.addProduct = asyncHandler(async (req, res) => {
  const { error, value } = productValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      error: error.details.map((d) => d.message),
    });
  }
  const product = await Product.create(value);
  return res.status(201).json({
    success: true,
    message: "Product added successfully",
    product,
  });
});

exports.getProducts = asyncHandler(async (req, res) => {
  const { category, title } = req.query;

  const query = {};

  if (category) query.category = category;

  if (title) {
    query.$or = [
      { title: { $regex: title, $options: "i" } },
      { description: { $regex: title, $options: "i" } }
    ];
  }

  const products = await Product.find(query);

  return res.status(200).json({
    success: true,
    message: "Products fetched successfully",
    products,
  });
});


exports.getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  return res.status(200).json({
    success: true,
    message: "Product fetched successfully",
    product,
  });
});

exports.updateProduct = asyncHandler(async (req, res) => {
  const id=req.params.id;
  const updates=req.body;
  if (!id || !updates) {
    return res.status(400).json({
      success: false,
      message: "Incomplete fields"
    });
  }
  
  const product = await Product.findByIdAndUpdate(id, {$set: updates}, {
    new: true,runValidators: true
  });

  if(!product){
    return res.status(404).json({
      success: false,
      message: "Product not found"
    });
  }

  return res.status(200).json({
    success: true,
    message: "Product updated successfully",
    product,
  });
});

exports.removeProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if(!product){
    return res.status(404).json({
      success: false,
      message: "Product not found"
    });
  }

  const reviews = product.reviews
  if(reviews.length>0){
    reviews.forEach(async (review) => {
      await Ratings.findByIdAndDelete(review);
    })
  }

  await Product.findByIdAndDelete(req.params.id);

  return res.status(200).json({
    success: true,
    message: "Product deleted successfully",
    product,
  });
});
