"use client";

import { Product } from "@/types";
import Ratings from "../Rating/Ratings";
import getDiscountedPrice from "@/lib/utils";
import { useState } from "react";
import { Icon } from "@iconify/react";
import {useRouter} from "next/navigation"


type ProductCardMode = "default" | "cart" | "favourites";

interface ProductCardProps {
  product: Product;
  mode?: ProductCardMode;
  onAddToCart?: () => void;
  onRemove?: () => void;
}

export default function ProductCardResponsive({
  product,
  mode = "default",
  onAddToCart,
  onRemove,
}: ProductCardProps) {
  const discountedPrice = getDiscountedPrice(
    product.price,
    product.discountPercentage
  );
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  return (
    <section className="flex flex-col sm:flex-row bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer"
    onClick={() => router.push(`/product/${product._id}`)}
    >
      {/* Image */}
      <div className="w-full sm:w-1/3 lg:w-1/4 bg-gray-100 flex items-center justify-center overflow-hidden aspect-[4/3] relative py-2">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent opacity-40" />
        {product.stock === 0 && (
            <div className="absolute bg-red-700 text-white px-2 py-1 rounded-lg text-xl font-bold scale-150 -rotate-[30deg]">
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
            onClick={onRemove}
            className="text-red-500 hover:text-red-600 absolute top-3 right-3"
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
                onClick={onAddToCart}
                className="bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition hover:scale-105 w-32 max-sm:w-[90%]"
              >
                Add to Cart
              </button>
              <button className="bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition hover:scale-105 w-32 max-sm:w-[90%]">
                Buy Now
              </button>
            </>
          )}
        </div>
        {mode === "cart" && (
            <div className="flex flex-col  gap-3">
              <div className="flex gap-3 items-center">
                <button
                  className="bg-gray-900 text-white px-3 py-1.5 rounded-full hover:bg-gray-800 transition"
                  onClick={() =>
                    setQuantity((prev) => (prev - 1 < 1 ? 1 : prev - 1))
                  }
                >
                  -
                </button>
                <p className="font-bold">{quantity}</p>
                <button
                  className="bg-gray-900 text-white px-3 py-1.5 rounded-full hover:bg-gray-800 transition"
                  onClick={() =>
                    setQuantity((prev) => Math.min(prev + 1, product?.stock!))
                  }
                >
                  +
                </button>
              </div>
              <button className="bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition">
                Buy Now
              </button>
            </div>
          )}
        {mode === "favourites" && (
            <button className="bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition">
              Add to Cart
            </button>
          )}
      </aside>
    </section>
  );
}
