import { Product } from "@/types";

export const dummyProducts: Product[] = [
  {
    _id: "1",
    title: "Samsung Galaxy S22",
    description: "A high-end smartphone with a sleek design and powerful features.",
    category: "smartphones",
    price: 799,
    tags: ["android", "mobile", "flagship"],
    discountPercentage: 10,
    stock: 30,
    brand: "Samsung",
    thumbnail: "https://cdn.dummyjson.com/product-images/groceries/green-bell-pepper/thumbnail.webp",
    images: [
      "https://cdn.dummyjson.com/product-images/3/1.jpg",
      "https://cdn.dummyjson.com/product-images/3/2.jpg"
    ],
    weight: 180,
    dimensions: {
      width: 7.1,
      height: 14.6,
      length: 0.8
    },
    reviews: []
  },
  {
    _id: "2",
    title: "Apple MacBook Pro 14”",
    description: "Powerful laptop for professionals with M1 Pro chip and stunning display.",
    category: "laptops",
    price: 1999,
    tags: ["macbook", "apple", "laptop"],
    discountPercentage: 5,
    stock: 20,
    brand: "Apple",
    thumbnail: "https://cdn.dummyjson.com/product-images/6/thumbnail.png",
    images: [
      "https://cdn.dummyjson.com/product-images/6/1.png",
      "https://cdn.dummyjson.com/product-images/6/2.jpg"
    ],
    weight: 1400,
    dimensions: {
      width: 31,
      height: 22,
      length: 1.5
    },
    reviews: []
  },
  {
    _id: "3",
    title: "Sony WH-1000XM4 Headphones",
    description: "Industry-leading noise cancellation headphones with up to 30 hours of battery life.",
    category: "audio",
    price: 349,
    tags: ["headphones", "sony", "wireless"],
    discountPercentage: 15,
    stock: 50,
    brand: "Sony",
    thumbnail: "https://cdn.dummyjson.com/product-images/14/thumbnail.jpg",
    images: [
      "https://cdn.dummyjson.com/product-images/14/1.jpg"
    ],
    weight: 254,
    dimensions: {
      width: 18,
      height: 20,
      length: 8
    },
    reviews: []
  },
  {
    _id: "4",
    title: "Nike Air Max 270",
    description: "Comfortable and stylish running shoes with great cushioning.",
    category: "footwear",
    price: 150,
    tags: ["shoes", "nike", "sportswear"],
    discountPercentage: 12,
    stock: 100,
    brand: "Nike",
    thumbnail: "https://cdn.dummyjson.com/product-images/57/thumbnail.jpg",
    images: [
      "https://cdn.dummyjson.com/product-images/57/1.jpg",
      "https://cdn.dummyjson.com/product-images/57/2.jpg"
    ],
    weight: 900,
    dimensions: {
      width: 27,
      height: 10,
      length: 8
    },
    reviews: []
  },
  {
    _id: "5",
    title: "Fossil Men’s Watch",
    description: "Elegant analog watch with leather strap, perfect for formal wear.",
    category: "accessories",
    price: 120,
    tags: ["watch", "fossil", "men"],
    discountPercentage: 20,
    stock: 60,
    brand: "Fossil",
    thumbnail: "https://cdn.dummyjson.com/product-images/75/thumbnail.jpg",
    images: [
      "https://cdn.dummyjson.com/product-images/75/1.jpg"
    ],
    weight: 200,
    dimensions: {
      width: 4.2,
      height: 4.2,
      length: 1
    },
    reviews: []
  },
  {
    _id: "6",
    title: "Canon EOS 90D DSLR",
    description: "Advanced camera with 32.5MP sensor and high-speed autofocus.",
    category: "cameras",
    price: 1200,
    tags: ["camera", "dslr", "canon"],
    discountPercentage: 7,
    stock: 15,
    brand: "Canon",
    thumbnail: "https://cdn.dummyjson.com/product-images/96/thumbnail.jpg",
    images: [
      "https://cdn.dummyjson.com/product-images/96/1.jpg"
    ],
    weight: 701,
    dimensions: {
      width: 13.6,
      height: 10.4,
      length: 7.6
    },
    reviews: []
  },
  {
    _id: "7",
    title: "Logitech MX Master 3",
    description: "Ergonomic wireless mouse with advanced productivity features.",
    category: "electronics",
    price: 99,
    tags: ["mouse", "logitech", "wireless"],
    discountPercentage: 8,
    stock: 80,
    brand: "Logitech",
    thumbnail: "https://cdn.dummyjson.com/product-images/84/thumbnail.jpg",
    images: [
      "https://cdn.dummyjson.com/product-images/84/1.jpg"
    ],
    weight: 141,
    dimensions: {
      width: 8.4,
      height: 5.1,
      length: 12.5
    },
    reviews: []
  },
  {
    _id: "8",
    title: "Amazon Echo Dot (4th Gen)",
    description: "Smart speaker with Alexa voice control and crisp audio quality.",
    category: "smart-home",
    price: 49,
    tags: ["echo", "alexa", "speaker"],
    discountPercentage: 25,
    stock: 100,
    brand: "Amazon",
    thumbnail: "https://cdn.dummyjson.com/product-images/89/thumbnail.jpg",
    images: [
      "https://cdn.dummyjson.com/product-images/89/1.jpg"
    ],
    weight: 328,
    dimensions: {
      width: 10,
      height: 10,
      length: 8.9
    },
    reviews: []
  },
  {
    _id: "9",
    title: "Dell XPS 13",
    description: "Ultra-portable laptop with InfinityEdge display and long battery life.",
    category: "laptops",
    price: 1399,
    tags: ["dell", "xps", "ultrabook"],
    discountPercentage: 10,
    stock: 25,
    brand: "Dell",
    thumbnail: "https://cdn.dummyjson.com/product-images/8/thumbnail.jpg",
    images: [
      "https://cdn.dummyjson.com/product-images/8/1.jpg",
      "https://cdn.dummyjson.com/product-images/8/2.jpg"
    ],
    weight: 1200,
    dimensions: {
      width: 30.2,
      height: 19.9,
      length: 1.5
    },
    reviews: []
  },
  {
    _id: "10",
    title: "Google Pixel 7",
    description: "Google’s latest smartphone with Tensor chip and brilliant display.",
    category: "smartphones",
    price: 699,
    tags: ["google", "pixel", "android"],
    discountPercentage: 14,
    stock: 40,
    brand: "Google",
    thumbnail: "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
    images: [
      "https://cdn.dummyjson.com/product-images/1/1.jpg"
    ],
    weight: 197,
    dimensions: {
      width: 7.3,
      height: 15,
      length: 0.8
    },
    reviews: []
  }
];
