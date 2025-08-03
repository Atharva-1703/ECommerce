import Discounts from "@/components/Discounts/Discounts";
import Hero from "@/components/Hero/Hero";
import { dummyProducts } from "@/sample data/discountedProducts";

export default function HomeContainer() {
  return (
    <div className="min-h-screen  px-4 py-10 flex flex-col">
      <Hero />

      <Discounts products={dummyProducts} />
    </div>
  );
}
