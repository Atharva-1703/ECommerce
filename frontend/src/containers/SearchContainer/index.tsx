import ProductCardHorizontal from "@/components/Common/ProductCard/ProductCardHorizontal";
import { dummyProducts } from "@/sample data/discountedProducts";

export default function SearchContainer() {
  return (
    <div className="px-4">
      <ProductCardHorizontal product={dummyProducts[0]} />
    </div>
  );
}
