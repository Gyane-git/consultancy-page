"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type University = {
  id: number;
  name: string;
  logo?: string | null;
  country?: string | null;
  courseName?: string | null;
  courseDescription?: string | null;
  supportImage?: string | null;
  videoUrl?: string | null;
};

function toEmbedUrl(input?: string | null): string {
  const value = String(input || "").trim();
  if (!value) return "";

  try {
    if (value.includes("<iframe")) {
      const match = value.match(/src\s*=\s*["']([^"']+)["']/i);
      return match?.[1] || "";
    }

    const parsed = new URL(value);
    const host = parsed.hostname.toLowerCase();

    if (host.includes("youtube.com") || host.includes("youtu.be")) {
      const id = host.includes("youtu.be")
        ? parsed.pathname.split("/").filter(Boolean)[0]
        : parsed.searchParams.get("v") ||
          parsed.pathname.split("/").filter(Boolean)[1] ||
          "";
      return id ? `https://www.youtube.com/embed/${id}` : "";
    }

    if (host.includes("facebook.com") || host.includes("fb.watch")) {
      if (parsed.pathname.includes("/plugins/video.php"))
        return parsed.toString();
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
        value
      )}&show_text=false`;
    }

    return "";
  } catch {
    return "";
  }
}

/* ── Flag emoji helper ── */
function countryFlag(country?: string | null): string {
  if (!country) return "";
  const map: Record<string, string> = {
    australia: "🇦🇺",
    "united states": "🇺🇸",
    usa: "🇺🇸",
    uk: "🇬🇧",
    "united kingdom": "🇬🇧",
    canada: "🇨🇦",
    germany: "🇩🇪",
    france: "🇫🇷",
    japan: "🇯🇵",
    india: "🇮🇳",
    china: "🇨🇳",
    nepal: "🇳🇵",
    singapore: "🇸🇬",
    malaysia: "🇲🇾",
    newzealand: "🇳🇿",
    "new zealand": "🇳🇿",
  };
  return map[country.toLowerCase()] ?? "🌐";
}

/* ── Initials avatar ── */
function Initials({ name }: { name: string }) {
  const parts = name.trim().split(/\s+/);
  const letters =
    parts.length >= 2
      ? parts[0][0] + parts[parts.length - 1][0]
      : name.slice(0, 2);
  return (
    <span style={{ textTransform: "uppercase", fontWeight: 600 }}>
      {letters}
    </span>
  );
}

/* ──────────────────────────────────────────────
   CARD COMPONENT
────────────────────────────────────────────── */
function UniCard({ item }: { item: University }) {
  const embedUrl = toEmbedUrl(item.videoUrl);
  const hasImage = Boolean(item.supportImage);
  const hasVideo = Boolean(embedUrl);
  const hasMedia = hasImage || hasVideo;

  return (
    <article className="uni-card">
      {/* Top gradient stripe */}
      <div className="card-stripe" />

      <div className="card-body">
        {/* ── University header ── */}
        <div className="uni-header">
          <div className="logo-wrap">
            {item.logo ? (
              <img
                src={item.logo}
                alt={item.name}
                className="logo-img"
              />
            ) : (
              <div className="logo-fallback">
                <Initials name={item.name} />
              </div>
            )}
          </div>

          <div className="uni-title-block">
            <h2 className="uni-name">{item.name}</h2>
            <span className="country-pill">
              {countryFlag(item.country)}&nbsp;&nbsp;
              {item.country || "Country not specified"}
            </span>
          </div>
        </div>

        {/* ── Course info ── */}
        <div className="course-box">
          <p className="course-eyebrow">Course offered</p>
          <p className="course-title">
            {item.courseName || "Course not specified"}
          </p>
          {item.courseDescription && (
            <p className="course-desc">{item.courseDescription}</p>
          )}
        </div>

        {/* ── Media section — only rendered when at least one media exists ── */}
        {hasMedia && (
          <div className={`media-grid ${hasImage && hasVideo ? "two-col" : "one-col"}`}>
            {hasImage && (
              <div className="media-item">
                <p className="media-label">
                  <span className="media-icon">📸</span> Campus highlights
                </p>
                <div className="media-frame">
                  <img
                    src={item.supportImage!}
                    alt={`${item.name} campus`}
                    className="media-img"
                  />
                </div>
              </div>
            )}

            {hasVideo && (
              <div className="media-item">
                <p className="media-label">
                  <span className="media-icon">▶</span> Program overview
                </p>
                <div className="media-frame">
                  <iframe
                    src={embedUrl}
                    title={`${item.name} video`}
                    className="media-iframe"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

/* ──────────────────────────────────────────────
   MAIN CONTENT
────────────────────────────────────────────── */
function UniversitySearchContent() {
  const searchParams = useSearchParams();
  const [items, setItems] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);

  const q = (searchParams.get("q") || "").trim();
  const university = (searchParams.get("university") || "").trim();
  const course = (searchParams.get("course") || "").trim();
  const country = (searchParams.get("country") || "").trim();

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const res = await fetch("/api/university", { cache: "no-store" });
        const data = await res.json();
        if (!ignore && res.ok && data?.success) {
          setItems(
            Array.isArray(data.universities) ? data.universities : []
          );
        }
      } catch (err) {
        console.error("Failed to load universities", err);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => { ignore = true; };
  }, []);

  const filtered = useMemo(() => {
    return items
      .filter((i) => (university ? i.name === university : true))
      .filter((i) => (course ? i.courseName === course : true))
      .filter((i) =>
        country
          ? (i.country || "").toLowerCase() === country.toLowerCase()
          : true
      )
      .filter((i) => {
        if (!q) return true;
        const text = `${i.name} ${i.country} ${i.courseName} ${i.courseDescription}`.toLowerCase();
        return text.includes(q.toLowerCase());
      });
  }, [items, q, university, course, country]);

  const activeFilters = [
    university && { label: "University", value: university },
    course && { label: "Course", value: course },
    country && { label: "Country", value: country },
    q && { label: "Keyword", value: q },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <>
      {/* ── Styles ── */}
      <style>{`
        /* Reset */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* Page */
        .search-page {
          min-height: 100vh;
          background: #f5f7ff;
          font-family: 'DM Sans', 'Inter', system-ui, sans-serif;
          color: #1a1e3c;
        }

        /* ── HERO ── */
        .hero {
          background: #ffffff;
          border-bottom: 1px solid #e4e8f5;
          padding: 44px 32px 36px;
        }
        .hero-inner {
          max-width: 900px;
          margin: 0 auto;
        }
        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #2940d3;
          margin-bottom: 12px;
        }
        .hero-eyebrow-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #2940d3;
        }
        .hero h1 {
          font-size: clamp(24px, 4vw, 38px);
          font-weight: 700;
          color: #0f1120;
          line-height: 1.15;
          letter-spacing: -0.025em;
        }
        .hero-sub {
          margin-top: 8px;
          font-size: 14px;
          color: #6b7499;
          line-height: 1.6;
        }

        /* Filter pills */
        .filter-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 20px;
        }
        .filter-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 500;
          background: #eef1ff;
          color: #2940d3;
          border: 1px solid #cdd5fb;
        }
        .filter-pill-label {
          color: #8a90c8;
          font-weight: 400;
        }

        /* Result count badge */
        .result-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 18px;
          padding: 6px 14px;
          border-radius: 100px;
          background: #f0f3ff;
          border: 1px solid #dde3fc;
          font-size: 12.5px;
          font-weight: 600;
          color: #2940d3;
        }
        .result-badge-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 0 3px rgba(34,197,94,0.2);
          animation: pulse 2.2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%,100% { box-shadow: 0 0 0 3px rgba(34,197,94,0.2); }
          50%      { box-shadow: 0 0 0 6px rgba(34,197,94,0.08); }
        }

        /* ── CONTENT AREA ── */
        .content {
          max-width: 900px;
          margin: 0 auto;
          padding: 32px 24px 64px;
        }

        /* ── CARD ── */
        .uni-card {
          background: #ffffff;
          border: 1px solid #e2e8f5;
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 20px;
          transition: box-shadow 0.22s ease, transform 0.22s ease;
          animation: slideUp 0.35s ease both;
        }
        .uni-card:nth-child(2) { animation-delay: 0.07s; }
        .uni-card:nth-child(3) { animation-delay: 0.14s; }
        .uni-card:nth-child(4) { animation-delay: 0.21s; }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .uni-card:hover {
          box-shadow: 0 8px 32px rgba(41,64,211,0.10);
          transform: translateY(-2px);
        }

        /* Top stripe */
        .card-stripe {
          height: 3px;
          background: linear-gradient(90deg, #2940d3 0%, #6b87f8 50%, #f4a944 100%);
        }

        .card-body {
          padding: 24px 26px 22px;
        }

        /* University header */
        .uni-header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 18px;
        }
        .logo-wrap {
          width: 54px; height: 54px;
          border-radius: 12px;
          border: 1px solid #e4e8f5;
          background: #f8faff;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          flex-shrink: 0;
        }
        .logo-img {
          width: 100%; height: 100%;
          object-fit: contain;
          padding: 6px;
        }
        .logo-fallback {
          width: 100%; height: 100%;
          background: #eef1ff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 700;
          color: #2940d3;
          letter-spacing: 0.04em;
        }
        .uni-title-block {
          flex: 1;
          min-width: 0;
        }
        .uni-name {
          font-size: 19px;
          font-weight: 700;
          color: #0f1120;
          line-height: 1.25;
          margin-bottom: 6px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .country-pill {
          display: inline-flex;
          align-items: center;
          padding: 3px 11px;
          border-radius: 100px;
          background: #f0f3ff;
          border: 1px solid #dde3fc;
          font-size: 12px;
          font-weight: 500;
          color: #2940d3;
        }

        /* Course box */
        .course-box {
          background: #f8faff;
          border: 1px solid #e4ebfb;
          border-radius: 12px;
          padding: 16px 18px;
          margin-bottom: 20px;
        }
        .course-eyebrow {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #8a91c0;
          margin-bottom: 6px;
        }
        .course-title {
          font-size: 15.5px;
          font-weight: 600;
          color: #2940d3;
          margin-bottom: 8px;
          line-height: 1.3;
        }
        .course-desc {
          font-size: 13.5px;
          color: #525a82;
          line-height: 1.65;
          font-weight: 400;
        }

        /* Media grid */
        .media-grid {
          display: grid;
          gap: 14px;
        }
        .media-grid.two-col {
          grid-template-columns: 1fr 1fr;
        }
        .media-grid.one-col {
          grid-template-columns: 1fr;
        }
        .media-item {}
        .media-label {
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #8a91c0;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .media-icon { font-size: 12px; }
        .media-frame {
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid #e4e8f5;
          background: #f5f7ff;
        }
        .media-img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          display: block;
        }
        .media-iframe {
          width: 100%;
          height: 200px;
          border: none;
          display: block;
        }

        /* ── EMPTY STATE ── */
        .empty-state {
          text-align: center;
          padding: 64px 32px;
          background: #ffffff;
          border: 1.5px dashed #dde3fb;
          border-radius: 16px;
        }
        .empty-icon {
          font-size: 42px;
          margin-bottom: 12px;
        }
        .empty-state h3 {
          font-size: 18px;
          font-weight: 700;
          color: #0f1120;
          margin-bottom: 6px;
        }
        .empty-state p {
          font-size: 13.5px;
          color: #6b7499;
        }

        /* Skeleton */
        .skeleton-wrap {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .skeleton-card {
          background: #fff;
          border: 1px solid #e4e8f5;
          border-radius: 16px;
          padding: 24px 26px;
          overflow: hidden;
        }
        .skeleton-line {
          background: linear-gradient(90deg, #f0f2fa 25%, #e5e9f8 50%, #f0f2fa 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 6px;
          height: 14px;
          margin-bottom: 10px;
        }
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* Responsive */
        @media (max-width: 600px) {
          .hero { padding: 32px 18px 26px; }
          .card-body { padding: 18px 16px 16px; }
          .media-grid.two-col { grid-template-columns: 1fr; }
          .uni-name { font-size: 16px; }
        }
      `}</style>

      <div className="search-page">
        {/* ── HERO ── */}
        <header className="hero">
          <div className="hero-inner">
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-dot" />
              Search Results
            </div>
            <h1>Universities &amp; Courses</h1>
            <p className="hero-sub">
              Matched programs from your university database based on selected filters.
            </p>

            {/* Active filters */}
            {activeFilters.length > 0 && (
              <div className="filter-row">
                {activeFilters.map((f) => (
                  <span key={f.label} className="filter-pill">
                    <span className="filter-pill-label">{f.label}:</span>
                    {f.value}
                  </span>
                ))}
              </div>
            )}

            {/* Result count */}
            <div className="result-badge">
              <span className="result-badge-dot" />
              {loading ? "Searching…" : `${filtered.length} program${filtered.length !== 1 ? "s" : ""} found`}
            </div>
          </div>
        </header>

        {/* ── RESULTS ── */}
        <main className="content">
          {loading ? (
            <div className="skeleton-wrap">
              {[1, 2, 3].map((n) => (
                <div key={n} className="skeleton-card">
                  <div className="skeleton-line" style={{ width: "40%", height: 18 }} />
                  <div className="skeleton-line" style={{ width: "25%", height: 12 }} />
                  <div className="skeleton-line" style={{ width: "70%", height: 14, marginTop: 16 }} />
                  <div className="skeleton-line" style={{ width: "90%", height: 12 }} />
                  <div className="skeleton-line" style={{ width: "60%", height: 12 }} />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🎓</div>
              <h3>No programs found</h3>
              <p>Try adjusting your filters or search with a different keyword.</p>
            </div>
          ) : (
            filtered.map((item) => <UniCard key={item.id} item={item} />)
          )}
        </main>
      </div>
    </>
  );
}

/* ──────────────────────────────────────────────
   PAGE EXPORT
────────────────────────────────────────────── */
export default function UniversitySearchPage() {
  return (
    <Suspense
      fallback={
        <main
          style={{
            minHeight: "100vh",
            background: "#f5f7ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "system-ui, sans-serif",
            fontSize: 14,
            color: "#6b7499",
          }}
        >
          Loading search…
        </main>
      }
    >
      <UniversitySearchContent />
    </Suspense>
  );
}