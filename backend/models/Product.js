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
  bigDescription: {
    type: String,
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
  weight:{
    type:Number,
    required:true
  },
  dimensions:{
    length:{type:String,required:true},
    width:{type:String,required:true},
    height:{type:String,required:true}, 
  },
  discountPercentage: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  brand: {
    type: String,
    // required: true,
    default: "Generic",
  },
  thumbnail: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  reviewCount: {
    type: Number,
    required: true,
    min: 0,
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
