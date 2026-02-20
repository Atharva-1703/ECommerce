const express=require('express');
const { getAllOrders, getOrderById, updateOrder } = require('../controllers/orderController');
const { addProduct, updateProduct, removeProduct } = require('../controllers/productController');

const adminRoutes=express.Router();

adminRoutes.post("/product/add",addProduct)
adminRoutes.put("/product/update/:id",updateProduct)
adminRoutes.delete("/product/delete/:id",removeProduct)

adminRoutes.get("/orders",getAllOrders)
adminRoutes.put("/order/update/:id",updateOrder)
adminRoutes.get("/order/:id",getOrderById)

module.exports=adminRoutes