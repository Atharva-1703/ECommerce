const express=require('express');
const { addProduct, getProducts, getProductById, updateProduct, removeProduct } = require('../controllers/productController');


const productRoutes=express.Router();

productRoutes.post('/add-product',addProduct);
productRoutes.get('/',getProducts)
productRoutes.get('/:id',getProductById);
productRoutes.patch('/update-product/:id',updateProduct);
productRoutes.delete('/delete-product/:id',removeProduct);



module.exports=productRoutes