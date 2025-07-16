const asyncHandler=require("express-async-handler");
const Order=require("../models/Order");
const User=require("../models/User");
const Product=require("../models/Product");

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
    
    const product=await Product.findById(productId);
    if(!product){
        return res.status(404).json({
            success:false,
            message:"Product not found"
        })
    }
    
    product.quantity=product.quantity-quantity;
    await product.save();
    
    const order=await Order.create({
        user:user.id,
        product:productId,
        quantity
    });

    const userFound=await User.findById(user.id);
    if(!userFound){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }

    userFound.orders.push(order._id);
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

exports.cancelOrder=asyncHandler(async(req,res)=>{
    const user=req.user;
    const {orderId}=req.body;
    if(!mongoose.Types.ObjectId.isValid(orderId)){
        return res.status(400).json({
            success:false,
            message:"Invalid Order ID format"
        })
    }
    
    const orders=await Order.findbyIdAndDelete(orderId);
    if(!orders){
        return res.status(404).json({
            success:false,
            message:"Order not found"
        })
    }

    const productId=orders.product;
    const product=await Product.findById(productId);
    if(!product){
        return res.status(404).json({
            success:false,
            message:"Product not found"
        })
    }
    
    product.quantity=product.quantity+orders.quantity;
    await product.save();
    
    const userFound=await User.findById(user.id);
    if(!userFound){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }
    userFound.orders=userFound.orders.filter((item)=>item.toString()!==orderId);
    await userFound.save();

    res.status(200).json({
        success:true,
        message:"Order cancelled"
    })
})