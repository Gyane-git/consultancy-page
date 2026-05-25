"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Tab = "COURSES" | "UNIVERSITIES";
type UniversityItem = {
  name?: string | null;
  country?: string | null;
  courseName?: string | null;
};

interface DropdownProps {
  label: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  icon: React.ReactNode;
}

function Dropdown({ label, placeholder, options, value, onChange, icon }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(
    () =>
      search.trim()
        ? options.filter((o) => o.toLowerCase().includes(search.toLowerCase()))
        : options,
    [options, search]
  );

  useEffect(() => {
    if (open) {
      setSearch("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={containerRef} style={{ position: "relative", flex: 1, minWidth: 0, zIndex: 40 }}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          padding: "14px 18px",
          cursor: "pointer",
          userSelect: "none",
          display: "flex",
          flexDirection: "column",
          gap: 5,
          background: "transparent",
          border: "none",
          textAlign: "left",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            color: open ? "#c8102e" : "#9ca3af",
            display: "flex",
            alignItems: "center",
            gap: 5,
            transition: "color .15s",
          }}
        >
          {icon}
          {label}
        </span>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          <span
            style={{
              fontSize: 14,
              color: value ? "#1a1a2e" : "#b0b8c8",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontFamily: "'DM Sans',sans-serif",
              fontWeight: value ? 500 : 400,
            }}
          >
            {value || placeholder}
          </span>
          <svg
            style={{
              width: 14,
              height: 14,
              flexShrink: 0,
              color: "#c8102e",
              transition: "transform .2s",
              transform: open ? "rotate(180deg)" : "none",
            }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 10px)",
            left: 0,
            right: 0,
            background: "#fff",
            border: "1.5px solid rgba(200,16,46,.15)",
            borderRadius: 14,
            overflow: "hidden",
            zIndex: 300,
            boxShadow: "0 20px 60px rgba(0,0,0,.12), 0 4px 16px rgba(200,16,46,.08)",
            minWidth: 220,
          }}
        >
          {/* Search input inside dropdown */}
          <div
            style={{
              padding: "10px 14px",
              borderBottom: "1px solid #f0f0f5",
              background: "#fafafa",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "#fff",
                border: "1.5px solid #e8eaf0",
                borderRadius: 9,
                padding: "7px 11px",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                ref={inputRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Search ${label.replace(":", "")}...`}
                style={{
                  border: "none",
                  outline: "none",
                  fontSize: 13,
                  color: "#1a1a2e",
                  background: "transparent",
                  width: "100%",
                  fontFamily: "'DM Sans',sans-serif",
                }}
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#9ca3af",
                    padding: 0,
                    lineHeight: 1,
                    fontSize: 16,
                  }}
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Count badge */}
          {filtered.length > 0 && (
            <div
              style={{
                padding: "6px 14px 4px",
                fontSize: 10,
                color: "#9ca3af",
                fontWeight: 600,
                letterSpacing: "0.8px",
                textTransform: "uppercase",
                background: "#fafafa",
              }}
            >
              {filtered.length} option{filtered.length !== 1 ? "s" : ""}
            </div>
          )}

          {/* Scrollable list */}
          <div
            style={{
              maxHeight: 240,
              overflowY: "auto",
              overflowX: "hidden",
              scrollbarWidth: "thin",
              scrollbarColor: "#f0c0c8 transparent",
            }}
          >
            <style>{`
              .dd-list::-webkit-scrollbar { width: 4px; }
              .dd-list::-webkit-scrollbar-track { background: transparent; }
              .dd-list::-webkit-scrollbar-thumb { background: #f0c0c8; border-radius: 4px; }
              .dd-list::-webkit-scrollbar-thumb:hover { background: #c8102e; }
              .dd-item { padding: 10px 14px; font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: background .1s; border-bottom: 1px solid #f8f8fb; }
              .dd-item:last-child { border-bottom: none; }
              .dd-item:hover { background: #fff5f6; }
              .dd-item.selected { background: #fff0f2; color: #c8102e; font-weight: 600; }
            `}</style>

            <div className="dd-list" style={{ maxHeight: 240, overflowY: "auto" }}>
              {/* Clear option */}
              {value && (
                <div
                  className="dd-item"
                  onClick={() => { onChange(""); setOpen(false); }}
                  style={{ color: "#9ca3af", fontSize: 12 }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                  Clear selection
                </div>
              )}

              {filtered.length === 0 ? (
                <div
                  style={{
                    padding: "20px 14px",
                    textAlign: "center",
                    color: "#9ca3af",
                    fontSize: 13,
                    fontStyle: "italic",
                  }}
                >
                  No results found
                </div>
              ) : (
                filtered.map((opt) => (
                  <div
                    key={opt}
                    className={`dd-item${value === opt ? " selected" : ""}`}
                    onClick={() => { onChange(opt); setOpen(false); }}
                  >
                    {value === opt && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c8102e" strokeWidth="3">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    )}
                    <span style={{ color: value === opt ? "#c8102e" : "#374151", fontFamily: "'DM Sans',sans-serif" }}>
                      {opt}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Icons ────────────────────────────────────────────────────────────────────

const CourseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
  </svg>
);
const UniIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /><line x1="12" y1="12" x2="12" y2="16" /><line x1="10" y1="14" x2="14" y2="14" />
  </svg>
);
const CountryIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
  </svg>
);

// ── Main Component ───────────────────────────────────────────────────────────

export default function FindUni() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("COURSES");
  const [subject, setSubject] = useState("");
  const [courseType, setCourseType] = useState("");
  const [location, setLocation] = useState("");
  const [universities, setUniversities] = useState<UniversityItem[]>([]);

  useEffect(() => {
    let ignore = false;
    async function loadUniversities() {
      try {
        const res = await fetch("/api/university", { cache: "no-store" });
        const data = await res.json();
        if (!ignore && res.ok && data?.success && Array.isArray(data.universities)) {
          setUniversities(data.universities);
        }
      } catch (error) {
        console.error("Failed to load university filter options", error);
      }
    }
    loadUniversities();
    return () => { ignore = true; };
  }, []);

  const universityOptions = useMemo(
    () => Array.from(new Set(universities.map((u) => String(u.name || "").trim()).filter(Boolean))).sort(),
    [universities]
  );
  const courseOptions = useMemo(
    () => Array.from(new Set(universities.map((u) => String(u.courseName || "").trim()).filter(Boolean))).sort(),
    [universities]
  );
  const locationOptions = useMemo(
    () => Array.from(new Set(universities.map((u) => String(u.country || "").trim()).filter(Boolean))).sort(),
    [universities]
  );

  const firstOptions  = tab === "COURSES" ? courseOptions     : universityOptions;
  const secondOptions = tab === "COURSES" ? universityOptions : courseOptions;

  function handleSearch() {
    const params = new URLSearchParams();
    if (tab === "COURSES") {
      if (subject)    params.set("course",     subject);
      if (courseType) params.set("university", courseType);
    } else {
      if (subject)    params.set("university", subject);
      if (courseType) params.set("course",     courseType);
    }
    if (location) params.set("country", location);
    router.push(`/universities/search?${params.toString()}`);
  }

  const stats = [
    { value: "250+", label: "Partner Universities" },
    { value: "40+",  label: "Countries"            },
    { value: "10K+", label: "Students Placed"      },
    { value: "98%",  label: "Visa Success"          },
  ];

  const activeFilters = [subject, courseType, location].filter(Boolean).length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,800&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        @keyframes slideUp   { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }
        @keyframes blobMove  { 0%,100% { transform:translate(0,0) scale(1) } 50% { transform:translate(30px,-20px) scale(1.06) } }
        @keyframes pulse     { 0%,100% { opacity:1; transform:scale(1) } 50% { opacity:.35; transform:scale(1.4) } }
        @keyframes shimmer   { from { background-position: -200% 0 } to { background-position: 200% 0 } }

        .find-hero {
          position: relative; width: 100%;
          padding: 80px 24px 90px;
          background: linear-gradient(175deg, #f9f7ff 0%, #ffffff 45%, #fff5f6 100%);
          overflow: hidden; font-family: 'DM Sans', sans-serif; text-align: center;
        }
        .find-blob1 { position:absolute; top:-80px; left:-60px; width:400px; height:400px; border-radius:50%; background:radial-gradient(circle,rgba(200,16,46,.06) 0%,transparent 70%); animation:blobMove 9s ease-in-out infinite; pointer-events:none; }
        .find-blob2 { position:absolute; bottom:-80px; right:-60px; width:480px; height:480px; border-radius:50%; background:radial-gradient(circle,rgba(167,139,250,.06) 0%,transparent 70%); animation:blobMove 11s ease-in-out infinite reverse; pointer-events:none; }

        .find-inner { position:relative; z-index:2; max-width:860px; margin:0 auto; }

        .find-eyebrow {
          display:inline-flex; align-items:center; gap:8px;
          font-size:11px; font-weight:700; letter-spacing:.2em; text-transform:uppercase;
          color:#c8102e; background:linear-gradient(135deg,#fff0f2,#fce7ea);
          border:1px solid rgba(200,16,46,.18); padding:6px 18px; border-radius:50px;
          margin-bottom:20px; animation:slideUp .5s ease both;
        }
        .find-eyebrow-dot { width:6px; height:6px; border-radius:50%; background:#c8102e; animation:pulse 2s infinite; }

        .find-h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.9rem, 4.5vw, 3.4rem); font-weight:800; color:#1a1a2e;
          line-height:1.1; letter-spacing:-1px; margin-bottom:14px;
          animation: slideUp .55s .05s ease both;
        }
        .find-h1 em { font-style:italic; color:#c8102e; }

        .find-sub {
          font-size:1rem; color:#6b7280; max-width:480px; margin:0 auto 36px;
          line-height:1.75; font-weight:400; animation:slideUp .55s .1s ease both;
        }

        .find-stats { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; margin-bottom:44px; animation:slideUp .55s .12s ease both; }
        .find-stat-pill {
          background:#fff; border:1px solid #ebebf0; border-radius:50px;
          padding:10px 22px; display:flex; align-items:baseline; gap:8px;
          box-shadow:0 2px 10px rgba(0,0,0,.04);
          transition: border-color .2s, box-shadow .2s;
        }
        .find-stat-pill:hover { border-color: rgba(200,16,46,.25); box-shadow: 0 4px 16px rgba(200,16,46,.08); }

        .find-tab-row { display:flex; align-items:center; justify-content:center; gap:8px; margin-bottom:16px; animation:slideUp .55s .14s ease both; }
        .find-tab-btn {
          padding:9px 22px; border-radius:8px; border:1.5px solid #e2e8f0;
          background:transparent; color:#6b7280; font-family:'DM Sans',sans-serif;
          font-size:11px; font-weight:700; letter-spacing:1.4px; text-transform:uppercase;
          cursor:pointer; transition:all .2s;
        }
        .find-tab-btn:hover { border-color:#c8102e; color:#c8102e; }
        .find-tab-btn.active { background:#c8102e; border-color:#c8102e; color:#fff; box-shadow: 0 4px 14px rgba(200,16,46,.3); }

        /* Search bar */
        .find-search {
          display:flex; align-items:stretch;
          border:1.5px solid #e8eaf0; border-radius:16px;
          background:#fff;
          box-shadow: 0 4px 24px rgba(0,0,0,.06), 0 0 0 5px rgba(200,16,46,.04);
          min-height:82px; position:relative; text-align:left;
          animation:slideUp .55s .18s ease both;
          transition:border-color .2s, box-shadow .2s;
        }
        .find-search:focus-within {
          border-color:rgba(200,16,46,.3);
          box-shadow: 0 4px 24px rgba(0,0,0,.07), 0 0 0 5px rgba(200,16,46,.07);
        }

        .find-divider { width:1px; background:#f0f0f5; flex-shrink:0; margin:14px 0; }

        .find-search-btn {
          width:82px; flex-shrink:0;
          background:linear-gradient(135deg,#c8102e,#9b0c22);
          border:none; border-radius:0 14px 14px 0; cursor:pointer;
          display:flex; align-items:center; justify-content:center; flex-direction: column; gap: 4px;
          color:#fff; transition:filter .2s, transform .15s;
          font-size: 10px; font-weight: 700; letter-spacing: 0.8px; font-family: 'DM Sans', sans-serif;
        }
        .find-search-btn:hover { filter:brightness(1.1); }
        .find-search-btn:active { transform:scale(.96); }

        /* Active filter chips */
        .filter-chips { display:flex; gap:8px; flex-wrap:wrap; justify-content:center; margin-top:14px; animation:slideUp .55s .2s ease both; min-height: 28px; }
        .filter-chip {
          display:inline-flex; align-items:center; gap:6px;
          background: #fff0f2; border:1px solid rgba(200,16,46,.2); border-radius:50px;
          padding:4px 12px 4px 10px; font-size:11px; color:#c8102e; font-weight:600;
          font-family:'DM Sans',sans-serif;
        }
        .chip-remove { background:none; border:none; cursor:pointer; color:#c8102e; padding:0; line-height:1; font-size:14px; display:flex; align-items:center; }
        .chip-remove:hover { opacity:.6; }

        @media(max-width:680px){
          .find-hero { padding:56px 16px 64px; }
          .find-search { flex-direction:column; min-height:auto; }
          .find-divider { width:auto; height:1px; margin:0 14px; }
          .find-search-btn { width:100%; height:54px; border-radius:0 0 14px 14px; flex-direction:row; gap:8px; }
        }
      `}</style>

      <section className="find-hero">
        <div className="find-blob1" />
        <div className="find-blob2" />

        <div className="find-inner">

          {/* Eyebrow */}
          <div className="find-eyebrow">
            <span className="find-eyebrow-dot" />
            Study Abroad Finder
          </div>

          {/* Headline */}
          <h1 className="find-h1">
            Find your best-fit<br /><em>university</em> and course
          </h1>
          <p className="find-sub">
            Search thousands of courses across 250+ partner universities worldwide and find the perfect match for your goals.
          </p>

          {/* Stats */}
          <div className="find-stats">
            {stats.map((s) => (
              <div key={s.label} className="find-stat-pill">
                <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "#c8102e" }}>{s.value}</span>
                <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>{s.label}</span>
              </div>
            ))}
          </div>

          {/* Tab toggle */}
          <div className="find-tab-row">
            {(["COURSES", "UNIVERSITIES"] as Tab[]).map((t) => (
              <button
                key={t}
                className={`find-tab-btn${tab === t ? " active" : ""}`}
                onClick={() => {
                  setTab(t);
                  setSubject("");
                  setCourseType("");
                  setLocation("");
                }}
              >
                {t.charAt(0) + t.slice(1).toLowerCase()}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="find-search">
            <Dropdown
              label={tab === "COURSES" ? "Course:" : "University:"}
              placeholder={tab === "COURSES" ? "Select a course" : "Select a university"}
              options={firstOptions}
              value={subject}
              onChange={setSubject}
              icon={tab === "COURSES" ? <CourseIcon /> : <UniIcon />}
            />
            <div className="find-divider" />
            <Dropdown
              label={tab === "COURSES" ? "University:" : "Course:"}
              placeholder={tab === "COURSES" ? "Select a university" : "Select a course"}
              options={secondOptions}
              value={courseType}
              onChange={setCourseType}
              icon={tab === "COURSES" ? <UniIcon /> : <CourseIcon />}
            />
            <div className="find-divider" />
            <Dropdown
              label="Country:"
              placeholder="Select a country"
              options={locationOptions}
              value={location}
              onChange={setLocation}
              icon={<CountryIcon />}
            />

            <button
              className="find-search-btn"
              aria-label="Search"
              onClick={handleSearch}
              type="button"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <span>Search</span>
            </button>
          </div>

          {/* Active filter chips */}
          <div className="filter-chips">
            {subject && (
              <div className="filter-chip">
                {tab === "COURSES" ? <CourseIcon /> : <UniIcon />}
                {subject}
                <button className="chip-remove" onClick={() => setSubject("")} aria-label="Remove filter">×</button>
              </div>
            )}
            {courseType && (
              <div className="filter-chip">
                {tab === "COURSES" ? <UniIcon /> : <CourseIcon />}
                {courseType}
                <button className="chip-remove" onClick={() => setCourseType("")} aria-label="Remove filter">×</button>
              </div>
            )}
            {location && (
              <div className="filter-chip">
                <CountryIcon />
                {location}
                <button className="chip-remove" onClick={() => setLocation("")} aria-label="Remove filter">×</button>
              </div>
            )}
            {activeFilters > 1 && (
              <button
                type="button"
                onClick={() => { setSubject(""); setCourseType(""); setLocation(""); }}
                style={{
                  background: "none", border: "1px solid #e2e8f0", borderRadius: 50,
                  padding: "4px 12px", fontSize: 11, color: "#9ca3af", cursor: "pointer",
                  fontFamily: "'DM Sans',sans-serif", fontWeight: 600, transition: "all .15s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#c8102e"; e.currentTarget.style.color = "#c8102e"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.color = "#9ca3af"; }}
              >
                Clear all
              </button>
            )}
          </div>

        </div>
      </section>
    </>
  );
}