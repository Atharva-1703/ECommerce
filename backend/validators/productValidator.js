const Joi=require('joi');

const productValidationSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
  price: Joi.number().positive().required(),
  tags: Joi.array().items(Joi.string()).required(),
  discountPercentage: Joi.number().min(0).max(100).required(),
  stock: Joi.number().integer().min(0).required(),
  brand: Joi.string().required(),
  thumbnail: Joi.string().uri().required(),
  images: Joi.array().items(Joi.string().uri()).required(),
  reviews:Joi.array()
});

module.exports=productValidationSchema;