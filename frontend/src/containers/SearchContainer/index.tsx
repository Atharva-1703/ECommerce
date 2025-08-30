"use client";

import ProductCardHorizontal from "@/components/Common/ProductCard/ProductCardHorizontal";
import { dummyProducts } from "@/sample data/discountedProducts";
import { useSearchStore } from "@/stores/useSearchStore";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function SearchContainer() {
  const searchParams = useSearchParams();
  const {setfilters,filters,fetchProducts,products,loading}=useSearchStore();

  useEffect(()=>{
    setfilters({
      category: searchParams.get("category") || "",
    title: searchParams.get("title") || "",
    sortBy: searchParams.get("sortBy") || "",
    order: searchParams.get("order") as "asc"|"desc" || "asc",
    minPrice: Number(searchParams.get("minPrice")) || 0,
    maxPrice: Number(searchParams.get("maxPrice")) || Infinity,
    })
  },[])

  useEffect(()=>{
    fetchProducts()
  },[filters])

  return (
    <div className="px-4 flex-col flex  gap-4">
      {loading ? <ProductCardHorizontal product={dummyProducts[0]} />: products.map((product) => {return <ProductCardHorizontal key={product._id} product={product} />})}
    </div>
  );
}
