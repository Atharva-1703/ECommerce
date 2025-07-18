const asyncHandler=require("express-async-handler");
const mongoose=require('mongoose')
const Orders=require("../models/Orders");
const User=require("../models/User");
const Product=require("../models/Product");

exports.addOrderDirectly=asyncHandler(async(req,res)=>{
    const user=req.user;
    const {productId,quantity,addressId}=req.body;
    if(!mongoose.Types.ObjectId.isValid(productId)){
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
    
    if(product.stock<quantity){
        return res.status(400).json({
            success:false,
            refresh:true,
            message:"Product quantity is less than the quantity you want to add to cart"
        })
    }
    product.stock=product.stock-quantity;
    await product.save();

    const userFound=await User.findById(user.id);
    if(!userFound){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }

    const deliveryAddress=userFound.address.id(addressId)||userFound.address[0];
    if(!deliveryAddress){
        return res.status(404).json({
            success:false,
            message:"Delivery address not found"
        })
    }

    delete deliveryAddress.name;

    
    const order=await Orders.create({
        name:product.title,
        user:user.id,
        product:productId,
        quantity,
        shippingAddress:deliveryAddress
    });


    userFound.orders.push(order._id);
    await userFound.save();
    
    res.status(200).json({
        success:true,
        message:"Ordered Successfully"
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
    if(!orderId){
        return res.status(400).json({
            success:false,
            message:"Order ID is required"
        })
    }
    if(!mongoose.Types.ObjectId.isValid(orderId)){
        return res.status(400).json({
            success:false,
            message:"Invalid Order ID format"
        })
    }
    
    const orders=await Orders.findByIdAndDelete(orderId);
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
    
    product.stock=product.stock+orders.quantity;
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

exports.addOrderFromCart = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { addressId } = req.body; 

  const user = await User.findById(userId).populate('cart.product');
  if (!user || user.cart.length === 0) {
    return res.status(400).json({ success: false, message: "Cart is empty or user not found" });
  }

  const address = user.address.id(addressId) || user.address[0];
  if (!address) {
    return res.status(400).json({ success: false, message: "No valid shipping address found" });
  }
  delete address.name

  const createdOrders = [];

  for (const item of user.cart) {
    const product = item.product;
    const quantity = item.quantity;

    const newOrder = await Orders.create({
      name: product.title,
      user: user._id,
      product: product._id,
      quantity,
      shippingAddress: address
    });

    user.orders.push(newOrder._id);
    createdOrders.push(newOrder);
  }
  user.cart = [];
  await user.save();

  res.status(201).json({
    success: true,
    message: "Orders placed successfully",
    orders: createdOrders,
  });
});