"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import TheNextHeader from "@/components/header";
import StudySyncFooter from "@/components/footer";
import TawkToWidget from "@/components/TawkToWidget";
import RoutePopupAds from "@/components/reusable/RoutePopupAds";

interface LayoutWrapperProps {
  children: ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();

  // Check if route starts with `/admin`
  const isAdminRoute = pathname?.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <TheNextHeader />}
      {children}
      {!isAdminRoute && <StudySyncFooter />}
      {!isAdminRoute && <TawkToWidget />}
      {!isAdminRoute && <RoutePopupAds />}
    </>
  );
}
