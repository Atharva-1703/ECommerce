import { Product } from "@/types";
import ProductCard from "../Common/ProductCard/ProductCard";
import ProductCardSkeletonVertical from "../skeletons/ProductCards/Vertical";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

interface CatalogueProps {
  products: Product[];
  title: string;
  route:string;
}

export default function Catalogue({ products, title,route }: CatalogueProps) {
  const router=useRouter();
  const handleSeeMore=()=>{
    router.push(`/search?sortBy=${route}?order=desc`);
  }
  return (
    <section className="relative py-8 ">
      <h2 className="text-2xl font-bold mb-4 px-4">{title}</h2>
      <div className="px-2 pb-1 md:px-4 flex gap-3 overflow-x-scroll scrollbar-custom">
        {products && products.length > 0
          ? products.map((product) => {
              return <ProductCard key={product._id} product={product} />;
            })
          : Array.from({ length: 4 }).map((_, idx) => {
              return <ProductCardSkeletonVertical key={idx} />;
            })}
        <div className="min-w-56 min-h-[465px] p-6 rounded-2xl bg-white shadow hover:shadow-lg transition flex flex-col items-center justify-center gap-4 cursor-pointer border border-gray-200" onClick={handleSeeMore}>
          <Icon icon="mdi:plus" className="text-4xl text-gray-600" />
          <h1 className="text-lg font-medium text-gray-800">See More</h1>
        </div>
      </div>
    </section>
  );
}
