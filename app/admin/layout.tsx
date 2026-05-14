"use client";

import { useEffect, useState } from "react";
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
  const [isReady, setIsReady] = useState(false);
  const [hasAdminAuth, setHasAdminAuth] = useState(false);

  useEffect(() => {
    if (isLoginRoute) {
      setHasAdminAuth(true);
      setIsReady(true);
      return;
    }

    const hasAuth = Boolean(localStorage.getItem("admin_auth"));
    setHasAdminAuth(hasAuth);
    setIsReady(true);
  }, [isLoginRoute]);

  useEffect(() => {
    if (isReady && !isLoginRoute && !hasAdminAuth) {
      router.replace("/admin/login");
    }
  }, [isReady, isLoginRoute, hasAdminAuth, router]);

  if (isLoginRoute) {
    return <>{children}</>;
  }

  if (!isReady || !hasAdminAuth) {
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
