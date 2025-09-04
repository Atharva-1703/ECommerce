const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");
const productValidationSchema = require("../validators/productValidator");
const Ratings = require("../models/Rating");
const mongoose = require("mongoose");

exports.addProduct = asyncHandler(async (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      success: false,
      message: "No data provided",
    });
  }
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
  const { category, title, sortBy, order, minPrice, maxPrice, brand, offset } =
    req.query;

  const query = {};

  if (category) query.category = category;

  if (title) {
    query.$or = [
      { title: { $regex: title, $options: "i" } },
      { description: { $regex: title, $options: "i" } },
    ];
  }
  let sort = {};
  if (sortBy) {
    sort[sortBy] = order === "asc" ? 1 : -1;
  }

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }
  if (brand) {
    query.brand = brand;
  }

  const products = await Product.find(query)
    .sort(sort)
    .limit(10)
    .skip(offset ? offset : 0);

  return res.status(200).json({
    success: true,
    message: "Products fetched successfully",
    products,
  });
});

exports.getProductById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Product ID format",
    });
  }
  const product = await Product.findById(id).populate("reviews");
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Product fetched successfully",
    product,
  });
});

exports.updateProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  if (!id || !updates) {
    return res.status(400).json({
      success: false,
      message: "Incomplete fields",
    });
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Product ID format",
    });
  }

  const product = await Product.findByIdAndUpdate(
    id,
    { $set: updates },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Product updated successfully",
    product,
  });
});

exports.removeProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Product ID format",
    });
  }
  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  const reviews = product.reviews;
  if (reviews.length > 0) {
    reviews.forEach(async (review) => {
      await Ratings.findByIdAndDelete(review);
    });
  }

  await Product.findByIdAndDelete(req.params.id);

  return res.status(200).json({
    success: true,
    message: "Product deleted successfully",
    product,
  });
});

exports.getFilters = asyncHandler(async (req, res) => {
  const { category, title } = req.query;
  const query = [];

  if (category) {
    query.push({ category: category });
  }

  if (title) {
    query.push({
      $or: [
        { title: { $regex: title, $options: "i" } },
        { description: { $regex: title, $options: "i" } },
      ],
    });
  }
  const brands = await Product.distinct("brand", query);
  if (!category) {
    const categories = await Product.distinct("category", query);
  }
  const minPrice = await Product.find(query)
    .sort({ price: 1 })
    .limit(1)
    .select("price");
  const maxPrice = await Product.find(query)
    .sort({ price: -1 })
    .limit(1)
    .select("price");
  return res.status(200).json({
    success: true,
    message: "Filters fetched successfully",
    filters: {
      brands,
      categories,
      min: minPrice,
      max: maxPrice,
    },
  });
});
