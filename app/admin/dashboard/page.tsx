"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Calendar,
  FileText,
  Globe,
  MessageSquare,
  UserCog,
  UserRound,
  ArrowUpRight,
  TrendingUp,
  Clock,
  RefreshCw,
} from "lucide-react";

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

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function AvatarCircle({ name, index }: { name: string; index: number }) {
  const palettes = [
    { bg: "#EAF3DE", text: "#3B6D11" },
    { bg: "#E6F1FB", text: "#185FA5" },
    { bg: "#EEEDFE", text: "#534AB7" },
    { bg: "#FAEEDA", text: "#854F0B" },
    { bg: "#E1F5EE", text: "#0F6E56" },
    { bg: "#FBEAF0", text: "#993556" },
  ];
  const p = palettes[index % palettes.length];
  return (
    <div
      style={{
        width: 38,
        height: 38,
        borderRadius: "50%",
        background: p.bg,
        color: p.text,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 600,
        fontSize: 13,
        flexShrink: 0,
        letterSpacing: "0.03em",
      }}
    >
      {getInitials(name)}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div
      style={{
        padding: "14px 16px",
        borderRadius: 12,
        background: "#F8F8F8",
        animation: "pulse 1.5s ease-in-out infinite",
      }}
    >
      <div style={{ width: "60%", height: 13, background: "#E5E5E5", borderRadius: 6, marginBottom: 8 }} />
      <div style={{ width: "80%", height: 11, background: "#EEEEEE", borderRadius: 6, marginBottom: 6 }} />
      <div style={{ width: "40%", height: 10, background: "#F0F0F0", borderRadius: 6 }} />
    </div>
  );
}

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
      {
        label: "Contact Requests",
        value: inquiries.length,
        icon: MessageSquare,
        accent: "#185FA5",
        accentBg: "#E6F1FB",
        href: "/admin/inquiries",
      },
      {
        label: "Consultations",
        value: consultations.length,
        icon: Calendar,
        accent: "#534AB7",
        accentBg: "#EEEDFE",
        href: "/admin/consultations",
      },
      {
        label: "Blog Posts",
        value: blogs.length,
        icon: FileText,
        accent: "#3B6D11",
        accentBg: "#EAF3DE",
        href: "/admin/blog",
      },
      {
        label: "Destinations",
        value: destinations.length,
        icon: Globe,
        accent: "#0F6E56",
        accentBg: "#E1F5EE",
        href: "/admin/destinations",
      },
      {
        label: "Staff Members",
        value: staff.length,
        icon: UserCog,
        accent: "#993556",
        accentBg: "#FBEAF0",
        href: "/admin/staff",
      },
    ],
    [inquiries.length, consultations.length, blogs.length, destinations.length, staff.length]
  );

  const recentInquiries = inquiries.slice(0, 5);
  const recentConsultations = consultations.slice(0, 5);
  const recentBlogs = blogs.slice(0, 5);

  const quickLinks = [
    { label: "Destinations", href: "/admin/destinations", icon: Globe, color: "#0F6E56", bg: "#E1F5EE" },
    { label: "Blog Posts", href: "/admin/blog", icon: FileText, color: "#3B6D11", bg: "#EAF3DE" },
    { label: "Staff Profiles", href: "/admin/staff", icon: UserCog, color: "#993556", bg: "#FBEAF0" },
    { label: "CEO Content", href: "/admin/aboutus", icon: UserRound, color: "#534AB7", bg: "#EEEDFE" },
    { label: "Site Settings", href: "/admin/site-settings", icon: TrendingUp, color: "#185FA5", bg: "#E6F1FB" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=DM+Serif+Display:ital@0;1&display=swap');

        .adm-root * { box-sizing: border-box; }

        .adm-root {
          font-family: 'DM Sans', sans-serif;
          background: #F6F5F2;
          min-height: 100vh;
          padding: 32px 28px;
          color: #1A1A18;
        }

        .adm-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 32px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .adm-header-left h1 {
          font-family: 'DM Serif Display', serif;
          font-size: 36px;
          font-weight: 400;
          color: #1A1A18;
          margin: 0 0 4px 0;
          line-height: 1.1;
          letter-spacing: -0.5px;
        }

        .adm-header-left p {
          font-size: 14px;
          color: #888780;
          margin: 0;
          font-weight: 300;
        }

        .adm-refresh-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          background: white;
          border: 1px solid #E0DFD8;
          border-radius: 10px;
          font-size: 13px;
          font-family: 'DM Sans', sans-serif;
          color: #5F5E5A;
          cursor: pointer;
          transition: all 0.15s ease;
          font-weight: 400;
        }
        .adm-refresh-btn:hover {
          background: #F0EFE8;
          border-color: #C8C7C0;
          color: #1A1A18;
        }

        .adm-stats-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 14px;
          margin-bottom: 28px;
        }

        @media (max-width: 1100px) {
          .adm-stats-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 700px) {
          .adm-stats-grid { grid-template-columns: repeat(2, 1fr); }
        }

        .adm-stat-card {
          background: white;
          border: 1px solid #EEEEE8;
          border-radius: 16px;
          padding: 20px;
          text-decoration: none;
          display: block;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }
        .adm-stat-card::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 16px;
          opacity: 0;
          transition: opacity 0.2s;
          background: linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(0,0,0,0.015) 100%);
        }
        .adm-stat-card:hover {
          border-color: #D8D7D0;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.07);
        }
        .adm-stat-card:hover::after { opacity: 1; }

        .adm-stat-icon-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .adm-stat-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .adm-stat-arrow {
          opacity: 0.3;
          transition: opacity 0.2s, transform 0.2s;
        }
        .adm-stat-card:hover .adm-stat-arrow {
          opacity: 0.8;
          transform: translate(2px, -2px);
        }

        .adm-stat-label {
          font-size: 12px;
          color: #888780;
          font-weight: 400;
          letter-spacing: 0.02em;
          margin-bottom: 4px;
          text-transform: uppercase;
        }

        .adm-stat-value {
          font-size: 32px;
          font-weight: 600;
          color: #1A1A18;
          line-height: 1;
          letter-spacing: -1px;
          font-variant-numeric: tabular-nums;
        }

        .adm-content-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 20px;
        }
        @media (max-width: 960px) {
          .adm-content-grid { grid-template-columns: 1fr; }
        }

        .adm-panel {
          background: white;
          border: 1px solid #EEEEE8;
          border-radius: 16px;
          overflow: hidden;
        }

        .adm-panel-header {
          padding: 18px 20px 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #F2F1EC;
        }

        .adm-panel-title {
          font-size: 14px;
          font-weight: 600;
          color: #1A1A18;
          letter-spacing: -0.1px;
        }

        .adm-panel-badge {
          font-size: 11px;
          padding: 2px 8px;
          border-radius: 20px;
          background: #F2F1EC;
          color: #888780;
          font-weight: 500;
        }

        .adm-panel-body {
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .adm-item-card {
          padding: 12px 14px;
          border-radius: 10px;
          background: #FAFAF8;
          border: 1px solid transparent;
          transition: border-color 0.15s, background 0.15s;
          cursor: default;
        }
        .adm-item-card:hover {
          background: #F4F3EF;
          border-color: #E8E7E0;
        }

        .adm-item-name {
          font-size: 13.5px;
          font-weight: 500;
          color: #1A1A18;
          margin-bottom: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .adm-item-sub {
          font-size: 12px;
          color: #888780;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .adm-item-meta {
          font-size: 11px;
          color: #B4B2A9;
          margin-top: 4px;
        }

        .adm-badge-published {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          padding: 2px 8px;
          border-radius: 20px;
          background: #EAF3DE;
          color: #3B6D11;
          font-weight: 500;
          margin-top: 5px;
        }

        .adm-badge-draft {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          padding: 2px 8px;
          border-radius: 20px;
          background: #FAEEDA;
          color: #854F0B;
          font-weight: 500;
          margin-top: 5px;
        }

        .adm-badge-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: currentColor;
          display: inline-block;
        }

        .adm-empty {
          padding: 24px 14px;
          text-align: center;
          font-size: 13px;
          color: #B4B2A9;
        }

        .adm-bottom-grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 16px;
        }
        @media (max-width: 900px) {
          .adm-bottom-grid { grid-template-columns: 1fr; }
        }

        .adm-quick-links {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 12px;
        }

        .adm-quick-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          border-radius: 10px;
          text-decoration: none;
          background: #FAFAF8;
          border: 1px solid transparent;
          transition: all 0.15s;
          color: #1A1A18;
        }
        .adm-quick-link:hover {
          background: #F4F3EF;
          border-color: #E8E7E0;
          transform: translateX(3px);
        }

        .adm-quick-link-icon {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .adm-quick-link-label {
          font-size: 13.5px;
          font-weight: 500;
          flex: 1;
        }

        .adm-staff-grid {
          padding: 12px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }

        .adm-staff-card {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 10px;
          background: #FAFAF8;
          border: 1px solid transparent;
          transition: all 0.15s;
        }
        .adm-staff-card:hover {
          background: #F4F3EF;
          border-color: #E8E7E0;
        }

        .adm-staff-info-name {
          font-size: 13px;
          font-weight: 500;
          color: #1A1A18;
          line-height: 1.2;
        }

        .adm-staff-info-role {
          font-size: 11px;
          color: #888780;
          line-height: 1.3;
        }

        .adm-divider {
          width: 1px;
          height: 14px;
          background: #E0DFD8;
          flex-shrink: 0;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .adm-spinning {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div className="adm-root">
        {/* Header */}
        <div className="adm-header">
          <div className="adm-header-left">
            <h1>Dashboard</h1>
            <p>Overview of your website content and form submissions.</p>
          </div>
          <button className="adm-refresh-btn" onClick={loadDashboardData}>
            <RefreshCw size={13} className={loading ? "adm-spinning" : ""} />
            Refresh
          </button>
        </div>

        {/* Stat Cards */}
        <div className="adm-stats-grid">
          {stats.map((card) => (
            <Link key={card.label} href={card.href} className="adm-stat-card">
              <div className="adm-stat-icon-row">
                <div className="adm-stat-icon" style={{ background: card.accentBg }}>
                  <card.icon size={18} color={card.accent} strokeWidth={2} />
                </div>
                <ArrowUpRight size={14} color="#888780" className="adm-stat-arrow" />
              </div>
              <div className="adm-stat-label">{card.label}</div>
              <div className="adm-stat-value">
                {loading ? (
                  <span style={{ fontSize: 20, color: "#D3D1C7" }}>—</span>
                ) : (
                  card.value
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Activity Panels */}
        <div className="adm-content-grid">
          {/* Contact Requests */}
          <div className="adm-panel">
            <div className="adm-panel-header">
              <span className="adm-panel-title">Contact Requests</span>
              <span className="adm-panel-badge">{loading ? "…" : `${recentInquiries.length} recent`}</span>
            </div>
            <div className="adm-panel-body">
              {loading ? (
                [1, 2, 3].map((i) => <SkeletonCard key={i} />)
              ) : recentInquiries.length ? (
                recentInquiries.map((item, i) => (
                  <div key={item.id} className="adm-item-card">
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <AvatarCircle name={item.name} index={i} />
                      <div style={{ minWidth: 0 }}>
                        <div className="adm-item-name">{item.name}</div>
                        <div className="adm-item-sub">{item.email}</div>
                        {item.subject && (
                          <div className="adm-item-meta">{item.subject}</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="adm-empty">No contact requests yet.</div>
              )}
            </div>
          </div>

          {/* Consultation Requests */}
          <div className="adm-panel">
            <div className="adm-panel-header">
              <span className="adm-panel-title">Consultation Requests</span>
              <span className="adm-panel-badge">{loading ? "…" : `${recentConsultations.length} recent`}</span>
            </div>
            <div className="adm-panel-body">
              {loading ? (
                [1, 2, 3].map((i) => <SkeletonCard key={i} />)
              ) : recentConsultations.length ? (
                recentConsultations.map((item, i) => (
                  <div key={item.id} className="adm-item-card">
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <AvatarCircle name={item.name} index={i + 2} />
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div className="adm-item-name">{item.name}</div>
                        <div className="adm-item-sub">{item.studyDestination || "No destination specified"}</div>
                        {(item.preferredDate || item.preferredTime) && (
                          <div className="adm-item-meta" style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            <Clock size={10} />
                            {[item.preferredDate, item.preferredTime].filter(Boolean).join(" · ")}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="adm-empty">No consultation requests yet.</div>
              )}
            </div>
          </div>

          {/* Blog Posts */}
          <div className="adm-panel">
            <div className="adm-panel-header">
              <span className="adm-panel-title">Blog Posts</span>
              <span className="adm-panel-badge">
                {loading ? "…" : `${blogs.filter((b) => b.isPublished).length} live`}
              </span>
            </div>
            <div className="adm-panel-body">
              {loading ? (
                [1, 2, 3].map((i) => <SkeletonCard key={i} />)
              ) : recentBlogs.length ? (
                recentBlogs.map((item) => (
                  <div key={item.id} className="adm-item-card">
                    <div className="adm-item-name">{item.title}</div>
                    <div className="adm-item-sub" style={{ fontFamily: "monospace", fontSize: 11 }}>/{item.slug}</div>
                    <span className={item.isPublished ? "adm-badge-published" : "adm-badge-draft"}>
                      <span className="adm-badge-dot" />
                      {item.isPublished ? "Published" : "Draft"}
                    </span>
                  </div>
                ))
              ) : (
                <div className="adm-empty">No blog posts yet.</div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="adm-bottom-grid">
          {/* Quick Management */}
          <div className="adm-panel">
            <div className="adm-panel-header">
              <span className="adm-panel-title">Quick Management</span>
            </div>
            <div className="adm-quick-links">
              {quickLinks.map((ql) => (
                <Link key={ql.label} href={ql.href} className="adm-quick-link">
                  <div className="adm-quick-link-icon" style={{ background: ql.bg }}>
                    <ql.icon size={15} color={ql.color} strokeWidth={2} />
                  </div>
                  <span className="adm-quick-link-label">{ql.label}</span>
                  <ArrowUpRight size={13} color="#B4B2A9" />
                </Link>
              ))}
            </div>
          </div>

          {/* Staff */}
          <div className="adm-panel">
            <div className="adm-panel-header">
              <span className="adm-panel-title">Active Team Members</span>
              <span className="adm-panel-badge">{loading ? "…" : `${staff.length} total`}</span>
            </div>
            <div className="adm-staff-grid">
              {loading ? (
                [1, 2, 3, 4, 5, 6].map((i) => <SkeletonCard key={i} />)
              ) : staff.length ? (
                staff.slice(0, 8).map((member, i) => (
                  <div key={member.id} className="adm-staff-card">
                    <AvatarCircle name={member.name} index={i} />
                    <div style={{ minWidth: 0 }}>
                      <div className="adm-staff-info-name">{member.name}</div>
                      <div className="adm-staff-info-role">{member.designation}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="adm-empty" style={{ gridColumn: "1 / -1" }}>
                  No staff profiles yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}