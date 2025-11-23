"use client";

import { categoryHighlights } from "@/data/categoryHighlights";
import Card from "./Card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

export default function Carousel() {
  return (
    <Swiper
    modules={[Navigation,Autoplay,EffectFade]}
    navigation
    loop={true}
    autoplay={{
      delay: 2500,
      disableOnInteraction: false,
    }}
    effect="fade"
    speed={600}
    spaceBetween={0}
    slidesPerView={1}
    className="w-full h-auto"
    >
      {categoryHighlights.map((category, index: number) => (
        <SwiperSlide key={index}>
          <Card
            image={category.image}
            title={category.title}
            description={category.description}
            index={index}
            category={category.key}
            bgColor={category.bgColor}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
