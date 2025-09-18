"use client";
import React from "react";
import { dummyProducts } from "@/sample data/discountedProducts";
import ProductCardResponsive from "@/components/Common/ProductCard/ProductCardHorizontal";
import { useUserStore } from "@/stores/useUserStore";
import { ProductCardSkeletonHorizontal } from "@/components/skeletons/ProductCards/horizontal";

const FavouritesContainer = () => {
  const { favourites, fetchFavourites, isLoading } = useUserStore();
  React.useEffect(() => {
    fetchFavourites();
  }, []);
  return (
    <div>
      {isLoading ? (
        Array.from({ length: 3 }).map((_, idx: number) => {
          return <ProductCardSkeletonHorizontal key={idx} />;
        })
      ) : favourites.length > 0 ? (
        favourites.map((product) => {
          return <ProductCardResponsive key={product._id} product={product} />;
        })
      ) : (
        <h1 className="text-2xl font-bold text-gray-800">
          No favourites found
        </h1>
      )}
    </div>
  );
};

export default FavouritesContainer;
