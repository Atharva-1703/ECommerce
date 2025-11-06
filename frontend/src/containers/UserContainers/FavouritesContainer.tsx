"use client";
import React from "react";
import ProductCardResponsive from "@/components/Common/ProductCard/ProductCardHorizontal";
import { useUserStore } from "@/stores/useUserStore";
import { ProductCardSkeletonHorizontal } from "@/components/skeletons/ProductCards/horizontal";
import { useCartStore } from "@/stores/useCartStore";
import EmptyState from "@/components/Common/EmptyState";

const FavouritesContainer = () => {
  const { favourites, fetchFavourites, isLoading } = useUserStore();
  const { addToCart } = useCartStore();
  React.useEffect(() => {
    fetchFavourites();
  }, []);
  const removeFavourite = useUserStore((state) => state.removeFavourite);
  return (
    <div className="flex flex-col items-center gap-4">
      {isLoading ? (
        Array.from({ length: 3 }).map((_, idx: number) => {
          return <ProductCardSkeletonHorizontal key={idx} />;
        })
      ) : favourites.length > 0 ? (
        favourites.map((product) => {
          return (
            <ProductCardResponsive
              key={product._id}
              product={product}
              mode="favourites"
              onRemove={() => removeFavourite(product._id)}
            />
          );
        })
      ) : (
        <EmptyState
          icon="mdi:heart-outline"
          title="Nothing in your favourites 💔"
          subtitle="Tap the ❤️ icon on products to save them here."
        />
      )}
    </div>
  );
};

export default FavouritesContainer;
