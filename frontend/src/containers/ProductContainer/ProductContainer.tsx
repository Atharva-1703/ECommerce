"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Product } from "@/types/index";
import { dummyProducts } from "@/sample data/discountedProducts";
import Ratings from "@/components/Common/Rating/Ratings";
import { Icon } from "@iconify/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

interface policyProps {
  title: string;
  icon: string;
}

const policies: policyProps[] = [
  { icon: "mdi:autorenew", title: "8 Days Replacement Policy" },
  { icon: "mdi:truck-fast-outline", title: "Free Shipping" },
  { icon: "mdi:shield-check", title: "1 Year Warranty" },
];

export default function ProductContainer() {
  const id = parseInt(useParams().id as string);
  const [product, setProduct] = useState<Product>();
  const [quantity, setQuantity] = useState<number>(1);
  const [discountedPrice, setDiscountedPrice] = useState<number>(0);
  useEffect(() => {
    setProduct(dummyProducts[id]);
    setDiscountedPrice(
      dummyProducts[id].price! *
        (1 - dummyProducts[id].discountPercentage! / 100)
    );
  }, []);

  return (
    <div>
      <section className="flex max-sm:flex-col">
        <aside className="w-1/2 max-sm:w-full ">
          <Swiper
            slidesPerView={1}
            spaceBetween={0}
            // navigation={true}
            pagination={{clickable: true}}
            modules={[Navigation,Pagination]}
            className=""
          >
            {product?.images?.map((image: string, index: number) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={product?.title}
                  className="w-full h-full object-contain transition-transform ease-in-out duration-500 hover:scale-105"
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
            <button className="bg-gray-900 text-white px-6 py-2 rounded-full hover:bg-gray-800 transition flex-1 hover:scale-105">
              Add to Cart
            </button>
            <button
              className={`text-white px-6 py-2 rounded-full hover:scale-105 ${
                product?.stock! == 0
                  ? "bg-red-500 hover:bg-red-400"
                  : "bg-yellow-500 hover:bg-yellow-400"
              }  transition flex-1`}
            >
              {product?.stock! == 0 ? "Out of Stock" : "Buy Now"}
            </button>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold">Product Details</h2>
        <p className="text-gray-600 mt-2">{product?.description}</p>
      </section>

      <section className="grid grid-cols-3 gap-4 w-full h-32 text-white mt-8">
        {policies.map((policy, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl h-full hover:scale-105 hover:shadow-lg transition-transform"
          >
            <Icon className="w-8 h-8" icon={policy.icon} />
            <p className="text-semibold text-center mt-2">{policy.title}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
