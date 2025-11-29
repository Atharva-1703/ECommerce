"use client";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { ProductReview } from "@/types/index";
import ProductInfo from "@/components/ProductPage/Info";
import Policies from "@/components/ProductPage/Policies";
import Reviews from "@/components/ProductPage/Reviews";
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
              ratingCount={productData.reviewCount!}
            />
          </>
        )
      )}
    </div>
  );
}
