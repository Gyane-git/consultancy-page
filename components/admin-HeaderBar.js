"use client";

import { useState, useEffect } from "react";
import { Menu, X, LogOut, User, ChevronDown, Search, Bell, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminHeaderBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fake admin auth (replace with real token / cookie)
  useEffect(() => {
    const admin = localStorage.getItem("admin_auth");
    setIsLoggedIn(!!admin);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
              <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      Education Consultancy Dashboard
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Welcome back, Admin • Last login: Today 09:30 AM</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <input 
                        type="text" 
                        placeholder="Search..." 
                        className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                      />
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Bell className="w-5 h-5 text-gray-600" />
                    </button>
                    <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                        AD
                      </div>
                      <div className="hidden md:block">
                        <p className="text-sm font-medium text-gray-700">Admin User</p>
                        <p className="text-xs text-gray-500">Super Admin</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

      {/* Mobile Slide Menu Area (Optional) */}
      {isMenuOpen && (
        <div className="lg:hidden bg-gray-50 border-t shadow-inner p-4 space-y-3">
          <Link
            href="/admin/dashboard"
            className="block text-gray-800 font-medium hover:text-blue-600 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            href="/admin/products"
            className="block text-gray-800 font-medium hover:text-blue-600 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Products
          </Link>
          <Link
            href="/admin/orders"
            className="block text-gray-800 font-medium hover:text-blue-600 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Orders
          </Link>
          <Link
            href="/admin/users"
            className="block text-gray-800 font-medium hover:text-blue-600 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Users
          </Link>
        </div>
      )}
    </header>
  );
}
