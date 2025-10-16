"use client";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUserStore } from "@/stores/useUserStore";

interface IconItem {
  key: "favourite" | "cart" | "orders" | "profile";
  icon: string;
  route: string;
}

const icons: IconItem[] = [
  { key: "favourite", icon: "mdi:favourite-border", route: "/favourites" },
  { key: "cart", icon: "mdi:cart-outline", route: "/cart" },
  { key: "orders", icon: "mdi:package-variant-closed", route: "/orders" },
  { key: "profile", icon: "mdi:person-outline", route: "/profile" },
];

export default function Header() {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [openProfile, setOpenProfile] = useState<boolean>(false);
  const router = useRouter();
  const { logout, isLogin } = useUserStore();

  const handleNavClick = (route: string) => {
    setOpenMenu(false);
    router.push(route);
  };

  return (
    <header className="w-full h-20 bg-white shadow-sm lg:px-30 fixed px-10 py-4 flex justify-between items-center top-0 left-0 gap-4 z-50">
      {/* Logo */}
      <h1
        className="flex-shrink-0 text-xl font-bold cursor-pointer"
        onClick={() => router.push("/")}
      >
        🛒 E-Shop
      </h1>

      {/* Search Bar */}
      <div className="rounded-lg max-w-3xl bg-[#f5f5f5] p-2 h-14 gap-2 flex-1 flex items-center">
        <Icon icon="mdi:search" className="w-6 h-6" color="#9e9e9e" />
        <input
          type="text"
          placeholder="Search"
          className="outline-none w-full bg-transparent"
        />
      </div>

      {/* Desktop Nav */}
      <nav className="space-x-4 flex max-sm:hidden items-center relative">
        {icons.map(({ icon, route, key }, index) =>
          key === "profile" ? (
            <div key={index} className="relative">
              <Icon
                icon={icon}
                className="w-8 h-8 cursor-pointer"
                onClick={() => setOpenProfile((prev) => !prev)}
              />
              {openProfile && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-md p-2">
                  <button
                    onClick={() => handleNavClick("/profile")}
                    className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer"
                  >
                    My Profile
                  </button>
                  {isLogin ? (
                    <button
                      onClick={() => {
                        logout();
                        setOpenProfile(false);
                        router.push("/login");
                      }}
                      className="block w-full text-left px-3 py-2 text-red-600 hover:bg-gray-100 rounded-md cursor-pointer"
                    >
                      Logout
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setOpenProfile(false);
                        router.push("/login");
                      }}
                      className="block w-full text-left px-3 py-2 text-red-600 hover:bg-gray-100 rounded-md"
                    >
                      Login
                    </button>
                  )}
                </div>
              )}
            </div>
          ) : (
            <Icon
              key={index}
              icon={icon}
              className="w-8 h-8 cursor-pointer"
              onClick={() => handleNavClick(route)}
            />
          )
        )}
      </nav>

      {/* Mobile Menu Toggle */}
      <div className="sm:hidden">
        <Icon
          onClick={() => setOpenMenu(!openMenu)}
          icon="mdi:menu"
          className="w-8 h-8 cursor-pointer"
        />
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-20 right-0 h-screen w-2/3 bg-white shadow-lg z-50 transform transition-transform duration-500 ease-in-out ${
          openMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-4 p-6 h-full overflow-y-auto">
          {/* Close Button */}
          <button className="self-end mb-4" onClick={() => setOpenMenu(false)}>
            <Icon icon="mdi:close" className="text-2xl" />
          </button>

          {/* Nav Items */}
          {icons.map(({ key, icon, route }, index) => (
            <button
              key={index}
              onClick={() => handleNavClick(route)}
              className="flex items-center gap-3 text-gray-700 border-b border-gray-300 pb-2"
            >
              <Icon icon={icon} className="text-2xl" />
              <span className="capitalize">{key}</span>
            </button>
          ))}

          {/* Logout (if logged in) */}
          {isLogin ? (
            <button
              onClick={() => {
                logout();
                setOpenMenu(false);
                router.push("/login");
              }}
              className="flex items-center gap-3 text-red-600 pt-4"
            >
              <Icon icon="mdi:logout" className="text-2xl" />
              <span>Logout</span>
            </button>
          ) : (
            <button
              onClick={() => {
                setOpenMenu(false);
                router.push("/login");
              }}
              className="flex items-center gap-3 text-red-600 pt-4"
            >
              <Icon icon="mdi:login" className="text-2xl" />
              <span>Login</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
