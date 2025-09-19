"use client";
import React from "react";
import ProductCardResponsive from "@/components/Common/ProductCard/ProductCardHorizontal";
import { useUserStore } from "@/stores/useUserStore";
import { ProductCardSkeletonHorizontal } from "@/components/skeletons/ProductCards/horizontal";

const FavouritesContainer = () => {
  const { favourites, fetchFavourites, isLoading } = useUserStore();
  React.useEffect(() => {
    fetchFavourites();
  }, []);
  const removeFavourite = useUserStore((state) => state.removeFavourite);
  return (
    <div className=" flex flex-col items-center gap-4">
      {isLoading ? (
        Array.from({ length: 3 }).map((_, idx: number) => {
          return <ProductCardSkeletonHorizontal key={idx} />;
        })
      ) : favourites.length > 0 ? (
        favourites.map((product) => {
          return <ProductCardResponsive key={product._id} product={product} mode="favourites" onRemove={()=>removeFavourite(product._id)}/>;
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
