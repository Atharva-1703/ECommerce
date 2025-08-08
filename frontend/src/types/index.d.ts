
interface Dimensions{
  length: number;
  width: number;
  height: number;
}

export interface ProductReview {
  _id: string;
  rating: number;
  comment: string;
  name: string;
  product: string;
  user?: string;
}

export interface Product {
  _id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  tags: string[];
  discountPercentage: number;
  stock: number;
  brand: string;
  thumbnail: string;
  images: string[];
  weight: number;   
  rating: number;
  reviewCount: number;          
  dimensions?: Dimensions;     
  reviews:ProductReview[];
  createdAt?: string;          
  updatedAt?: string; 
}
