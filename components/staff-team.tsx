"use client";

import { useEffect, useRef, useState } from "react";

type Staff = {
  id: number;
  name: string;
  designation: string;
  image?: string | null;
  socialUrl?: string | null;
};

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  return parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : name.slice(0, 2).toUpperCase();
}

/* Deterministic soft color from name */
const AVATAR_PALETTES = [
  { bg: "#e8edff", text: "#2940d3" },
  { bg: "#fde8f0", text: "#c2185b" },
  { bg: "#e6f7f1", text: "#0f7b56" },
  { bg: "#fff3e0", text: "#e65100" },
  { bg: "#f3e8ff", text: "#7b1fa2" },
  { bg: "#e3f2fd", text: "#0d47a1" },
];
function avatarPalette(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_PALETTES[Math.abs(hash) % AVATAR_PALETTES.length];
}

export default function StaffTeam() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let ignore = false;
    async function loadStaff() {
      try {
        const res = await fetch("/api/staff-profile", { cache: "no-store" });
        const data = await res.json();
        if (!ignore && data?.success) {
          setStaff(Array.isArray(data.staff) ? data.staff : []);
        }
      } catch (err) {
        console.error("Failed to load staff profiles", err);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    loadStaff();
    return () => { ignore = true; };
  }, []);

  function updateArrows() {
    const el = sliderRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    return () => el.removeEventListener("scroll", updateArrows);
  }, [staff]);

  function handleSlide(direction: "left" | "right") {
    const el = sliderRef.current;
    if (!el) return;
    const cardWidth = 248 + 16;
    el.scrollBy({ left: direction === "left" ? -cardWidth * 2 : cardWidth * 2, behavior: "smooth" });
  }

  /* ── Skeleton cards ── */
  const SkeletonCard = () => (
    <div className="st-card st-skeleton">
      <div className="st-photo sk-block" style={{ height: 186 }} />
      <div className="st-body">
        <div className="sk-line" style={{ width: "70%", height: 14, marginBottom: 8 }} />
        <div className="sk-line" style={{ width: "50%", height: 11 }} />
      </div>
    </div>
  );

  return (
    <section className="staff-section">
      <style>{`
        /* ── Base ── */
        .staff-section {
          max-width: 1160px;
          margin: 0 auto;
          padding: 56px 28px 48px;
          font-family: 'DM Sans', 'Inter', system-ui, sans-serif;
        }

        /* ── Section header ── */
        .st-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 32px;
          gap: 16px;
          flex-wrap: wrap;
        }
        .st-header-left {}
        .st-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #2940d3;
          margin-bottom: 10px;
        }
        .st-eyebrow-bar {
          width: 22px;
          height: 2px;
          border-radius: 2px;
          background: #2940d3;
        }
        .st-heading {
          font-size: clamp(22px, 4vw, 32px);
          font-weight: 700;
          color: #0f1120;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin-bottom: 8px;
        }
        .st-subheading {
          font-size: 14px;
          color: #6b7499;
          font-weight: 400;
          line-height: 1.5;
        }
        .st-nav-btns {
          display: flex;
          gap: 10px;
          align-items: center;
          flex-shrink: 0;
        }
        .st-arrow {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          border: 1px solid #e2e8f5;
          background: #ffffff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #2940d3;
          transition: all 0.18s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        .st-arrow:hover:not(:disabled) {
          background: #eef1ff;
          border-color: #c4cffa;
          box-shadow: 0 4px 14px rgba(41,64,211,0.12);
          transform: translateY(-1px);
        }
        .st-arrow:disabled {
          opacity: 0.35;
          cursor: not-allowed;
          box-shadow: none;
        }

        /* ── Slider wrapper ── */
        .st-slider-wrap {
          position: relative;
        }
        .st-fade-left, .st-fade-right {
          position: absolute;
          top: 0;
          width: 56px;
          height: 100%;
          z-index: 3;
          pointer-events: none;
          transition: opacity 0.25s;
        }
        .st-fade-left  { left: 0;  background: linear-gradient(to right, #f5f7ff, transparent); }
        .st-fade-right { right: 0; background: linear-gradient(to left,  #f5f7ff, transparent); }
        .st-fade-left.hidden, .st-fade-right.hidden { opacity: 0; }

        .st-track {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding: 8px 4px 16px;
          scroll-snap-type: x mandatory;
        }
        .st-track::-webkit-scrollbar { display: none; }

        /* ── Card ── */
        .st-card {
          width: 240px;
          border: 1px solid #e4e8f5;
          border-radius: 18px;
          overflow: hidden;
          background: #ffffff;
          box-shadow: 0 4px 18px rgba(15,17,32,0.06);
          flex-shrink: 0;
          scroll-snap-align: start;
          transition: transform 0.22s ease, box-shadow 0.22s ease;
          position: relative;
        }
        .st-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 14px 36px rgba(41,64,211,0.12);
        }
        .st-card-stripe {
          height: 3px;
          background: linear-gradient(90deg, #2940d3, #6b87f8, #f4a944);
        }

        /* Photo area */
        .st-photo {
          height: 186px;
          background: #f0f3ff;
          position: relative;
          overflow: hidden;
        }
        .st-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.35s ease;
        }
        .st-card:hover .st-photo img {
          transform: scale(1.04);
        }
        .st-photo-fallback {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          font-weight: 700;
          letter-spacing: 0.02em;
        }
        .st-designation-badge {
          position: absolute;
          bottom: 10px;
          left: 10px;
          right: 10px;
          background: rgba(15,17,32,0.70);
          backdrop-filter: blur(6px);
          color: rgba(255,255,255,0.92);
          border-radius: 8px;
          padding: 5px 10px;
          font-size: 10.5px;
          letter-spacing: 0.04em;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          opacity: 0;
          transform: translateY(4px);
          transition: opacity 0.22s ease, transform 0.22s ease;
        }
        .st-card:hover .st-designation-badge {
          opacity: 1;
          transform: translateY(0);
        }

        /* Body */
        .st-body {
          padding: 16px 16px 18px;
        }
        .st-name {
          font-size: 15px;
          font-weight: 700;
          color: #0f1120;
          margin-bottom: 4px;
          line-height: 1.3;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .st-role {
          font-size: 12.5px;
          color: #6b7499;
          line-height: 1.45;
          font-weight: 400;
          min-height: 36px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .st-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 12px;
        }
        .st-role-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 3px 10px;
          border-radius: 100px;
          background: #f0f3ff;
          border: 1px solid #dde3fc;
          font-size: 10.5px;
          font-weight: 600;
          color: #2940d3;
        }
        .st-role-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #2940d3;
        }
        .st-social {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 9px;
          border: 1px solid #d8e5f2;
          background: #f5faff;
          color: #0a66c2;
          text-decoration: none;
          transition: transform 0.18s ease, background 0.18s ease, border-color 0.18s ease;
        }
        .st-social:hover {
          transform: translateY(-1px);
          background: #e1f0ff;
          border-color: #a8ccf0;
        }

        /* Skeleton */
        .st-skeleton { pointer-events: none; }
        .sk-block, .sk-line {
          background: linear-gradient(90deg, #f0f2fa 25%, #e5e9f8 50%, #f0f2fa 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
          border-radius: 6px;
        }
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* Count badge */
        .st-count {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border-radius: 100px;
          background: #f0f3ff;
          border: 1px solid #dde3fc;
          font-size: 12px;
          font-weight: 600;
          color: #2940d3;
          margin-top: 10px;
        }

        @media (max-width: 600px) {
          .staff-section { padding: 36px 16px 32px; }
          .st-card { width: 210px; }
          .st-nav-btns { display: none; }
        }
      `}</style>

      {/* ── Section header ── */}
      <div className="st-header">
        <div className="st-header-left">
          <div className="st-eyebrow">
            <span className="st-eyebrow-bar" />
            Our People
          </div>
          <h2 className="st-heading">Meet the Team</h2>
          <p className="st-subheading">
            Experts guiding your international education journey.
          </p>
          {!loading && (
            <div className="st-count">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              {staff.length} team member{staff.length !== 1 ? "s" : ""}
            </div>
          )}
        </div>

        {/* Arrow buttons — desktop */}
        <div className="st-nav-btns">
          <button
            type="button"
            className="st-arrow"
            onClick={() => handleSlide("left")}
            disabled={!canLeft}
            aria-label="Scroll left"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            className="st-arrow"
            onClick={() => handleSlide("right")}
            disabled={!canRight}
            aria-label="Scroll right"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Slider ── */}
      <div className="st-slider-wrap">
        <div className={`st-fade-left${!canLeft ? " hidden" : ""}`} />
        <div className={`st-fade-right${!canRight ? " hidden" : ""}`} />

        <div className="st-track" ref={sliderRef}>
          {loading
            ? Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)
            : staff.map((member) => {
                const palette = avatarPalette(member.name);
                return (
                  <article key={member.id} className="st-card">
                    <div className="st-card-stripe" />

                    {/* Photo */}
                    <div className="st-photo">
                      {member.image ? (
                        <img src={member.image} alt={member.name} />
                      ) : (
                        <div
                          className="st-photo-fallback"
                          style={{ background: palette.bg, color: palette.text }}
                        >
                          {getInitials(member.name)}
                        </div>
                      )}
                      {/* Hover designation overlay */}
                      <div className="st-designation-badge">{member.designation}</div>
                    </div>

                    {/* Body */}
                    <div className="st-body">
                      <h3 className="st-name">{member.name}</h3>
                      <p className="st-role">{member.designation}</p>

                      <div className="st-footer">
                        <span className="st-role-pill">
                          <span className="st-role-dot" />
                          Staff
                        </span>

                        {member.socialUrl ? (
                          <a
                            href={member.socialUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="st-social"
                            aria-label={`${member.name} LinkedIn`}
                          >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.026-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.063 2.063 0 1 1 0-4.126 2.063 2.063 0 0 1 0 4.126zM7.114 20.452H3.56V9h3.554v11.452z" />
                            </svg>
                          </a>
                        ) : (
                          /* Placeholder spacer so layout stays consistent */
                          <div style={{ width: 32 }} />
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
        </div>
      </div>

      {/* Empty state */}
      {!loading && staff.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "52px 24px",
            background: "#fff",
            border: "1.5px dashed #dde3fb",
            borderRadius: 16,
            color: "#6b7499",
            fontSize: 14,
          }}
        >
          <div style={{ fontSize: 36, marginBottom: 10 }}>👥</div>
          <p style={{ fontWeight: 700, color: "#0f1120", marginBottom: 4 }}>No team members yet</p>
          <p>Staff profiles will appear here once added.</p>
        </div>
      )}
    </section>
  );
}