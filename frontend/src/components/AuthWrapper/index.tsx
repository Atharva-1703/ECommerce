"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const token = useUserStore((state) => state.token);

  const protectedPages = ["/favourites", "/cart", "/orders", "/profile"];

  useEffect(() => {
    const isProtected = protectedPages.some((p) => pathname.startsWith(p));

    if (!token && isProtected) {
      router.replace("/login");
      return;
    }

    if (token && (pathname === "/login" || pathname === "/register")) {
      router.replace("/");
    }
  }, [token, pathname, router]);

  if (!token && protectedPages.some((p) => pathname.startsWith(p))) {
    return <p className="text-center py-20">Redirecting to login...</p>;
  }

  return <>{children}</>;
}
