"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import AdminHeaderBar from "@/components/admin-HeaderBar";
import SideHeaderBar from "@/components/admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginRoute = pathname === "/admin/login";
  const hasAdminAuth = typeof window !== "undefined" && Boolean(localStorage.getItem("admin_auth"));

  useEffect(() => {
    if (!isLoginRoute && !hasAdminAuth) {
      router.replace("/admin/login");
    }
  }, [isLoginRoute, hasAdminAuth, router]);

  if (isLoginRoute) {
    return <>{children}</>;
  }

  if (!hasAdminAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-600">
        Redirecting to admin login...
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <AdminHeaderBar />
      
      <div className="flex flex-1 overflow-hidden">
        <SideHeaderBar />
        
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
