"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSearchStore } from "@/stores/useSearchStore";
import ProductCardHorizontal from "@/components/Common/ProductCard/ProductCardHorizontal";
import ProductFilterForm from "@/components/ProductFilters";
import { ProductCardSkeletonHorizontal } from "@/components/skeletons/ProductCards/horizontal";
import { Icon } from "@iconify/react";
import EmptyState from "@/components/Common/EmptyState";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const {
    setfilters,
    filters,
    fetchProducts,
    products,
    loading,
    fetchProductFilters,
    offset
  } = useSearchStore();
  const [showFilters, setShowFilters] = useState(false);

  // Load filters from URL on mount
  useEffect(() => {
    const initialFilters = {
      category: searchParams.get("category") || "",
      title: searchParams.get("title") || "",
      sortBy: searchParams.get("sortBy") || "",
      order: (searchParams.get("order") as "asc" | "desc") || "asc",
      minPrice: Number(searchParams.get("minPrice")) || 0,
      maxPrice: Number(searchParams.get("maxPrice")) || Infinity,
    };
    setfilters(initialFilters);

    Promise.all([
      // fetchProducts(initialFilters),
      fetchProductFilters(initialFilters.title, initialFilters.category),
    ]);
  }, []);

  const loadMore = () => {
    fetchProducts(filters);
  };

  return (
    <div className="px-4 py-6">
      {!loading && products.length === 0 ? (
        <EmptyState
          icon="mdi:cart-off"
          title="No products found"
          subtitle="Try changing your filters"
        />
      ) : (
        <>
          {/* Mobile Controls */}
          <div className="flex justify-between items-center mb-4 lg:hidden">
            {/* Show Filters Button */}
            <button
              onClick={() => setShowFilters(true)}
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
            >
              Show Filters
            </button>

            {/* Sort Dropdown */}
            <select
              value={filters.sortBy}
              onChange={(e) =>
                setfilters({ ...filters, sortBy: e.target.value })
              }
              className="p-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-black"
            >
              <option value="">Sort By</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="rating">Top Rated</option>
              <option value="">Newest</option>
            </select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
            {/* Sidebar Filters (Desktop) */}
            <aside className="hidden lg:block h-screen sticky top-32">
              <ProductFilterForm />
            </aside>

            {/* Products Section */}
            <section className="flex flex-col gap-4">
              {/* Desktop Sort Dropdown */}
              <div className="hidden lg:flex justify-end mb-4">
                <select
                  value={filters.sortBy}
                  onChange={(e) =>
                    setfilters({ ...filters, sortBy: e.target.value })
                  }
                  className="p-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-black"
                >
                  <option value="">Sort By</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                  <option value="rating-desc">Top Rated</option>
                  <option value="newest">Newest</option>
                </select>
              </div>

              {/* Products */}
              {loading && !products ? (
                <>
                  {Array.from({ length: 10 }, (_, idx) => (
                    <ProductCardSkeletonHorizontal key={idx} />
                  ))}
                </>
              ) : (
                products.map((product) => (
                  <ProductCardHorizontal key={product._id} product={product} />
                ))
              )}
              {loading && !products ? (
                <Icon
                  icon="eos-icons:bubble-loading"
                  className="text-black w-10 h-10 mx-auto"
                />
              ) : (
                !(offset > products.length) && (
                  <button
                    className="px-4 w-44 py-2 bg-black text-white rounded-md hover:bg-gray-800 mx-auto"
                    onClick={loadMore}
                  >
                    Load More
                  </button>
                )
              )}
            </section>
          </div>

          {/* Mobile Drawer for Filters */}
          {showFilters && (
            <div className="fixed inset-0 z-50 flex">
              {/* Backdrop */}
              <div
                className="flex-1 bg-black/50"
                onClick={() => setShowFilters(false)}
              ></div>

              {/* Drawer */}
              <div className="w-80 max-w-full bg-white shadow-lg h-full p-4 overflow-y-auto transform transition-transform duration-300 translate-x-0">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="px-2 py-1 border rounded-md"
                  >
                    ✕
                  </button>
                </div>
                <ProductFilterForm />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
