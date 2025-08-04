import Catalogue from "@/components/Catalogue/Catalogue";
import Discounts from "@/components/Home/Discounts/Discounts";
import Hero from "@/components/Home/Hero/Hero";
import { dummyProducts } from "@/sample data/discountedProducts";

export default function HomeContainer() {
  return (
    <div className="min-h-screen  px-1 py-10 flex flex-col">
      <Hero />

      <Discounts products={dummyProducts} />

      <Catalogue products={dummyProducts} />
    </div>
  );
}
