"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Product, ProductReview } from "@/types/index";
import { dummyProducts } from "@/sample data/discountedProducts";
import ProductInfo from "@/components/Product Page/Info";
import Policies from "@/components/Product Page/Policies";
import Reviews from "@/components/Product Page/Reviews";



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
  const id = parseInt(useParams().id as string);
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    setProduct(dummyProducts[id]);
  }, [id]);

  return (
    <div className="px-4">
      <ProductInfo product={dummyProducts[id]}/>

      <Policies policies={policies} />

      <Reviews reviews={dummyProducts[id].reviews as ProductReview[]} rating={dummyProducts[id].rating} ratingCount={dummyProducts[id].reviewCount}/> 
      
    </div>
  );
}
