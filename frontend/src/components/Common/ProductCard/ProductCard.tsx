import { Product } from "@/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import Ratings from "../Rating/Ratings";

export default function ProductCard({
  product
}: {
  product: Product;
}) {
  const discountedPrice = (
    product.price *
    (1 - product.discountPercentage / 100)
  ).toFixed(2);
  return (
    <article className="relative  w-56 h-[465px] p-4 rounded-2xl bg-[#f6f6f6] flex flex-col  gap-3 ">
      <button
        className="w-8 h-8 flex items-center justify-center absolute top-4 right-4 bg-white rounded-full shadow hover:bg-gray-100"
        aria-label="Add to favourites"
        tabIndex={0}
        // onClick={handleFavouriteClick}
      >
        <Icon className="w-6 h-6" icon="mdi:favourite-border" />
      </button>
      {/* Discount badge */}
      {product.discountPercentage > 0 && (
        <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold">
          -{product.discountPercentage}%
        </div>
      )}
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-40 rounded-2xl object-contain"
        loading="lazy"
      />
      <h2 className="text-xl text-center font-bold truncate">
        {product.title}
      </h2>
      <div className="flex flex-col items-center gap-1">
        {product.discountPercentage > 0 && (
          <p className="text-gray-400 line-through text-xs">₹{product.price}</p>
        )}
        <p className="text-black font-bold text-xl">₹{discountedPrice}</p>
      </div>

      <div className="flex flex-col items-center gap-1">
        <Ratings rating={4.3} size={24} />
        <p className="text-sm text-gray-500 font-bold">4.3</p>
      </div>

      <div className="flex flex-col  justify-center gap-4 mt-1 w-full">
        <button className="bg-gray-800 text-white px-4 py-2 rounded-xl hover:bg-gray-700 transition">
          Add to cart
        </button>
        <button className="bg-gray-800 text-white px-4 py-2 rounded-xl hover:bg-gray-700 transition">
          Buy now
        </button>
      </div>
    </article>
  );
}
