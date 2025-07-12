const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const mongoose  = require("mongoose");

exports.getUser=(asyncHandler(async (req, res) => {
    const user=req.user;
    const userFound=await User.findById(user.id).select("-password");
    if(!userFound){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }
    res.status(200).json({
        success:true,
        user:userFound
    })
}))

exports.getReviews=asyncHandler(async(req,res)=>{
    const user=req.user;
    const userFound=await User.findById(user.id).populate("reviews").select("-password");
    if(!userFound){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }
    res.status(200).json({
        success:true,
        reviews:userFound.reviews
    })
})

exports.addFavourite=asyncHandler(async(req,res)=>{
    const user=req.user;
    const {productId}=req.body;
    if(!mongoose.Types.ObjectId.isValid(productId)){
        return res.status(400).json({
            success:false,
            message:"Invalid Product ID format"
        })
    }
    const userFound=await User.findById(user.id);
    if(!userFound){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }
    userFound.favourites.push(productId);
    await userFound.save();
    res.status(200).json({
        success:true,
        message:"Product added to favourites"
    })
})

exports.removeFavourite=asyncHandler(async(req,res)=>{
    const user=req.user;
    const {productId}=req.body;
    if(!mongoose.Types.ObjectId.isValid(productId)){
        return res.status(400).json({
            success:false,
            message:"Invalid Product ID format"
        })
    }
    const userFound=await User.findById(user.id);
    if(!userFound){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }
    userFound.favourites=userFound.favourites.filter((item)=>item.toString()!==productId);
    await userFound.save();
    res.status(200).json({
        success:true,
        message:"Product removed from favourites"
    })
})

exports.getFavourites=asyncHandler(async(req,res)=>{
    const user=req.user;
    const userFound=await User.findById(user.id).populate("favourites").select("-password");
    if(!userFound){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }
    res.status(200).json({
        success:true,
        favourites:userFound.favourites
    })
})

exports.addToCart=asyncHandler(async(req,res)=>{
    const user=req.user;
    const {productId}=req.body;
    if(!mongoose.Types.ObjectId.isValid(productId)){
        return res.status(400).json({
            success:false,
            message:"Invalid Product ID format"
        })
    }
    const userFound=await User.findById(user.id);
    if(!userFound){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }
    userFound.cart.push(productId);
    await userFound.save();
    res.status(200).json({
        success:true,
        message:"Product added to cart"
    })
})

exports.removeFromCart=asyncHandler(async(req,res)=>{
    const user=req.user;
    const {productId}=req.body;
    if(!mongoose.Types.ObjectId.isValid(productId)){
        return res.status(400).json({
            success:false,
            message:"Invalid Product ID format"
        })
    }
    const userFound=await User.findById(user.id);
    if(!userFound){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }
    userFound.cart=userFound.cart.filter((item)=>item.toString()!==productId);
    await userFound.save();
    res.status(200).json({
        success:true,
        message:"Product removed from cart"
    })
})

exports.getCart=asyncHandler(async(req,res)=>{
    const user=req.user;
    const userFound=await User.findById(user.id).populate("cart").select("-password");
    if(!userFound){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }
    res.status(200).json({
        success:true,
        cart:userFound.cart
    })
})

exports.clearCart=asyncHandler(async(req,res)=>{
    const user=req.user;
    const userFound=await User.findById(user.id);
    if(!userFound){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }
    userFound.cart=[];
    await userFound.save();
    res.status(200).json({
        success:true,
        message:"Cart cleared"
    })
})