"use client";
import { Icon } from "@iconify/react";

interface IconItem {
  key: "favourite" | "cart" | "orders" | "profile";
  icon: string;
}

const icons: IconItem[] = [
  { key: "favourite", icon: "mdi:favourite-border" },
  { key: "cart", icon: "mdi:cart-outline" },
  { key: "orders", icon: "mdi:package-variant-closed" },
  { key: "profile", icon: "mdi:person-outline" },
];

export default function Header() {
  return (
    <header className="w-full h-20 bg-white shadow-sm lg:px-30 px-10 py-4 flex justify-between items-center fixed top-0 left-0 gap-4">
      <h1 className="flex-shrink-0 text-xl font-bold">🛒 E-Shop</h1>
      <div className="rounded-lg max-w-3xl bg-[#f5f5f5] p-2 h-14 gap-2 flex-1 flex   items-center">
        <Icon icon='mdi:search' className="w-6 h-6" color="#9e9e9e" />
        <input type="text" placeholder="Search" className="outline-none w-full" />
      </div>
      <nav className="space-x-4 flex ">
        {
            icons.map(({icon}, index) => (
                <Icon key={index} icon={icon} className="w-8 h-8 " />
            ))
        }
      </nav>
    </header>
  );
}
