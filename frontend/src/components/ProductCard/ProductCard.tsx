import { Product } from "@/types";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function ProductCard({ product }: { product: Product }) {
  const discountedPrice = (
    product.price *
    (1 - product.discountPercentage / 100)
  ).toFixed(2);
  return (
    <article className="relative max-w-xs w-full h-[432px] p-4 rounded-2xl bg-[#f6f6f6] flex flex-col gap-3 shadow-md hover:shadow-xl transition">
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
        className="w-full h-48 rounded-2xl object-cover"
        loading="lazy"
      />
      <h2 className="text-xl text-center font-bold truncate">
        {product.title}
      </h2>
      <div className="flex flex-col items-center gap-1">
        <p className="text-gray-400 line-through text-sm">${product.price}</p>
        <p className="text-black font-bold text-2xl">${discountedPrice}</p>
      </div>
      <button className="bg-black text-white px-6 py-2 rounded-xl w-2/3 hover:bg-gray-800 transition mx-auto mt-auto">
        Buy Now
      </button>
    </article>
  );
}
