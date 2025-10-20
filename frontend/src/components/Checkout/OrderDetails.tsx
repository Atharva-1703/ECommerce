"use client";
import { dummyProducts } from "@/sample data/discountedProducts";
import React from "react";

const CheckoutItems = [
  { product: dummyProducts[0], quantity: 2 },
  { product: dummyProducts[1], quantity: 1 },
  { product: dummyProducts[2], quantity: 3 },
];

const OrderDetails = () => {
  const subtotal = CheckoutItems.reduce((sum, { product, quantity }) => {
    const discountedPrice =
      product.price * (1 - product.discountPercentage / 100);
    return sum + discountedPrice * quantity;
  }, 0);

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-2xl mx-auto">
      <h3 className="text-2xl font-semibold mb-2 text-gray-900 text-center">
        🧾 Order Summary
      </h3>
      <p className="text-gray-600 text-center mb-5">
        Review your checkout items before placing your order.
      </p>

      {/* Items List */}
      <ul className="divide-y divide-gray-200">
        {CheckoutItems.map(({ product, quantity }, idx) => {
          const discountedPrice =
            product.price * (1 - product.discountPercentage / 100);
          const totalPrice = discountedPrice * quantity;

          return (
            <li
              key={idx}
              className="flex flex-col  sm:flex-row sm:items-center justify-between py-4 gap-4"
            >
              {/* Left: Image */}
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-24 h-24 object-cover rounded-md bg-gray-100 mx-auto sm:mx-0"
              />

              {/* Middle: Product Details */}
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{product.brand}</p>
                <p className="text-sm text-gray-600 mt-1">Qty: {quantity}</p>
              </div>

              {/* Right: Price */}
              <div className="text-center sm:text-right">
                <p className="text-sm line-through text-gray-400">
                  ₹{product.price.toFixed(2)}
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  ₹{discountedPrice.toFixed(2)}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Total: ₹{totalPrice.toFixed(2)}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Summary */}
      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between text-gray-700 mb-2">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-700 mb-2">
          <span>Shipping</span>
          <span className="text-green-600 font-medium">Free</span>
        </div>
        <div className="flex justify-between text-lg font-bold text-gray-900">
          <span>Total</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
      </div>
      <div className="mt-4">
        <button className="sm:w-[25%] max-sm:px-3 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition">
          Edit Items In Cart?
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
