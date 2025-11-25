const axios = require("axios");
const Product = require("../models/Product");
const Ratings = require("../models/Rating");
const mongoose = require("mongoose");
require("dotenv").config();

// ? run from root folder eg. \backend by typing "node scripts/getdummyData.js"

// ! remove the required field in Rating Model before running the script
async function importData() {
  try {

    await mongoose.connect(process.env.MONGODB_URL);

    // Fetch DummyJSON products
    const { data } = await axios.get(
      "https://dummyjson.com/products?limit=200"
    );
    const products = data.products;

    for (const p of products) {
      const reviewCount = p.reviews?.length || 0;
      let avgRating = 0;

      if (reviewCount > 0) {
        const total = p.reviews.reduce((sum, r) => sum + r.rating, 0);
        avgRating = Number((total / reviewCount).toFixed(2));
      }

      const product = await Product.create({
        title: p.title,
        description: p.description,
        bigDescription: p.description,
        category: p.category,
        price: p.price,
        discountPercentage: p.discountPercentage,
        stock: p.stock,
        brand: p.brand,
        tags: p.tags || [],
        weight: p.weight || 0,
        dimensions: {
          length: p.dimensions?.depth,
          width: p.dimensions?.width,
          height: p.dimensions?.height,
        },
        thumbnail: p.thumbnail,
        images: p.images,
        rating: avgRating,
        reviewCount: reviewCount,
      });


      if (p.reviews?.length) {
        for (const r of p.reviews) {
          const ratingDoc = await Ratings.create({
            rating: r.rating,
            comment: r.comment,
            name: r.reviewerName,
            product: product._id,
          });

          product.reviews.push(ratingDoc._id);
        }
      }

      await product.save();
    }

    console.log("🎉 IMPORT COMPLETED");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

importData();
