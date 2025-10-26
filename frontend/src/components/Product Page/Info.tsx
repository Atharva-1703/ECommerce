"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import { Product } from "@/types";
import Ratings from "../Common/Rating/Ratings";
import getDiscountedPrice from "@/lib/utils";
import useCheckoutStore from "@/stores/useCheckoutStore";
import toast from "react-hot-toast";
import { useCartStore } from "@/stores/useCartStore";
import { useRouter } from "next/navigation";


export default function ProductInfo({ product }: { product: Product }) {
  const { setCheckoutItems, CheckoutItems } = useCheckoutStore();
  const { addToCart } = useCartStore();
  const [quantity, setQuantity] = useState<number>(1);
  const [discountedPrice, setDiscountedPrice] = useState<number>(0);
  const router = useRouter();

  const handleBuyNow = async () => {
    if (product.stock<quantity) {
      toast.error("Out of Stock");
      return;
    }
    const toastId = toast.loading("Adding to Checkout...");
    setCheckoutItems([
      {
        product: product,
        quantity: quantity,
      },
    ]);
    toast.remove(toastId);
    router.push("/checkout");
  };

  useEffect(() => {
    console.log(CheckoutItems);
  }, [CheckoutItems]);

  useEffect(() => {
    setDiscountedPrice(
      getDiscountedPrice(product.price, product.discountPercentage)
    );
  }, []);
  return (
    <div className="relative">
      <section className="flex max-sm:flex-col ">
        <aside className="w-1/2 max-sm:w-full ">
          <Swiper
            slidesPerView={1}
            spaceBetween={0}
            pagination={{
              clickable: true,
              dynamicBullets: true,
              dynamicMainBullets: 3,
            }}
            modules={[Navigation, Pagination]}
            className=""
          >
            {product?.images?.map((image: string, index: number) => (
              <SwiperSlide key={index} className="">
                <img
                  src={image}
                  alt={product?.title}
                  className="w-full max-h-96  object-contain transition-transform ease-in-out duration-500 hover:scale-105 py-4"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </aside>
        <div className="flex flex-col gap-3 w-1/2 max-sm:w-full">
          {/* Title */}
          <h1 className="text-3xl font-bold">{product?.title}</h1>

          {/* Description */}
          <p className="text-gray-600">{product?.description}</p>

          {/* Ratings */}
          <div className="flex items-center gap-2">
            <div className="flex shrink-0">
              <Ratings rating={product?.rating!} size={24} />
            </div>
            <p className="text-sm text-gray-500 font-medium leading-none">
              {product?.rating}/5 ({product?.reviewCount} reviews)
            </p>
          </div>

          {/* Price */}
          <div className="flex flex-col items-start gap-1 mt-1">
            {product?.discountPercentage! > 0 && (
              <div className="flex items-center gap-2">
                <p className="text-gray-400 line-through text-sm">
                  ₹{product?.price}
                </p>
                <span className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full">
                  -{product?.discountPercentage}%
                </span>
              </div>
            )}
            <p className="text-green-600 font-bold text-2xl">
              ₹{discountedPrice}
            </p>
          </div>

          {/* ? Quantity */}
          <div className="flex gap-3 items-center mt-2">
            <button
              className="bg-gray-900 text-white px-3 py-1.5 rounded-full hover:bg-gray-800 transition"
              onClick={() =>
                setQuantity((prev) => (prev - 1 < 0 ? 0 : prev - 1))
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

          {/* Action Buttons */}
          <div className="flex gap-4 mt-4 ">
            <button
              className="bg-gray-900 text-white px-6 py-2 rounded-full hover:bg-gray-800 transition flex-1 hover:scale-105"
              onClick={() => addToCart(product._id)}
            >
              Add to Cart
            </button>
            <button
              className={`text-white px-6 py-2 rounded-full hover:scale-105 ${
                product?.stock! == 0
                  ? "bg-red-500 hover:bg-red-400 cursor-not-allowed"
                  : "bg-yellow-500 hover:bg-yellow-400 cursor-pointer"
              }  transition flex-1`}
              disabled={product?.stock! == 0}
              onClick={handleBuyNow}
            >
              {product?.stock! == 0 ? "Out of Stock" : "Buy Now"}
            </button>
          </div>
        </div>
      </section>
      
              
      {/* Product Details */}
      <section className="mt-8 px-4">
        <h2 className="text-2xl font-bold">Product Details</h2>
        <p className="text-gray-600 mt-2">
          {product?.bigDescription
            ? product?.bigDescription
            : product?.description}
        </p>
        <ul className="mt-4 space-y--2 text-sm text-gray-700">
          <li className="flex justify-between border-b border-gray-200 pb-1">
            <span className="font-medium text-gray-900">Brand</span>
            <span>{product?.brand}</span>
          </li>
          <li className="flex justify-between border-b border-gray-200 pb-1">
            <span className="font-medium text-gray-900">Weight</span>
            <span>{product?.weight} gms</span>
          </li>
          <li className="flex justify-between border-b border-gray-200 pb-1">
            <span className="font-medium text-gray-900">Dimensions</span>
            <span>
              {product?.dimensions?.length} x {product?.dimensions?.width} x
              {product?.dimensions?.height}
            </span>
          </li>
        </ul>
      </section>
    </div>
  );
}
