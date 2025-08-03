"use client";

import { Product } from "@/types";
import ProductCard from "../ProductCard/ProductCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";

export default function Discounts({ products }: { products: Product[] }) {
  return (
    <section className="relative py-8 bg-white">
      <h2 className="text-2xl font-bold mb-4 px-4">Huge Discounts</h2>
      <div className="px-4 md:px-8">
        <Swiper
          modules={[Scrollbar,Navigation]}
          navigation
          scrollbar={{ draggable: true }}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
          grabCursor={true}
          className="w-full .swiper-scrollbar-drag"
        >
          {products.map((product: Product) => (
            <SwiperSlide key={product._id} className="flex justify-center">
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
