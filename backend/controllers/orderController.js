const asyncHandler=require("express-async-handler");
const Order=require("../models/Order");
const User=require("../models/User");
const product=require("../models/Product");

exports.addOrderDirectly=asyncHandler(async(req,res)=>{
    const user=req.user;
    const {productId,quantity}=req.body;
    if(!mongoose.Types.ObjectId,isValid(productId)){
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
    await userFound.addToCart({product:productId,quantity});
    await userFound.save();
    res.status(200).json({
        success:true,
        message:"Product added to cart"
    })

})

exports.getOrders=asyncHandler(async(req,res)=>{
    const user=req.user;
    const userFound=await User.findById(user.id).populate("orders").select("orders");
    if(!userFound){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }
    res.status(200).json({
        success:true,
        orders:userFound.orders
    })
})