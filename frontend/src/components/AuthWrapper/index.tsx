"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const token = useUserStore((state) => state.token);
  const isRehydrated = useUserStore((state) => state.isRehydrated);

  const protectedPages = ["/favourites", "/cart", "/orders", "/profile"];

  useEffect(() => {
    if (!isRehydrated) return;

    const isProtected = protectedPages.some((p) => pathname.startsWith(p));

    if (!token && isProtected) {
      router.replace("/login");
      return;
    }

    if (token && (pathname === "/login" || pathname === "/register")) {
      router.replace("/");
    }
  }, [token, pathname, router, isRehydrated]);

  if (
    !isRehydrated ||
    (!token && protectedPages.some((p) => pathname.startsWith(p)))
  ) {
    return <Icon icon="eos-icons:loading" className="animate-spin" />;
  }

  return <>{children}</>;
}
