"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import TheNextHeader from "@/components/header";
import RafflesFooter from "@/components/footer";
import TawkToWidget from "@/components/TawkToWidget";

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
      {!isAdminRoute && <RafflesFooter />}
      {!isAdminRoute && <TawkToWidget />}
    </>
  );
}
