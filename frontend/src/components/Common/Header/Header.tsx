"use client";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { useSearchStore } from "@/stores/useSearchStore";

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
  const { fetchSuggestions, suggestions, clearSuggestions } = useSearchStore();
  const [query, setQuery] = useState<string>("");
  const [searchFocus, setSearchFocus] = useState<boolean>(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.length > 2) {
        fetchSuggestions(query);
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    if (!searchFocus || query.length < 3) {
      clearSuggestions();
    }
  }, [query, searchFocus]);

  const handleEnter = () => {
    router.push(`/search?title=${query}`);
    searchRef.current?.blur();
  };

  const handleNavClick = (route: string) => {
    setOpenMenu(false);
    router.push(route);
  };

  return (
    <header className="w-full h-20 bg-white shadow-sm lg:px-30 fixed px-5 py-4 flex justify-between items-center top-0 left-0 gap-4 z-50">
      {/* Logo */}
      <h1
        className={`shrink-0 text-xl font-bold cursor-pointer ${
          searchFocus ? "max-sm:hidden" : "opacity-100"
        }`}
        onClick={() => router.push("/")}
      >
        🛒 E-Shop
      </h1>

      {/* Search Bar */}
      <div className="rounded-lg max-w-3xl bg-[#f5f5f5] p-2 h-14 gap-2 flex-1 flex items-center">
        <Icon icon="mdi:search" className="w-6 h-6" color="#9e9e9e" />
        <input
          type="text"
          name="Search bar"
          placeholder="Search"
          value={query}
          ref={searchRef}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          onFocus={() => setSearchFocus(true)}
          onBlur={() => setSearchFocus(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleEnter();
            }
          }}
          className="outline-none w-full bg-transparent font-medium"
        />
      </div>
      {/* Search results */}
      {suggestions.length > 0 && (
        <div className="absolute top-20  w-full mx-auto left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 shadow-lg rounded-md p-2 max-w-3xl  max-h-96">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion._id}
              onClick={() => {
                setSearchFocus(false);
                router.push(`/product/${suggestion._id}`);
              }}
              className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer"
            >
              {suggestion.title}
            </button>
          ))}
        </div>
      )}

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
                    onClick={() => {
                      setOpenProfile(false);
                      handleNavClick("/profile");
                    }}
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
      <div className={`sm:hidden ${searchFocus ? "hidden" : "block"}`}>
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
          <button
            className="self-end mb-4 cursor-pointer"
            onClick={() => setOpenMenu(false)}
          >
            <Icon icon="mdi:close" className="text-2xl" />
          </button>

          {/* Nav Items */}
          {icons.map(({ key, icon, route }, index) => (
            <button
              key={index}
              onClick={() => handleNavClick(route)}
              className="flex items-center gap-3 text-gray-700 border-b border-gray-300 pb-2 cursor-pointer"
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
              className="flex items-center gap-3 cursor-pointer text-red-600 pt-4"
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
              className="flex items-center gap-3 cursor-pointer text-red-600 pt-4"
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
