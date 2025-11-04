function getDiscountedPrice(price, discountPercentage){
     const discounted = (price * (100 - discountPercentage)) / 100;
  return Math.round(discounted);
}

module.exports=getDiscountedPrice