const express=require('express');
const { addProduct, getProducts, getProductById, updateProduct, removeProduct, getFilters } = require('../controllers/productController');

const productRoutes=express.Router();

productRoutes.post('/add',addProduct);
productRoutes.get('/',getProducts)
productRoutes.get('/:id',getProductById);
productRoutes.patch('/update/:id',updateProduct);
productRoutes.delete('/delete/:id',removeProduct);
productRoutes.get('/filters',getFilters)

module.exports=productRoutes