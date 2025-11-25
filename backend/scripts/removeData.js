const mongoose = require("mongoose");
const Product = require("../models/Product");
const Rating = require("../models/Rating");
require("dotenv").config();

// todo: add the categories yyou want to remove from your database
const categories = ["vehicle", "motorcycle"];

// ? run from root folder eg. \backend by typing "node scripts/removeData.js"

async function removeData() {
  await mongoose.connect(process.env.MONGODB_URL);

  try {
    const products = await Product.find({ category: { $in: categories } });

    const productIds = products.map((p) => p._id);

    console.log(`found ${productIds.length} products`);

    const ratings = await Rating.deleteMany({ productId: { $in: productIds } });

    console.log(`deleted ${ratings.deletedCount} ratings`);

    await Product.deleteMany({ category: { $in: categories } });

    console.log(`deleted ${products.length} products`);
  } catch (error) {
    console.log(error);
  }finally{
    await mongoose.disconnect();
  }
}

removeData();
