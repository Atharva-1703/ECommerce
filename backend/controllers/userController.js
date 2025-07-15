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
    const reviews=await User.findById(user.id).populate("reviews").select("reviews");
    if(!userFound){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }
    res.status(200).json({
        success:true,
        reviews
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
    const favourites=await User.findById(user.id).populate("favourites").select("favourites");
    if(!userFound){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }
    res.status(200).json({
        success:true,
        favourites
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
    const cart=await User.findById(user.id).populate("cart.product").select("cart");
    if(!cart){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }
    res.status(200).json({
        success:true,
        cart
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

exports.addAddress=asyncHandler(async(req,res)=>{
    const user=req.user;
    const address=req.body;
    address.name=address.name.toLowerCase();
    
    const userFound=await User.findById(user.id);
    if(!userFound){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }
    if(userFound.address.find((item)=>item.name===address.name)){
        return res.status(400).json({
            success:false,
            message:"Address with same name already exists"
        })
    }
    userFound.address.push(address);
    await userFound.save();
    return res.status(200).json({
        success:true,
        message:"Address added"
    })
})

exports.removeAddress=asyncHandler(async(req,res)=>{
    const user=req.user;
    const {name}=req.body;
    name=name.toLowerCase();
    const userFound=await User.findById(user.id);
    if(!userFound){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }
    userFound.address=userFound.address.filter((item)=>item.name!==name);
    await userFound.save();
    return res.status(200).json({
        success:true,
        message:"Address deleted"
    })

})