const express=require('express');
const { addOrderDirectly, getOrders, cancelOrder } = require('../controllers/orderController');

const orderRoutes=express.Router();

orderRoutes.post('/add/directly',addOrderDirectly);
orderRoutes.get('/user',getOrders);
orderRoutes.delete('/cancel',cancelOrder);