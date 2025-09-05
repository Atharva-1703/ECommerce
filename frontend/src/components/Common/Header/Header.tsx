"use client";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IconItem {
  key: "favourite" | "cart" | "orders" | "profile";
  icon: string;
  route: string;
}

const icons: IconItem[] = [
  { key: "favourite", icon: "mdi:favourite-border", route: "/favourites" },
  { key: "cart", icon: "mdi:cart-outline", route: "/cart" },
  { key: "orders", icon: "mdi:package-variant-closed", route: "/orders" },
  { key: "profile", icon: "mdi:person-outline", route: "/" },
];

export default function Header() {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const router=useRouter()
  const handleNavClick = (route: string) => {
    setOpenMenu(false);
    router.push(`/user/${route}`);
  }
  return (
    <header className="w-full h-20 bg-white shadow-sm lg:px-30 fixed px-10 py-4 flex justify-between items-center  top-0 left-0 gap-4 z-50">
      <h1 className="flex-shrink-0 text-xl font-bold" onClick={()=>router.push("/")}>
        🛒 E-Shop
      </h1>
      <div className="rounded-lg max-w-3xl bg-[#f5f5f5] p-2 h-14 gap-2 flex-1 flex   items-center">
        <Icon icon="mdi:search" className="w-6 h-6" color="#9e9e9e" />
        <input
          type="text"
          placeholder="Search"
          className="outline-none w-full"
        />
      </div>
      <nav className="space-x-4 flex max-sm:hidden">
        {icons.map(({ icon ,route}, index) => (
          <Icon key={index} icon={icon} className="w-8 h-8 cursor-pointer" onClick={() => handleNavClick(route) }/>
        ))}
      </nav>
      <div className="sm:hidden">
        <Icon
          onClick={() => setOpenMenu(!openMenu)}
          icon="mdi:menu"
          className="w-8 h-8"
        />
      </div>
      <div
        className={`fixed top-20 right-0 h-screen w-2/3 bg-white shadow-lg z-50 transform transition-transform duration-500 ease-in-out ${
          openMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-4 p-6">
          {icons.map(({ key, icon }, index) => (
            <button
              key={index}
              className="flex items-center gap-3 text-gray-700 border-b border-gray-300 pb-2"
            >
              <Icon icon={icon} className="text-2xl" />
              <span className="capitalize">{key}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
