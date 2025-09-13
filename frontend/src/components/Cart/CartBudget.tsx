"use client";
import React from "react";

interface CartBudgetProps {
  subtotal: number;
  shipping?: number;
}

const CartBudget: React.FC<CartBudgetProps> = ({ subtotal, shipping = 0 }) => {
  const total = subtotal + shipping;

  return (
    <div className="w-full lg:w-1/3 bg-white shadow-md rounded-2xl p-6 flex flex-col gap-4 sticky bottom-0 lg:top-24">
      <h2 className="text-lg font-semibold text-gray-800">Order Summary</h2>

      <div className="flex justify-between text-sm text-gray-600">
        <span>Subtotal</span>
        <span>₹{subtotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-sm text-gray-600">
        <span>Shipping</span>
        <span>{shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</span>
      </div>

      <div className="border-t pt-3 flex justify-between font-semibold text-gray-900">
        <span>Total</span>
        <span>₹{total.toFixed(2)}</span>
      </div>

      <button className="w-full py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition">
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartBudget;
