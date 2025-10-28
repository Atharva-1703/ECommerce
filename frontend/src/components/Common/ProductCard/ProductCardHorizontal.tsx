"use client";

import { Product } from "@/types";
import Ratings from "../Rating/Ratings";
import getDiscountedPrice from "@/utils/getDiscountedPrice";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/stores/useCartStore";
import useCheckoutStore from "@/stores/useCheckoutStore";
import toast from "react-hot-toast";

type ProductCardMode = "default" | "cart" | "favourites";

interface ProductCardProps {
  cartId?: string;
  product: Product;
  cartQuantity?: number;
  mode?: ProductCardMode;
  onRemove?: () => void;
}

export default function ProductCardResponsive({
  product,
  mode = "default",
  onRemove,
  cartId,
  cartQuantity,
}: ProductCardProps) {
  const discountedPrice = getDiscountedPrice(
    product.price,
    product.discountPercentage
  );
  const { addToCart } = useCartStore();
  const router = useRouter();
  const [quantity, setQuantity] = useState(cartQuantity || 1);
  const { updateQuantity } = useCartStore();
  const [hasInteracted, setHasInteracted] = useState(false);
  const { setCheckoutItems, setTotalCost } = useCheckoutStore();

  const handleBuyNow = () => {
    if (product.stock < quantity) {
      toast.error("Out of Stock");
      return;
    }
    if (quantity == 0) {
      toast.error("please Select a valid quantity");
      return;
    }
    const toastId = toast.loading("Adding to Checkout...");
    setTotalCost(product.price * quantity);
    setCheckoutItems([
      {
        product: product,
        quantity: quantity,
      },
    ]);
    toast.remove(toastId);
    router.push("/checkout");
  };

  const handleIncrement = () => {
    setQuantity((prev) =>
      product.stock == 0 ? prev : Math.min(prev + 1, product.stock)
    );
    setHasInteracted(true);
  };

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(prev - 1, 0));
    setHasInteracted(true);
  };
  useEffect(() => {
    if (!hasInteracted) return;
    const handler = setTimeout(() => {
      if (quantity !== cartQuantity && product) {
        updateQuantity(cartId!, quantity);
      }
    }, 600);
    return () => clearTimeout(handler);
  }, [quantity]);

  return (
    <section
      className="flex flex-col sm:flex-row bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer max-md:w-full min-w-4/5"
      onClick={() => router.push(`/product/${product._id}`)}
    >
      {/* Image */}
      <div className="w-full sm:w-1/3 lg:w-1/4 bg-gray-100 flex items-center justify-center overflow-hidden aspect-4/3 relative py-2">
        <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/15 to-transparent opacity-40" />
        {product.stock === 0 && (
          <div className="absolute bg-red-700 text-white px-2 py-1 rounded-lg text-xl font-bold scale-150 -rotate-30">
            Sold Out
          </div>
        )}
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Info */}
      <aside className="w-full sm:w-2/3 lg:w-3/4 p-3 sm:p-4 flex flex-col justify-between relative">
        {/* Remove button */}
        {mode !== "default" && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove && onRemove();
            }}
            className="text-red-500 hover:text-red-600 absolute top-3 right-3 rounded-full shadow-md bg-white p-1 cursor-pointer"
          >
            <Icon icon="mynaui:trash" className="w-6 h-6" />
          </button>
        )}

        {/* Title */}
        <h2 className="font-semibold text-lg sm:text-xl lg:text-2xl text-gray-900 line-clamp-2 pr-8">
          {product.title}
        </h2>

        {/* Ratings */}
        <div className="flex items-center gap-2 mt-1">
          <Ratings rating={product.rating} size={16} />
          <span className="text-sm text-gray-500">{product.rating}</span>
        </div>

        {/* Price */}
        <div className="mt-2">
          {product.discountPercentage > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-gray-400 line-through text-sm">
                ₹{product.price.toFixed(2)}
              </span>
              <span className="bg-red-100 text-red-600 text-xs font-medium px-2 py-0.5 rounded-full">
                -{product.discountPercentage}%
              </span>
            </div>
          )}
          <p className="text-green-600 font-bold text-lg sm:text-xl mt-1">
            ₹{discountedPrice}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-3 flex flex-col sm:flex-row gap-2 items-center ">
          {mode === "default" && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product._id, quantity);
                }}
                className="bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition cursor-pointer hover:scale-105 w-32 max-sm:w-[90%]"
              >
                Add to Cart
              </button>
              <button
                className="bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-800 cursor-pointer transition hover:scale-105 w-32 max-sm:w-[90%]"
                onClick={(e) => {
                  e.stopPropagation();
                  handleBuyNow();
                }}
              >
                Buy Now
              </button>
            </>
          )}
        </div>
        {mode === "cart" && (
          <div className="flex flex-col  gap-3">
            <div className="flex gap-3 items-center">
              <button
                className="bg-gray-900 text-white px-3 py-1.5 rounded-full hover:bg-gray-800 transition cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDecrement();
                }}
              >
                -
              </button>
              <p className="font-bold">{quantity}</p>
              <button
                className="bg-gray-900 text-white px-3 py-1.5 rounded-full hover:bg-gray-800 transition cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleIncrement();
                }}
              >
                +
              </button>
            </div>
            <button
              className="bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleBuyNow();
              }}
            >
              Buy Now
            </button>
          </div>
        )}
        {mode === "favourites" && (
          <button
            className="bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product._id, quantity);
            }}
          >
            Add to Cart
          </button>
        )}
      </aside>
    </section>
  );
}
