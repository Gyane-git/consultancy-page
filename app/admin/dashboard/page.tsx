"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Calendar, FileText, Globe, MessageSquare, UserCog, UserRound } from "lucide-react";

type Inquiry = {
  id: number;
  name: string;
  email: string;
  subject?: string | null;
  createdAt: string;
};

type Consultation = {
  id: number;
  name: string;
  email: string;
  studyDestination?: string | null;
  preferredDate?: string | null;
  preferredTime?: string | null;
  createdAt: string;
};

type Blog = {
  id: number;
  title: string;
  slug: string;
  isPublished: boolean;
  createdAt: string;
};

type Destination = { id: number; name: string; slug: string };

type Staff = { id: number; name: string; designation: string };

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);

  async function loadDashboardData() {
    setLoading(true);
    try {
      const [inqRes, conRes, blogRes, desRes, staffRes] = await Promise.all([
        fetch("/api/inquiries", { cache: "no-store" }),
        fetch("/api/consultations", { cache: "no-store" }),
        fetch("/api/blog?includeDraft=1", { cache: "no-store" }),
        fetch("/api/destination", { cache: "no-store" }),
        fetch("/api/staff-profile?all=1", { cache: "no-store" }),
      ]);

      const [inqData, conData, blogData, desData, staffData] = await Promise.all([
        inqRes.json(),
        conRes.json(),
        blogRes.json(),
        desRes.json(),
        staffRes.json(),
      ]);

      setInquiries(Array.isArray(inqData?.inquiries) ? inqData.inquiries : []);
      setConsultations(Array.isArray(conData?.consultations) ? conData.consultations : []);
      setBlogs(Array.isArray(blogData?.blogs) ? blogData.blogs : []);
      setDestinations(Array.isArray(desData?.destinations) ? desData.destinations : []);
      setStaff(Array.isArray(staffData?.staff) ? staffData.staff : []);
    } catch (error) {
      console.error("Failed to load dashboard data", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    Promise.resolve().then(loadDashboardData);
  }, []);

  const stats = useMemo(
    () => [
      { label: "Contact Requests", value: inquiries.length, icon: MessageSquare, color: "text-blue-600", bg: "bg-blue-100", href: "/admin/consultations" },
      { label: "Consultation Requests", value: consultations.length, icon: Calendar, color: "text-purple-600", bg: "bg-purple-100", href: "/admin/consultations" },
      { label: "Blog Posts", value: blogs.length, icon: FileText, color: "text-emerald-600", bg: "bg-emerald-100", href: "/admin/blog" },
      { label: "Destinations", value: destinations.length, icon: Globe, color: "text-orange-600", bg: "bg-orange-100", href: "/admin/destinations" },
      { label: "Staff Profiles", value: staff.length, icon: UserCog, color: "text-pink-600", bg: "bg-pink-100", href: "/admin/staff" },
    ],
    [inquiries.length, consultations.length, blogs.length, destinations.length, staff.length],
  );

  const recentInquiries = inquiries.slice(0, 5);
  const recentConsultations = consultations.slice(0, 5);
  const recentBlogs = blogs.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6 text-gray-600">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-sm text-gray-600 mt-1">Relevant overview of your website content and form submissions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
        {stats.map((card) => (
          <Link key={card.label} href={card.href} className="bg-white border rounded-xl p-4 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg ${card.bg} flex items-center justify-center`}>
                <card.icon className={`w-5 h-5 ${card.color}`} />
              </div>
            </div>
            <p className="text-sm text-gray-600">{card.label}</p>
            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <section className="bg-white border rounded-xl p-5">
          <h2 className="font-semibold text-gray-900 mb-3">Recent Contact Requests</h2>
          <div className="space-y-3">
            {loading ? (
              <p className="text-sm text-gray-500">Loading...</p>
            ) : recentInquiries.length ? (
              recentInquiries.map((item) => (
                <div key={item.id} className="border rounded-lg p-3">
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.email}</p>
                  <p className="text-xs text-gray-500">{item.subject || "No subject"}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No contact requests yet.</p>
            )}
          </div>
        </section>

        <section className="bg-white border rounded-xl p-5">
          <h2 className="font-semibold text-gray-900 mb-3">Recent Consultation Requests</h2>
          <div className="space-y-3">
            {loading ? (
              <p className="text-sm text-gray-500">Loading...</p>
            ) : recentConsultations.length ? (
              recentConsultations.map((item) => (
                <div key={item.id} className="border rounded-lg p-3">
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.studyDestination || "No destination"}</p>
                  <p className="text-xs text-gray-500">{item.preferredDate || "Any date"} {item.preferredTime || ""}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No consultation requests yet.</p>
            )}
          </div>
        </section>

        <section className="bg-white border rounded-xl p-5">
          <h2 className="font-semibold text-gray-900 mb-3">Recent Blog Posts</h2>
          <div className="space-y-3">
            {loading ? (
              <p className="text-sm text-gray-500">Loading...</p>
            ) : recentBlogs.length ? (
              recentBlogs.map((item) => (
                <div key={item.id} className="border rounded-lg p-3">
                  <p className="font-medium text-gray-900">{item.title}</p>
                  <p className="text-xs text-gray-500">/{item.slug}</p>
                  <span className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${item.isPublished ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                    {item.isPublished ? "Published" : "Draft"}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No blog posts yet.</p>
            )}
          </div>
        </section>
      </div>

      <section className="bg-white border rounded-xl p-5">
        <h2 className="font-semibold text-gray-900 mb-3">Quick Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3">
          <Link href="/admin/destinations" className="border rounded-lg p-3 hover:bg-gray-50">Manage Destinations</Link>
          <Link href="/admin/blog" className="border rounded-lg p-3 hover:bg-gray-50">Manage Blog Posts</Link>
          <Link href="/admin/staff" className="border rounded-lg p-3 hover:bg-gray-50">Manage Staff Profiles</Link>
          <Link href="/admin/aboutus" className="border rounded-lg p-3 hover:bg-gray-50">Manage CEO Content</Link>
          <Link href="/admin/site-settings" className="border rounded-lg p-3 hover:bg-gray-50">Manage Site Settings</Link>
        </div>
      </section>

      <section className="bg-white border rounded-xl p-5">
        <h2 className="font-semibold text-gray-900 mb-3">Active Team Members</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          {staff.slice(0, 8).map((member) => (
            <div key={member.id} className="border rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <UserRound className="w-4 h-4 text-gray-500" />
                <p className="font-medium text-gray-900">{member.name}</p>
              </div>
              <p className="text-sm text-gray-600">{member.designation}</p>
            </div>
          ))}
          {!loading && staff.length === 0 ? <p className="text-sm text-gray-500">No staff profile data.</p> : null}
        </div>
      </section>
    </div>
  );
}
