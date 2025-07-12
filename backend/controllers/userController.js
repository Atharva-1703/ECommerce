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
    const {productId,quantity}=req.body;
    if(!mongoose.Types.ObjectId.isValid(productId)){
        return res.status(400).json({
            success:false,
            message:"Invalid Product ID format"
        })
    }
    if((!quantity)||(quantity<1)){
        quantity=1;
    }
    const userFound=await User.findById(user.id);
    if(!userFound){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }

    if(userFound.cart.includes(productId)){
        return res.status(405).json({
            success:false,
            message:"Product already in cart"
        })
    }

    userFound.cart.push({product:productId,quantity});
    await userFound.save();
    res.status(200).json({
        success:true,
        message:"Product added to cart"
    })
})

exports.editCart=asyncHandler(async(req,res)=>{
    const user=req.user;
    const {productId,quantity}=req.body;
    if(!mongoose.Types.ObjectId.isValid(productId)){
        return res.status(400).json({
            success:false,
            message:"Invalid Product ID format"
        })
    }
    if((!quantity)||(quantity<1)){
        quantity=1;
    }
    const userFound=await User.findById(user.id);
    if(!userFound){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }
    found=false;
    userFound.cart=userFound.cart.map((item)=>{
        if(item.product.toString()===productId){
            item.quantity=quantity;
            found=true;
        }
        return item;
    })

    if(!found){
        await userFound.addToCart({product:productId,quantity});
    }

    await userFound.save();
    res.status(200).json({
        success:true,
        message:"quantity updated to cart"
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
    const userFound=await User.findById(user.id).populate("cart.product").select("-password");
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