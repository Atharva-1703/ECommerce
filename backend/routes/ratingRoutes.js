const express=require('express');
const { addRating, updateRating, removeRating } = require('../controllers/ratingController');
const ratingRoutes=express.Router();

ratingRoutes.post('/add',addRating);
ratingRoutes.put('/update/:id',updateRating);
ratingRoutes.delete('/delete/:id',removeRating);

module.exports=ratingRoutes