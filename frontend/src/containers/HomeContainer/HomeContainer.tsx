import Catalogue from "@/components/Catalogue/Catalogue";
import Hero from "@/components/Home/Hero/Hero";
import { dummyProducts } from "@/sample data/discountedProducts";

export default function HomeContainer() {
  return (
    <div className="min-h-screen  px-1 py-10 flex flex-col">
      <Hero />
      
      <Catalogue products={dummyProducts} title="Huge Discounts" />

      <Catalogue products={dummyProducts} title="New Arrivals"/>

      <Catalogue products={dummyProducts} title="Top Rated"/>
    </div>
  );
}
