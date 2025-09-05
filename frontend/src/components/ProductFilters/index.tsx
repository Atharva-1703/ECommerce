"use client";
import { useSearchStore } from "@/stores/useSearchStore";
import { useState } from "react";

interface ProductFiltersFormProps {
  // onFilter?: (filters: ProductFilters) => void;
}

export default function ProductFilterForm({}: // onFilter,
ProductFiltersFormProps) {
  const { productFilter, setfilters,resetOffset } = useSearchStore();
  console.log(productFilter);

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [category, setCategory] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [openSection, setOpenSection] = useState<string | null>("brands");

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetOffset();
    setfilters({
      brands: selectedBrands,
      category,
      minPrice: minPrice === "" ? undefined : minPrice,
      maxPrice: maxPrice === "" ? undefined : maxPrice,
    });
  };

  const handleReset = () => {
    setSelectedBrands([]);
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    
  };

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="w-full flex flex-col border-r border-gray-200 bg-white">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-between h-full p-6"
      >
        <div className="space-y-6 overflow-y-auto">
          {/* Brands Accordion */}
          <div className="mx-1">
            <button
              type="button"
              onClick={() => toggleSection("brands")}
              className="w-full flex justify-between items-center text-left font-medium py-2 border-b"
            >
              <span>Brands</span>
              <span>{openSection === "brands" ? "-" : "+"}</span>
            </button>
            {openSection === "brands" && (
              <div className="mt-3 space-y-2 pl-1 overflow-y-scroll max-h-32">
                {productFilter.brands.map((brand) => (
                  <label
                    key={brand}
                    htmlFor={brand}
                    className="flex items-center space-x-2 cursor-pointer hover:text-black"
                  >
                    <input
                      type="checkbox"
                      id={brand}
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                      className="w-4 h-4 accent-black"
                    />
                    <span className="text-sm">{brand}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Category Accordion */}
          <div className="mx-1">
            <button
              type="button"
              onClick={() => toggleSection("category")}
              className="w-full flex justify-between items-center text-left font-medium py-2 border-b"
            >
              <span>Category</span>
              <span>{openSection === "category" ? "-" : "+"}</span>
            </button>
            {openSection === "category" && (
              <div className="mt-3">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-black"
                >
                  <option value="">Select a category</option>
                  {productFilter.categories!.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Price Range Accordion */}
          <div className="mb-1 mx-1">
            <button
              type="button"
              onClick={() => toggleSection("price")}
              className="w-full flex justify-between items-center text-left font-medium py-2 border-b"
            >
              <span>Price Range</span>
              <span>{openSection === "price" ? "-" : "+"}</span>
            </button>
            {openSection === "price" && (
              <div className="mt-3 flex space-x-3">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) =>
                    setMinPrice(
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                  className="w-1/2 p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-black"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) =>
                    setMaxPrice(
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                  className="w-1/2 p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex space-x-3">
          <button
            type="submit"
            className="flex-1 px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800 transition"
          >
            Apply
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 px-4 py-2 rounded-md border border-gray-400 text-gray-700 hover:bg-gray-100 transition"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
