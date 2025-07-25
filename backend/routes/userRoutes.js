const express=require('express');
const { getUser, getFavourites, getCart, getReviews, addFavourite, removeFavourite, addToCart, removeFromCart, clearCart, editCart, addAddress, removeAddress } = require('../controllers/userController');

const userRoutes=express.Router();

userRoutes.get('/',getUser);

userRoutes.get('/reviews',getReviews);

userRoutes.get('/favourites',getFavourites);
userRoutes.post('/favourite/add',addFavourite);
userRoutes.delete('/favourite/remove',removeFavourite);

userRoutes.get('/cart',getCart)
userRoutes.post('/cart/add',addToCart);
userRoutes.delete('/cart/remove',removeFromCart);
userRoutes.put('/cart/edit',editCart)
userRoutes.delete('/cart/clear',clearCart);

userRoutes.put('/address/add',addAddress)
userRoutes.put('/address/remove',removeAddress)

module.exports=userRoutes;