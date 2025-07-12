const express=require('express');
const { getUser } = require('../routes/userRoutes');

const userRoutes=express.Router();

userRoutes.get('/',getUser);
