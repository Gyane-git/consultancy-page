"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, ChevronDown, Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminHeaderBar() {
  const router = useRouter();
  const panelRef = useRef(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [form, setForm] = useState({
    email: "",
    name: "Admin User",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const adminRaw = localStorage.getItem("admin_auth");
      if (!adminRaw) return;
      const admin = JSON.parse(adminRaw);
      setIsLoggedIn(true);
      setForm((prev) => ({
        ...prev,
        email: String(admin?.email || ""),
        name: String(admin?.name || "Admin User"),
      }));
    } catch {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    function onClickOutside(event) {
      if (!panelRef.current) return;
      if (!panelRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    if (profileOpen) {
      document.addEventListener("mousedown", onClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [profileOpen]);

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    router.replace("/admin/login");
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setNotice("");

    const name = form.name.trim();
    if (!name) {
      setNotice("User name is required.");
      return;
    }

    if (form.newPassword && form.newPassword !== form.confirmPassword) {
      setNotice("New password and confirm password do not match.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/admin-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          name,
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        }),
      });
      const data = await res.json();

      if (!res.ok || !data?.success) {
        throw new Error(data?.error || "Failed to update profile");
      }

      const nextAuth = {
        email: data.user?.email || form.email,
        name: data.user?.name || name,
        loggedInAt: new Date().toISOString(),
      };
      localStorage.setItem("admin_auth", JSON.stringify(nextAuth));

      setForm((prev) => ({
        ...prev,
        name: nextAuth.name,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
      setNotice("Profile updated successfully.");
    } catch (error) {
      console.error(error);
      setNotice(error instanceof Error ? error.message : "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Education Consultancy Dashboard
              </h1>
              <p className="text-sm text-gray-500 mt-1">Welcome back, Admin • Manage content and settings</p>
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

              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" type="button">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>

              <div className="relative" ref={panelRef}>
                <button
                  type="button"
                  onClick={() => setProfileOpen((prev) => !prev)}
                  className="flex items-center gap-3 pl-4 border-l border-gray-200 hover:bg-gray-50 rounded-lg px-2 py-1"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {String(form.name || "A").charAt(0).toUpperCase()}
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-700">{form.name || "Admin User"}</p>
                    <p className="text-xs text-gray-500">Super Admin</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                {profileOpen ? (
                  <div className="absolute right-0 mt-2 w-[380px] bg-white border border-gray-200 rounded-xl shadow-xl p-4 z-50">
                    <h3 className="text-sm font-semibold text-gray-800 mb-3">Update Profile</h3>

                    <form onSubmit={handleProfileUpdate} className="space-y-3">
                      <input
                        className="w-full border rounded-lg px-3 py-2 text-sm bg-gray-50"
                        value={form.email}
                        disabled
                        readOnly
                      />

                      <input
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                        placeholder="User name"
                        value={form.name}
                        onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                        required
                      />

                      <input
                        type="password"
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                        placeholder="Current password (required for password change)"
                        value={form.currentPassword}
                        onChange={(e) => setForm((prev) => ({ ...prev, currentPassword: e.target.value }))}
                      />

                      <input
                        type="password"
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                        placeholder="New password"
                        value={form.newPassword}
                        onChange={(e) => setForm((prev) => ({ ...prev, newPassword: e.target.value }))}
                      />

                      <input
                        type="password"
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                        placeholder="Confirm new password"
                        value={form.confirmPassword}
                        onChange={(e) => setForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                      />

                      <div className="flex gap-2 pt-1">
                        <button
                          type="submit"
                          disabled={saving}
                          className="px-3 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                          {saving ? "Updating..." : "Update"}
                        </button>

                        {isLoggedIn ? (
                          <button
                            type="button"
                            onClick={handleLogout}
                            className="px-3 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50"
                          >
                            Logout
                          </button>
                        ) : null}
                      </div>
                    </form>

                    {notice ? <p className="mt-3 text-sm text-gray-700">{notice}</p> : null}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
