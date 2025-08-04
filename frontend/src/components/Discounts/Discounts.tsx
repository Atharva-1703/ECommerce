"use client";

import { Product } from "@/types";
import ProductCard from "../ProductCard/ProductCard";

export default function Discounts({ products }: { products: Product[] }) {
  return (
    <section className="relative py-8 bg-white">
      <h2 className="text-2xl font-bold mb-4 px-4">Huge Discounts</h2>
      <div
        className="px-2 pb-1 md:px-4 flex gap-3 overflow-x-scroll scrollbar-custom"
      >
        {products.map((product) => {
          return <ProductCard key={product._id} product={product} />;
        })}
      </div>
    </section>
  );
}
