const express=require('express');
const { getUser, getFavourites, getCart, getReviews, addFavourite, removeFavourite, addToCart, removeFromCart, clearCart, editCart, addAddress, removeAddress, editAddress } = require('../controllers/userController');

const userRoutes=express.Router();

userRoutes.get('/',getUser);

userRoutes.get('/reviews',getReviews);

userRoutes.get('/favourites',getFavourites);
userRoutes.put('/favourite/add/:productId',addFavourite);
userRoutes.delete('/favourite/remove/:productId',removeFavourite);

userRoutes.get('/cart',getCart)
userRoutes.post('/cart/add',addToCart);
userRoutes.delete('/cart/remove',removeFromCart);
userRoutes.put('/cart/edit',editCart)
userRoutes.delete('/cart/clear',clearCart);

userRoutes.put('/address/add',addAddress)
userRoutes.put('/address/remove',removeAddress)
userRoutes.put('/address/edit',editAddress)

module.exports=userRoutes;