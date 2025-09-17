"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Product, ProductReview } from "@/types/index";
import ProductInfo from "@/components/Product Page/Info";
import Policies from "@/components/Product Page/Policies";
import Reviews from "@/components/Product Page/Reviews";
import { useProductsStore } from "@/stores/useProductStore";
import InfoSkeleton from "@/components/skeletons/ProductPage";

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
  const id = useParams().id as string;
  const { productData, fetchProductData, loading } = useProductsStore();

  useEffect(() => {
    fetchProductData(id);
  }, [id]);

  return (
    <div className="px-4">
      {loading ? (
        <InfoSkeleton />
      ) : (
        productData && (
          <>
            <ProductInfo product={productData} />
            <Policies policies={policies} />
            <Reviews
              reviews={productData.reviews as ProductReview[]}
              rating={productData.rating}
              ratingCount={productData.reviewCount}
            />
          </>
        )
      )}
    </div>
  );
}
