import { Product } from "@/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import Ratings from "../Rating/Ratings";
import { useUserStore } from "@/stores/useUserStore";
import { useEffect, useState } from "react";
import { useCartStore } from "@/stores/useCartStore";
import useCheckoutStore from "@/stores/useCheckoutStore";
import toast from "react-hot-toast";

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const { addFavourite, favouritesIds, removeFavourite } = useUserStore();
  const { addToCart } = useCartStore();
  const { setCheckoutItems, setTotalCost } = useCheckoutStore();

  const handleBuyNow = () => {
    if (product.stock < 1) {
      toast.error("Out of Stock");
      return;
    }
    const toastId = toast.loading("Adding to Checkout...");
    setCheckoutItems([
      {
        product: product,
        quantity: 1,
      },
    ]);
    toast.remove(toastId);
    router.push("/checkout");
  };

  useEffect(() => {
    if (favouritesIds.includes(product._id)) setIsFavourite(true);
  }, []);

  const handleFavouriteClick = async () => {
    if (isFavourite) {
      await removeFavourite(product._id);
      setIsFavourite(false);
    } else {
      await addFavourite(product._id);
      setIsFavourite(true);
    }
  };

  const discountedPrice = (
    product.price *
    (1 - product.discountPercentage / 100)
  ).toFixed(2);
  return (
    <article
      className="relative cursor-pointer  min-w-56 h-[465px] p-4 rounded-2xl bg-[#f6f6f6] flex flex-col  gap-3 "
      onClick={() => {
        router.push(`/product/${product._id}`);
      }}
    >
      <button
        className="w-8 h-8 cursor-pointer flex items-center justify-center absolute top-4 right-4 bg-white rounded-full shadow hover:bg-gray-100"
        aria-label="Add to favourites"
        tabIndex={0}
        onClick={(e) => {
          e.stopPropagation();
          handleFavouriteClick();
        }}
      >
        {isFavourite ? (
          <Icon className="w-6 h-6 text-red-500" icon="mdi:favourite" />
        ) : (
          <Icon className="w-6 h-6" icon="mdi:favourite-border" />
        )}
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
          <p className="text-gray-400 line-through text-xs">
            ₹{Math.round(product.price)}
          </p>
        )}
        <p className="text-black font-bold text-xl">₹{discountedPrice}</p>
      </div>

      <div className="flex flex-col items-center gap-1">
        <Ratings rating={product.rating} size={24} />
        <p className="text-sm text-gray-500 font-bold">{product.rating}</p>
      </div>

      <div className="flex flex-col  justify-center gap-4 mt-1 w-full">
        <button
          className="bg-black text-white cursor-pointer px-4 py-2 rounded-xl hover:bg-gray-700 transition"
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product._id);
          }}
        >
          Add to cart
        </button>
        <button
          className="bg-black text-white px-4 cursor-pointer py-2 rounded-xl hover:bg-gray-700 transition"
          onClick={(e) => {
            e.stopPropagation();
            handleBuyNow();
          }}
        >
          Buy now
        </button>
      </div>
    </article>
  );
}
