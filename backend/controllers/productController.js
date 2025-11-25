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
  const { category, title, sortBy, order, minPrice, maxPrice, brands, offset } =
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
  if (brands) {
    query.brand = { $in: brands };
  }

  const products = await Product.find(query)
    .sort(sort)
    .limit(10)
    .skip(offset ? offset : 0)
    .select("_id title thumbnail stock price discountPercentage rating");

  return res.status(200).json({
    success: true,
    message: "Products fetched successfully",
    products,
  });
});

exports.getProductById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id)) {
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
  if (!mongoose.isValidObjectId(id)) {
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
  if (!mongoose.isValidObjectId(id)) {
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

  // Build match conditions
  const matchConditions = {};

  if (category) {
    matchConditions.category = category;
  }

  if (title) {
    matchConditions.$or = [
      { title: { $regex: title, $options: "i" } },
      { description: { $regex: title, $options: "i" } },
    ];
  }

  // Parallel queries for better performance
  const [brands, categories, totalProducts] = await Promise.all([
    Product.distinct("brand", matchConditions),
    category ? [] : Product.distinct("category", matchConditions),
    Product.countDocuments(matchConditions),
  ]);

  return res.status(200).json({
    success: true,
    message: "Filters fetched successfully",
    filters: {
      brands,
      categories,
    },
    totalProducts,
  });
});

exports.getSearchSuggestions = asyncHandler(async (req, res) => {
  const q = req.query.q?.trim();
  if (!q) return res.json({ success: true, results: [] });

  let results = [];

  const projection = {
    _id: 1,
    title: 1,
    brand: 1,
    category: 1,
    score: { $meta: "searchScore" },
  };

  //  AUTOCOMPLETE per-field
  const fields = ["title", "brand", "category"];


  const autoResults = [];

  for (const field of fields) {
    const r = await Product.aggregate([
      {
        $search: {
          index: "autocomplete_index",
          autocomplete: {
            query: q,
            path: field
          },
        },
      },
      { $limit: 5 },
      { $project: projection },
    ]);
    autoResults.push(...r);
  }

  // Deduplicate
  results = autoResults.filter(
    (v, i, a) => a.findIndex((t) => t._id.toString() === v._id.toString()) === i
  );

  // If autocomplete found results → return them
  if (results.length > 0) {
    return res.json({
      success: true,
      mode: "autocomplete",
      results,
    });
  }

  // FALLBACK: Full text fuzzy search
  const fuzzyResults = await Product.aggregate([
    {
      $search: {
        index: "default",
        text: {
          query: q,
          path: ["title", "description", "brand", "category", "tags"],
          fuzzy: { maxEdits: 2 },
        },
      },
    },
    { $limit: 10 },
    { $project: projection },
  ]);

  return res.json({
    success: true,
    mode: "fuzzy-fallback",
    results: fuzzyResults,
  });
});
