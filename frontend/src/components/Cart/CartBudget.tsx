"use client";
import { getExpectedDeliveryDate } from "@/utils/Dates";
import React from "react";

interface CartBudgetProps {
  subtotal?: number;
  items?: number;
  onCheckout?: () => void;
  date: string;
  label: string;
}

const CartBudget: React.FC<CartBudgetProps> = ({
  subtotal = 0,
  items = 0,
  onCheckout,
  date,
  label,
}) => {
  const total = subtotal;

  return (
    <div className="w-full lg:w-1/3 bg-white shadow-md rounded-2xl px-6 py-4 flex flex-col gap-4 max-h-84 sticky max-md:bottom-0 top-24">
      <h2 className="text-lg font-semibold text-gray-800">Order Summary </h2>

      <div className="flex justify-between text-sm text-gray-600">
        <span>Items</span>
        <span>{items}</span>
      </div>

      <div className="border-t pt-3 flex justify-between text-sm text-gray-600">
        <span>Subtotal</span>
        <span>₹{subtotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-sm text-gray-600">
        <span>Shipping</span>
        <span>Free</span>
      </div>

      <div className="border-t pt-3 flex justify-between font-semibold text-gray-900">
        <span>Total</span>
        <span>₹{total.toFixed(2)}</span>
      </div>

      <div>
        <p className="text-sm text-gray-600">{label}</p>
      </div>

      <button
        className="w-full py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition cursor-pointer"
        onClick={onCheckout}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartBudget;
