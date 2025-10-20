import { Product } from "@/types";

export const dummyProducts: Product[] = [
  {
    _id: "1",
    title: "Samsung Galaxy S22",
    description:
      "A high-end smartphone with a sleek design and powerful features.",
    category: "smartphones",
    price: 799,
    tags: ["android", "mobile", "flagship"],
    discountPercentage: 10,
    stock: 0,
    brand: "Samsung",
    thumbnail:
      "https://cdn.dummyjson.com/product-images/groceries/green-bell-pepper/thumbnail.webp",
    images: [
      "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/1.webp",
      "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/2.webp",
      "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/3.webp",
      "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/3.webp",
    ],
    weight: 180,
    dimensions: {
      width: 7.1,
      height: 14.6,
      length: 0.8,
    },
    reviews: [
      {
        _id: "rev1",
        rating: 5,
        comment:
          "Excellent product! Quality is top-notch and delivery was super fast.",
        name: "Ravi Kumar",
        product: "prod1",
        user: "user1",
      },
      {
        _id: "rev2",
        rating: 4,
        comment: "Good overall, but the packaging could be better.",
        name: "Ananya Sharma",
        product: "prod1",
        user: "user2",
      },
      {
        _id: "rev2",
        rating: 4,
        comment: "Good overall, but the packaging could be better.",
        name: "Ananya Sharma",
        product: "prod1",
        user: "user2",
      },
      {
        _id: "rev3",
        rating: 3,
        comment:
          "Average experience. Product works fine but not as described in the listing.",
        name: "Vikram Singh",
        product: "prod1",
        user: "user3",
      },
      {
        _id: "rev4",
        rating: 2,
        comment: "Not satisfied. The build quality feels cheap for the price.",
        name: "Pooja Verma",
        product: "prod1",
        user: "user4",
      },
      {
        _id: "rev5",
        rating: 1,
        comment:
          "Terrible! Received a defective piece and customer support was unhelpful.",
        name: "Amit Patel",
        product: "prod1",
        user: "user5",
      },
    ],
    rating: 4.3,
    reviewCount: 6,
  },
  {
    _id: "2",
    title: "Apple MacBook Pro 14”",
    description:
      "Powerful laptop for professionals with M1 Pro chip and stunning display.",
    category: "laptops",
    price: 1999,
    tags: ["macbook", "apple", "laptop"],
    discountPercentage: 5,
    stock: 20,
    brand: "Apple",
    thumbnail: "https://cdn.dummyjson.com/product-images/6/thumbnail.png",
    images: [
      "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/1.webp",
      "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/2.webp",
      "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/3.webp",
    ],
    weight: 1400,
    dimensions: {
      width: 31,
      height: 22,
      length: 1.5,
    },
    reviews: [],
    rating: 4.7,
    reviewCount: 89,
  },
  {
    _id: "3",
    title: "Sony WH-1000XM4 Headphones",
    description:
      "Industry-leading noise cancellation headphones with up to 30 hours of battery life.",
    category: "audio",
    price: 349,
    tags: ["headphones", "sony", "wireless"],
    discountPercentage: 15,
    stock: 50,
    brand: "Sony",
    thumbnail: "https://cdn.dummyjson.com/product-images/14/thumbnail.jpg",
    images: ["https://cdn.dummyjson.com/product-images/14/1.jpg"],
    weight: 254,
    dimensions: {
      width: 18,
      height: 20,
      length: 8,
    },
    reviews: [],
    rating: 4.6,
    reviewCount: 210,
  }
];
