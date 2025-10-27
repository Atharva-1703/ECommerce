"use client";
import Link from "next/link";
import React from "react";

const categories = [
  "Smartphones",
  "Laptops",
  "Fragrances",
  "Skincare",
  "Groceries",
  "Home Decoration",
  "Furniture",
  "Tops",
  "Womens Dresses",
  "Mens Shirts",
  "Shoes",
  "Accessories",
  "Watches",
  "Bags",
  "Jewelry",
  "Kitchen",
  "Fitness",
  "Beauty",
];

export default function CategoriesGrid() {
  return (
    <section className=" rounded-2xl p-6  ">
      <h2 className=" text-2xl font-semibold mb-4">Shop by Categories</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-y-auto max-h-36">
        {categories.map((category, idx) => (
          <Link
            key={idx}
            href={`/search?category=${category
              .replace(/\s+/g, "-")
              .toLowerCase()}`}
          >
            <div className="bg-black text-white rounded-xl py-4 px-3 text-center font-medium hover:bg-neutral-900 cursor-pointer transition capitalize">
              {category}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
