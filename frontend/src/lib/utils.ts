

export default function getDiscountedPrice(price: number, discountPercentage: number) {
     const discounted = (price * (100 - discountPercentage)) / 100;
  return Math.round(discounted);
}
