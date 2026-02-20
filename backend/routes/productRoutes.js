const express = require("express");
const {
  getProducts,
  getProductById,
  getFilters,
  getSearchSuggestions,
} = require("../controllers/productController");

const productRoutes = express.Router();

productRoutes.get("/suggestions", getSearchSuggestions);
productRoutes.get("/filters", getFilters);
productRoutes.get("/", getProducts);
productRoutes.get("/:id", getProductById);

module.exports = productRoutes;
