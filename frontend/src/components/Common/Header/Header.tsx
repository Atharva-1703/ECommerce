"use client";
import { Icon } from "@iconify/react";
import { useState } from "react";

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
  const [openMenu,setOpenMenu]=useState<boolean>(false)
  const handleClick=()=>{setOpenMenu(!openMenu)
    document.getElementById("menu")?.classList.toggle("translate-y-4")
  }
  return (
    <header className="w-full h-20 bg-white shadow-sm lg:px-30 fixed px-10 py-4 flex justify-between items-center  top-0 left-0 gap-4 z-50">
      <h1 className="flex-shrink-0 text-xl font-bold">🛒 E-Shop</h1>
      <div className="rounded-lg max-w-3xl bg-[#f5f5f5] p-2 h-14 gap-2 flex-1 flex   items-center">
        <Icon icon='mdi:search' className="w-6 h-6" color="#9e9e9e" />
        <input type="text" placeholder="Search" className="outline-none w-full" />
      </div>
      <nav className="space-x-4 flex max-sm:hidden">
        {
            icons.map(({icon}, index) => (
                <Icon key={index} icon={icon} className="w-8 h-8 " />
            ))
        }
      </nav>
      <div className="sm:hidden">
        <Icon onClick={() => setOpenMenu(!openMenu)} icon="mdi:menu" className="w-8 h-8" />
      </div>
      {openMenu && (
        <div id="menu" className="flex flex-col-reverse gap-2 absolute top-16 right-0 bg-red-500 px-4 py-2 rounded-b-md w-full transition-transform duration-1000 ease-in ">
        {icons.map(({key}, index) => (
          <p key={index} className="text-center border-b border-gray-400">{key}</p>
        ))}
      </div>
      )}
    </header>
  );
}
