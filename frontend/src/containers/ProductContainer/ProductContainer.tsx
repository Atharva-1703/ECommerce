"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Product, ProductReview } from "@/types/index";
import { dummyProducts } from "@/sample data/discountedProducts";
import ProductInfo from "@/components/Product Page/Info";
import Policies from "@/components/Product Page/Policies";
import Reviews from "@/components/Product Page/Reviews";
import { useProductsStore } from "@/stores/useProductStore";



export interface policyProps {
  title: string;
  icon: string;
}

const policies: policyProps[] = [
  { icon: "mdi:autorenew", title: "8 Days Replacement Policy" },
  { icon: "mdi:truck-fast-outline", title: "Free Shipping" },
  { icon: "mdi:shield-check", title: "1 Year Warranty" },
];

export default function ProductContainer() {
  const id = useParams().id as string
  const {productData,fetchProductData,loading}=useProductsStore();

  useEffect (() => {
    fetchProductData(id);
  }, [id]);

  return (
    <div className="px-4">
      <ProductInfo product={dummyProducts[0]}/>

      <Policies policies={policies} />

      <Reviews reviews={dummyProducts[0].reviews as ProductReview[]} rating={dummyProducts[0].rating} ratingCount={dummyProducts[0].reviewCount}/> 
      
    </div>
  );
}
