"use client";

import { useEffect, useState } from "react";

type Destination = {
  id: number;
  slug: string;
  name: string;
  shortText?: string | null;
  longText?: string | null;
};

const LOGO_COLORS = ["#e8352a", "#e8922a", "#1a9e5c", "#1a90c8"];

function SkeletonLoader() {
  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% { background-position: -600px 0; }
          100% { background-position: 600px 0; }
        }
        .sk-pulse {
          background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%);
          background-size: 600px 100%;
          animation: shimmer 1.4s infinite;
          border-radius: 8px;
        }
      `}</style>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "64px 32px" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 32 }}>
          {LOGO_COLORS.map((c) => (
            <div key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c, opacity: 0.4 }} />
          ))}
        </div>
        <div className="sk-pulse" style={{ height: 48, width: "60%", margin: "0 auto 16px" }} />
        <div className="sk-pulse" style={{ height: 18, width: "40%", margin: "0 auto 8px" }} />
        <div className="sk-pulse" style={{ height: 18, width: "30%", margin: "0 auto 48px" }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 32 }}>
          {[1,2,3,4].map(i => <div key={i} className="sk-pulse" style={{ height: 80, borderRadius: 12 }} />)}
        </div>
        <div className="sk-pulse" style={{ height: 240, borderRadius: 16 }} />
      </div>
    </>
  );
}

const destinationMeta: Record<string, { flag: string; continent: string; currency: string; language: string; highlights: string[] }> = {
  australia: {
    flag: "🇦🇺", continent: "Oceania", currency: "AUD", language: "English",
    highlights: ["Post-Study Work Visa", "Top QS Universities", "Multicultural Cities", "High Graduate Salaries"],
  },
  uk: {
    flag: "🇬🇧", continent: "Europe", currency: "GBP", language: "English",
    highlights: ["Graduate Route Visa", "World-Class Institutions", "Rich Cultural Heritage", "Global Recognition"],
  },
  usa: {
    flag: "🇺🇸", continent: "North America", currency: "USD", language: "English",
    highlights: ["OPT Work Authorization", "Ivy League Universities", "Diverse Campus Life", "Innovation Hub"],
  },
  canada: {
    flag: "🇨🇦", continent: "North America", currency: "CAD", language: "English / French",
    highlights: ["PGWP Work Permit", "Affordable Education", "PR Pathway", "Safe & Welcoming"],
  },
  denmark: {
    flag: "🇩🇰", continent: "Europe", currency: "DKK", language: "Danish / English",
    highlights: ["Free Education (EU/EEA)", "Work-Life Balance", "Innovation Culture", "Safe Environment"],
  },
};

const defaultMeta = {
  flag: "🌍", continent: "International", currency: "—", language: "Varies",
  highlights: ["Expert Counselling", "Visa Guidance", "University Applications", "Career Support"],
};

export default function DestinationDetailPage({ slug }: { slug: string }) {
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    async function loadDestination() {
      try {
        const res = await fetch(`/api/destination?slug=${encodeURIComponent(slug)}`, { cache: "no-store" });
        const data = await res.json();
        if (!ignore && data?.success) setDestination(data.destination ?? null);
      } catch (error) {
        console.error("Failed to load destination", error);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    loadDestination();
    return () => { ignore = true; };
  }, [slug]);

  if (loading) return <SkeletonLoader />;

  const name = destination?.name ?? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const shortText = destination?.shortText ?? "Destination details will be available soon.";
  const longText = destination?.longText ?? "Our counsellors can help you evaluate the best-fit universities, budget, scholarship options, and visa path for this destination.";
  const meta = destinationMeta[slug.toLowerCase()] ?? defaultMeta;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .dd-root {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: #f7f8fa;
          min-height: 100vh;
          color: #1a1a1a;
        }

        /* TOPBAR */
        .dd-topbar {
          background: #fff;
          border-bottom: 1px solid #ebebeb;
          padding: 0 48px; height: 56px;
          display: flex; align-items: center; gap: 8px;
        }
        .dd-dot { width: 8px; height: 8px; border-radius: 50%; }
        .dd-brand { font-size: 0.88rem; font-weight: 700; color: #111; margin-left: 4px; }
        .dd-sep { width: 1px; height: 14px; background: #e5e5e5; margin: 0 10px; }
        .dd-crumb-link {
          font-size: 0.75rem; color: #bbb; text-decoration: none;
          transition: color 0.15s; font-weight: 400;
        }
        .dd-crumb-link:hover { color: #e8352a; }
        .dd-crumb-arrow { font-size: 0.65rem; color: #ddd; margin: 0 4px; }
        .dd-crumb-current { font-size: 0.75rem; color: #555; font-weight: 500; }

        /* HERO */
        .dd-hero {
          background: #fff;
          border-bottom: 1px solid #ebebeb;
          position: relative; overflow: hidden;
          padding: 60px 48px 0;
        }
        .dd-hero-geo {
          position: absolute; top: -60px; right: -60px;
          width: 360px; height: 360px; border-radius: 50%;
          border: 1px solid #f0f0f0; pointer-events: none;
        }
        .dd-hero-geo2 {
          position: absolute; top: -30px; right: -30px;
          width: 240px; height: 240px; border-radius: 50%;
          border: 1px solid #f0f0f0; pointer-events: none;
        }
        .dd-hero-inner {
          max-width: 860px; margin: 0 auto;
          position: relative; z-index: 1;
        }

        /* BREADCRUMB */
        .dd-breadcrumb {
          display: flex; align-items: center; gap: 4px;
          margin-bottom: 28px;
        }

        /* FLAG + TITLE */
        .dd-flag-row {
          display: flex; align-items: center; gap: 16px;
          margin-bottom: 16px;
        }
        .dd-flag {
          font-size: 3rem; line-height: 1;
          filter: drop-shadow(0 2px 8px rgba(0,0,0,0.1));
        }
        .dd-title-wrap {}
        .dd-eyebrow {
          font-size: 0.65rem; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: #e8352a; margin-bottom: 4px;
          display: flex; align-items: center; gap: 7px;
        }
        .dd-eyebrow-line { width: 18px; height: 1.5px; background: #e8352a; border-radius: 1px; }
        .dd-hero-title {
          font-family: 'Fraunces', serif;
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-weight: 700; color: #111;
          letter-spacing: -0.025em; line-height: 1.1;
        }
        .dd-hero-title em { font-style: italic; color: #e8352a; }
        .dd-hero-short {
          font-size: 0.95rem; color: #888;
          line-height: 1.75; max-width: 560px;
          margin-top: 12px; font-weight: 300;
        }

        /* META CHIPS */
        .dd-meta-row {
          display: flex; gap: 12px; margin: 28px 0 0;
          flex-wrap: wrap;
        }
        .dd-meta-chip {
          display: flex; align-items: center; gap: 8px;
          background: #f7f8fa; border: 1px solid #ebebeb;
          border-radius: 100px; padding: 6px 16px;
          font-size: 0.75rem; font-weight: 500; color: #666;
        }
        .dd-meta-chip-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }

        /* COLOR STRIP */
        .dd-color-strip {
          display: flex; margin-top: 40px;
          height: 4px; border-radius: 2px; overflow: hidden;
          gap: 2px;
        }
        .dd-color-strip-seg { flex: 1; }

        /* HIGHLIGHTS */
        .dd-highlights {
          max-width: 860px; margin: 32px auto 0;
          padding: 0 48px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }
        .dd-hl-card {
          background: #fff; border: 1px solid #ebebeb;
          border-radius: 12px; padding: 18px 16px;
          transition: box-shadow 0.2s, transform 0.2s;
          position: relative; overflow: hidden;
        }
        .dd-hl-card:hover { box-shadow: 0 6px 20px rgba(0,0,0,0.07); transform: translateY(-2px); }
        .dd-hl-card-bar {
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
        }
        .dd-hl-icon {
          width: 36px; height: 36px; border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 10px;
        }
        .dd-hl-text {
          font-size: 0.78rem; font-weight: 600;
          color: #333; line-height: 1.4;
        }

        /* MAIN CONTENT */
        .dd-main {
          max-width: 860px; margin: 32px auto 0;
          padding: 0 48px 80px;
          display: grid;
          grid-template-columns: 1fr 220px;
          gap: 24px;
          align-items: start;
        }

        /* ARTICLE */
        .dd-article {}
        .dd-article-card {
          background: #fff; border: 1px solid #ebebeb;
          border-radius: 16px; overflow: hidden;
        }
        .dd-article-card-header {
          padding: 20px 28px 16px;
          border-bottom: 1px solid #f5f5f5;
          display: flex; align-items: center; gap: 12px;
        }
        .dd-article-card-icon {
          width: 36px; height: 36px; border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          background: #fff0ef; color: #e8352a; flex-shrink: 0;
        }
        .dd-article-card-label {
          font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase; color: #bbb;
        }
        .dd-article-card-title {
          font-size: 0.9rem; font-weight: 600; color: #111; margin-top: 1px;
        }
        .dd-article-body {
          padding: 24px 28px 28px;
          font-size: 0.9rem; color: #666;
          line-height: 1.85; font-weight: 300;
          white-space: pre-line;
        }

        /* SIDEBAR */
        .dd-sidebar {}
        .dd-sidebar-card {
          background: #fff; border: 1px solid #ebebeb;
          border-radius: 12px; padding: 20px;
          margin-bottom: 14px;
        }
        .dd-sidebar-label {
          font-size: 0.62rem; font-weight: 700;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: #bbb; margin-bottom: 14px;
        }
        .dd-sidebar-row {
          display: flex; align-items: center;
          justify-content: space-between; gap: 8px;
          padding: 8px 0; border-bottom: 1px solid #f5f5f5;
          font-size: 0.78rem;
        }
        .dd-sidebar-row:last-child { border-bottom: none; padding-bottom: 0; }
        .dd-sidebar-row-key { color: #aaa; font-weight: 400; }
        .dd-sidebar-row-val { color: #333; font-weight: 600; text-align: right; }

        /* CTA CARD */
        .dd-cta-card {
          background: #111; border-radius: 12px;
          padding: 24px 20px; position: relative; overflow: hidden;
          margin-bottom: 14px;
        }
        .dd-cta-card::before {
          content: '';
          position: absolute; top: -60px; right: -60px;
          width: 160px; height: 160px; border-radius: 50%;
          background: radial-gradient(circle, rgba(232,53,42,0.3), transparent 70%);
          pointer-events: none;
        }
        .dd-cta-card::after {
          content: '';
          position: absolute; bottom: -40px; left: -20px;
          width: 100px; height: 100px; border-radius: 50%;
          background: radial-gradient(circle, rgba(26,144,200,0.2), transparent 70%);
          pointer-events: none;
        }
        .dd-cta-title {
          font-family: 'Fraunces', serif;
          font-size: 1.1rem; font-weight: 700;
          color: #fff; margin-bottom: 6px; position: relative; line-height: 1.25;
        }
        .dd-cta-sub {
          font-size: 0.75rem; color: rgba(255,255,255,0.45);
          line-height: 1.6; margin-bottom: 16px; position: relative;
        }
        .dd-cta-btn {
          display: block; width: 100%;
          background: #e8352a; color: #fff; border: none;
          border-radius: 8px; font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.78rem; font-weight: 700;
          padding: 12px 16px; cursor: pointer;
          text-decoration: none; text-align: center;
          transition: background 0.18s; position: relative;
        }
        .dd-cta-btn:hover { background: #c8281e; }
        .dd-cta-btn-sec {
          display: block; width: 100%;
          background: rgba(255,255,255,0.07);
          color: rgba(255,255,255,0.5);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px; font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.78rem; font-weight: 400;
          padding: 10px 16px; cursor: pointer;
          text-decoration: none; text-align: center;
          transition: background 0.18s, color 0.18s;
          margin-top: 8px; position: relative;
        }
        .dd-cta-btn-sec:hover { background: rgba(255,255,255,0.12); color: #fff; }

        /* DOTS */
        .dd-dots-strip {
          display: flex; justify-content: center; gap: 8px;
          padding: 8px 0;
        }

        @media (max-width: 780px) {
          .dd-highlights { grid-template-columns: repeat(2, 1fr); padding: 0 20px; }
          .dd-main { grid-template-columns: 1fr; padding: 0 20px 60px; }
          .dd-hero { padding: 40px 20px 0; }
          .dd-topbar { padding: 0 20px; }
          .dd-sidebar { display: none; }
        }
      `}</style>

      <div className="dd-root">

        {/* TOPBAR */}
        <div className="dd-topbar">
          {LOGO_COLORS.map((c) => <div key={c} className="dd-dot" style={{ background: c }} />)}
          <span className="dd-brand">Study Sync</span>
          <div className="dd-sep" />
          <a href="/" className="dd-crumb-link">Home</a>
          <span className="dd-crumb-arrow">›</span>
          <a href="/destinations" className="dd-crumb-link">Destinations</a>
          <span className="dd-crumb-arrow">›</span>
          <span className="dd-crumb-current">{name}</span>
        </div>

        {/* HERO */}
        <div className="dd-hero">
          <div className="dd-hero-geo" />
          <div className="dd-hero-geo2" />
          <div className="dd-hero-inner">

            <div className="dd-flag-row">
              <div className="dd-flag">{meta.flag}</div>
              <div className="dd-title-wrap">
                <div className="dd-eyebrow">
                  <div className="dd-eyebrow-line" />
                  Study Destination
                </div>
                <h1 className="dd-hero-title">
                  Study in <em>{name}</em>
                </h1>
              </div>
            </div>

            <p className="dd-hero-short">{shortText}</p>

            <div className="dd-meta-row">
              {[
                { label: "Continent", val: meta.continent, color: "#e8352a" },
                { label: "Currency", val: meta.currency, color: "#e8922a" },
                { label: "Language", val: meta.language, color: "#1a9e5c" },
              ].map((m) => (
                <div key={m.label} className="dd-meta-chip">
                  <div className="dd-meta-chip-dot" style={{ background: m.color }} />
                  <span style={{ color: "#aaa", fontWeight: 400 }}>{m.label}:</span>
                  <span style={{ color: "#333", fontWeight: 600 }}>{m.val}</span>
                </div>
              ))}
            </div>

            <div className="dd-color-strip">
              {LOGO_COLORS.map((c) => (
                <div key={c} className="dd-color-strip-seg" style={{ background: c }} />
              ))}
            </div>
          </div>
        </div>

        {/* HIGHLIGHTS */}
        <div className="dd-highlights">
          {meta.highlights.map((h, i) => {
            const color = LOGO_COLORS[i % LOGO_COLORS.length];
            const icons = [
              <svg key="0" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>,
              <svg key="1" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 3.741-3.342" /></svg>,
              <svg key="2" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" /></svg>,
              <svg key="3" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" /></svg>,
            ];
            return (
              <div key={h} className="dd-hl-card">
                <div className="dd-hl-card-bar" style={{ background: color }} />
                <div className="dd-hl-icon" style={{ background: color + "15", color }}>
                  {icons[i % 4]}
                </div>
                <div className="dd-hl-text">{h}</div>
              </div>
            );
          })}
        </div>

        {/* MAIN */}
        <div className="dd-main">

          {/* ARTICLE */}
          <div className="dd-article">
            <div className="dd-article-card">
              <div className="dd-article-card-header">
                <div className="dd-article-card-icon">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                  </svg>
                </div>
                <div>
                  <div className="dd-article-card-label">Destination Guide</div>
                  <div className="dd-article-card-title">Study in {name} — Full Overview</div>
                </div>
              </div>
              <div className="dd-article-body">{longText}</div>
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="dd-sidebar">
            <div className="dd-cta-card">
              <div className="dd-cta-title">Ready to Study<br />in {name}?</div>
              <p className="dd-cta-sub">Our expert counsellors will guide you through every step of the journey.</p>
              <a href="/contact" className="dd-cta-btn">Book Free Consultation</a>
              <a href="/services" className="dd-cta-btn-sec">Explore Our Services →</a>
            </div>

            <div className="dd-sidebar-card">
              <div className="dd-sidebar-label">Quick Facts</div>
              {[
                { key: "Continent", val: meta.continent, color: "#e8352a" },
                { key: "Currency", val: meta.currency, color: "#e8922a" },
                { key: "Language", val: meta.language, color: "#1a9e5c" },
                { key: "Visa Support", val: "✓ Available", color: "#1a90c8" },
              ].map((r) => (
                <div key={r.key} className="dd-sidebar-row">
                  <span className="dd-sidebar-row-key">{r.key}</span>
                  <span className="dd-sidebar-row-val" style={{ color: r.color }}>{r.val}</span>
                </div>
              ))}
            </div>

            <div className="dd-sidebar-card">
              <div className="dd-sidebar-label">Other Destinations</div>
              {["UK", "USA", "Australia", "Canada", "Denmark"]
                .filter((d) => d.toLowerCase() !== slug.toLowerCase())
                .slice(0, 4)
                .map((d, i) => (
                  <a
                    key={d}
                    href={`/destinations/${d.toLowerCase()}`}
                    style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "8px 0", borderBottom: i < 3 ? "1px solid #f5f5f5" : "none",
                      textDecoration: "none", transition: "opacity 0.15s",
                    }}
                    onMouseOver={(e) => e.currentTarget.style.opacity = "0.7"}
                    onMouseOut={(e) => e.currentTarget.style.opacity = "1"}
                  >
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: LOGO_COLORS[i % 4], flexShrink: 0 }} />
                    <span style={{ fontSize: "0.8rem", fontWeight: 500, color: "#444" }}>{d}</span>
                    <span style={{ marginLeft: "auto", fontSize: "0.68rem", color: "#bbb" }}>→</span>
                  </a>
                ))}
            </div>

            <div className="dd-dots-strip">
              {LOGO_COLORS.map((c) => (
                <div key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
              ))}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}