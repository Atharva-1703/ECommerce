interface CategoryHighlight {
  key: string;
  image: string;
  title: string;
  description: string;
  bgColor: string;
}

export const categoryHighlights: CategoryHighlight[] = [
  {
    key: "smartphones",
    title: "The Smartest Smartphones",
    description:
      "Explore the latest devices packed with cutting-edge tech — stunning cameras, blazing speeds, and sleek designs.",
    image: "/Iphone.png",
    bgColor: "#f5f5f5",
  },
  {
    key: "laptops",
    title: "Laptops for Work & Play",
    description:
      "From student essentials to powerhouse machines, browse laptops that balance performance and portability.",
    image: "/Macbook.png",
    bgColor: "#f2f2f2",
  },
  {
    key: "groceries",
    title: "Groceries Delivered Fast",
    description:
      "Shop fresh produce, snacks, and pantry staples — all delivered straight to your door.",
    image: "/groceries.png",
    bgColor: "#f0fff4",
  },
  {
    key: "fragrances",
    title: "Fragrances for Every Mood",
    description:
      "Find your signature scent or gift a loved one — timeless perfumes and trending colognes await.",
    image: "/fragrances.png",
    bgColor: "#fef7f1",
  },
  {
    key: "beauty",
    title: "Glow with Confidence",
    description:
      "Elevate your beauty routine with makeup essentials, skin-perfecting products, and top-rated tools.",
    image: "/cosmetics.png",
    bgColor: "#fff1f3",
  },
];
