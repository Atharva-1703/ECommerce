import { Order, Product } from "@/types";

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
        createdAt: "2023-06-01T10:00:00.000Z",
      },
      {
        _id: "rev2",
        rating: 4,
        comment: "Good overall, but the packaging could be better.",
        name: "Ananya Sharma",
        product: "prod1",
        user: "user2",
        createdAt: "2023-06-01T10:00:00.000Z",
      },
      {
        _id: "rev3",
        rating: 4,
        comment: "Good overall, but the packaging could be better.",
        name: "Ananya Sharma",
        product: "prod1",
        user: "user2",
        createdAt: "2023-06-01T10:00:00.000Z",
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
  },
];

export const orders: Order[] = [
  {
    shippingAddress: {
      street: "Balwant Colony,Walhekarwadi Road, Chinchwadenagar,Chinchwad",
      city: "Pimpri-Chinchwad",
      state: "Maharashtra",
      postalCode: "411033",
      country: "India",
      phone: "+917499977942",
    },
    _id: "6909d484798558d31cb6c2a1",
    items: [
      {
        product: {
          _id: "688ddc5cfd1f7ed32581317e",
          title: "Tennis Racket",
          price: 3999.2000000000003,
          thumbnail:
            "https://cdn.dummyjson.com/product-images/sports-accessories/tennis-racket/thumbnail.webp",
        },
        name: "Tennis Racket",
        price: 3999.2000000000003,
        quantity: 1,
        totalItemCost: 3215,
        _id: "6909d484798558d31cb6c2a2",
      },
      {
        product: {
          _id: "688ddc5bfd1f7ed3258130c1",
          title: "Samsung Galaxy S7",
          price: 23999.2,
          thumbnail:
            "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s7/thumbnail.webp",
        },
        name: "Samsung Galaxy S7",
        price: 23999.2,
        quantity: 1,
        totalItemCost: 19307,
        _id: "6909d484798558d31cb6c2a3",
      },
      {
        product: {
          _id: "688ddc52fd1f7ed325812c5c",
          title: "Calvin Klein CK One",
          price: 3999.2000000000003,
          thumbnail:
            "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/thumbnail.webp",
        },
        name: "Calvin Klein CK One",
        price: 3999.2000000000003,
        quantity: 1,
        totalItemCost: 3924,
        _id: "6909d484798558d31cb6c2a4",
      },
      {
        product: {
          _id: "688ddc52fd1f7ed325812c65",
          title: "Chanel Coco Noir Eau De",
          price: 10399.2,
          thumbnail:
            "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/thumbnail.webp",
        },
        name: "Chanel Coco Noir Eau De",
        price: 10399.2,
        quantity: 1,
        totalItemCost: 8682,
        _id: "6909d484798558d31cb6c2a5",
      },
    ],
    paymentMethod: "cod",
    totalCost: 35128,
    status: "pending",
    isPaid: false,
    deliveryDate: "2025-11-09T10:24:54.246Z",
    createdAt: "2025-11-04T10:25:08.671Z",
    updatedAt: "2025-11-04T10:25:08.671Z",
  },
  {
    shippingAddress: {
      street: "Balwant Colony,Walhekarwadi Road, Chinchwadenagar,Chinchwad",
      city: "Pimpri-Chinchwad",
      state: "Maharashtra",
      postalCode: "411033",
      country: "India",
      phone: "+917499977942",
    },
    _id: "6909c216f6593135df6a286b",
    items: [
      {
        product: {
          _id: "688ddc5ffd1f7ed3258132f8",
          title: "Women's Wrist Watch",
          price: 10399.2,
          thumbnail:
            "https://cdn.dummyjson.com/product-images/womens-watches/women's-wrist-watch/thumbnail.webp",
        },
        name: "Women's Wrist Watch",
        price: 10399.2,
        quantity: 1,
        totalItemCost: 10399.2,
        _id: "6909c216f6593135df6a286c",
      },
    ],
    paymentMethod: "cod",
    totalCost: 10399.2,
    status: "pending",
    isPaid: false,
    deliveryDate: "2025-11-07T09:06:19.065Z",
    createdAt: "2025-11-04T09:06:30.067Z",
    updatedAt: "2025-11-04T09:06:30.067Z",
  },
];
