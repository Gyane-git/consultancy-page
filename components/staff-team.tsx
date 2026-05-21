"use client";

import { useEffect, useState } from "react";

type Staff = {
  id: number;
  name: string;
  designation: string;
  image?: string | null;
  socialUrl?: string | null;
};

export default function StaffTeam() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function loadStaff() {
      try {
        const res = await fetch("/api/staff-profile", { cache: "no-store" });
        const data = await res.json();
        if (!ignore && data?.success) {
          setStaff(Array.isArray(data.staff) ? data.staff : []);
        }
      } catch (error) {
        console.error("Failed to load staff profiles", error);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadStaff();
    return () => {
      ignore = true;
    };
  }, []);

  if (loading) {
    return <div style={{ padding: "24px 48px", textAlign: "center", color: "#777" }}>Loading team profiles...</div>;
  }

  if (!staff.length) {
    return <div style={{ padding: "24px 48px", textAlign: "center", color: "#777" }}>No staff profiles available right now.</div>;
  }

  const loopedStaff = [...staff, ...staff];

  return (
    <section style={{ maxWidth: 1140, margin: "0 auto", padding: "40px 24px 20px" }}>
      <style>{`
        .st-wrap { overflow: hidden; position: relative; }
        .st-wrap::before, .st-wrap::after {
          content: "";
          position: absolute;
          top: 0;
          width: 72px;
          height: 100%;
          z-index: 3;
          pointer-events: none;
        }
        .st-wrap::before {
          left: 0;
          background: linear-gradient(to right, #fff 0%, rgba(255,255,255,0) 100%);
        }
        .st-wrap::after {
          right: 0;
          background: linear-gradient(to left, #fff 0%, rgba(255,255,255,0) 100%);
        }
        .st-track {
          display: flex;
          gap: 18px;
          width: max-content;
          animation: st-marquee 45s linear infinite;
          padding: 6px 2px 10px;
        }
        .st-wrap:hover .st-track { animation-play-state: paused; }
        @keyframes st-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .st-card {
          width: 248px;
          border: 1px solid #ececec;
          border-radius: 16px;
          overflow: hidden;
          background: #fff;
          box-shadow: 0 8px 30px rgba(0,0,0,0.06);
          transition: transform 0.22s ease, box-shadow 0.22s ease;
          flex-shrink: 0;
        }
        .st-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 14px 36px rgba(0,0,0,0.1);
        }
        .st-photo {
          aspect-ratio: 4 / 3;
          background: linear-gradient(135deg, #f2f5f8, #e6edf2);
          position: relative;
          overflow: hidden;
        }
        .st-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .st-photo-badge {
          position: absolute;
          bottom: 10px;
          left: 10px;
          background: rgba(17,17,17,0.74);
          backdrop-filter: blur(4px);
          color: #fff;
          border-radius: 999px;
          padding: 4px 10px;
          font-size: 0.7rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-weight: 600;
        }
        .st-body { padding: 14px 14px 16px; }
        .st-name {
          font-size: 1.02rem;
          font-weight: 700;
          color: #101010;
          margin-bottom: 4px;
          line-height: 1.35;
        }
        .st-role {
          font-size: 0.85rem;
          color: #6f6f6f;
          min-height: 36px;
        }
        .st-social {
          margin-top: 10px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: 10px;
          border: 1px solid #d8e5f2;
          background: #f5faff;
          color: #0a66c2;
          text-decoration: none;
          transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
        }
        .st-social:hover {
          transform: translateY(-1px);
          background: #e9f4ff;
          border-color: #b8d6f3;
        }
        @media (max-width: 640px) {
          .st-card { width: 220px; }
          .st-wrap::before, .st-wrap::after { width: 34px; }
          .st-track { animation-duration: 34s; }
        }
      `}</style>

      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#111", marginBottom: 8 }}>Our Team</h2>
        <p style={{ color: "#777" }}>Meet the experts guiding your international education journey.</p>
      </div>

      <div className="st-wrap">
        <div className="st-track">
          {loopedStaff.map((member, idx) => (
            <article key={`${member.id}-${idx}`} className="st-card">
              <div className="st-photo">
                {member.image ? (
                  <img src={member.image} alt={member.name} />
                ) : (
                  <div style={{ color: "#888", fontWeight: 600, fontSize: "0.85rem", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    No Image
                  </div>
                )}
                <div className="st-photo-badge">Team Member</div>
              </div>
              <div className="st-body">
                <h3 className="st-name">{member.name}</h3>
                <p className="st-role">{member.designation}</p>
                {member.socialUrl ? (
                  <a href={member.socialUrl} target="_blank" rel="noreferrer" className="st-social" aria-label={`${member.name} LinkedIn`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.026-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.063 2.063 0 1 1 0-4.126 2.063 2.063 0 0 1 0 4.126zM7.114 20.452H3.56V9h3.554v11.452z" />
                    </svg>
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
