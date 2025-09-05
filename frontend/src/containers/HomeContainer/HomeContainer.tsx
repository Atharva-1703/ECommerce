"use client";

import Catalogue from "@/components/Catalogue/Catalogue";
import CategoryGrid from "@/components/Home/CategoryGrid/CategoryGrid";
import Hero from "@/components/Home/Hero/Hero";
import { dummyProducts } from "@/sample data/discountedProducts";
import { useProductsStore } from "@/stores/useProductStore";
import { useEffect } from "react";

export default function HomeContainer() {
  const {highDiscount,TopRated,latest,loading,fetchLatest,fetchHighDiscount,fetchTopRated}=useProductsStore()

  useEffect(()=>{
    Promise.all([fetchLatest(),fetchHighDiscount(),fetchTopRated()])
  },[])

  return (
    <div className="min-h-screen  px-1 py-10 flex flex-col">
      <Hero />

      <CategoryGrid/>

      <Catalogue products={highDiscount} title="Huge Discounts" route="discountPercentage"/>

      <Catalogue products={latest} title="New Arrivals" route="createdAt"/>

      <Catalogue products={TopRated} title="Top Rated" route="rating"/>
    </div>
  );
}
