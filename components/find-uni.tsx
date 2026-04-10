"use client";
import { useState } from "react";

const subjects = [
  "Computer Science",
  "Business & Management",
  "Medicine & Health",
  "Engineering",
  "Law",
  "Arts & Design",
  "Psychology",
  "Architecture",
  "Economics",
  "Education",
];

const courseTypes = [
  "Undergraduate (Bachelor's)",
  "Postgraduate (Master's)",
  "PhD / Doctorate",
  "Foundation Year",
  "Diploma / Certificate",
  "Online / Distance Learning",
  "Part-time",
];

const locations = [
  "United Kingdom",
  "United States",
  "Australia",
  "Canada",
  "Germany",
  "Netherlands",
  "New Zealand",
  "Ireland",
  "Singapore",
  "UAE",
];

type Tab = "COURSES" | "UNIVERSITIES";

interface SelectDropdownProps {
  label: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}

function SelectDropdown({ label, placeholder, options, value, onChange }: SelectDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="select-wrap" style={{ position: "relative", flex: 1 }}>
      <style>{`
        .select-wrap { min-width: 0; }
        .select-inner {
          padding: 14px 20px;
          cursor: pointer;
          user-select: none;
          display: flex;
          flex-direction: column;
          gap: 4px;
          height: 100%;
          justify-content: center;
        }
        .select-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
        }
        .select-value-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }
        .select-value {
          font-size: 14px;
          color: ${value ? "#fff" : "rgba(255,255,255,0.5)"};
          font-family: 'DM Sans', sans-serif;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .chevron {
          width: 16px;
          height: 16px;
          color: rgba(255,255,255,0.5);
          flex-shrink: 0;
          transition: transform 0.2s;
        }
        .chevron.open { transform: rotate(180deg); }
        .dropdown-list {
          position: absolute;
          top: calc(100% + 6px);
          left: 0;
          right: 0;
          background: #1a1d2e;
          border: 1px solid rgba(232,64,92,0.3);
          border-radius: 10px;
          overflow: hidden;
          z-index: 100;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
          animation: dropIn 0.18s ease;
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .dropdown-item {
          padding: 11px 20px;
          font-size: 13.5px;
          color: rgba(255,255,255,0.75);
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
          font-family: 'DM Sans', sans-serif;
        }
        .dropdown-item:hover {
          background: rgba(232,64,92,0.12);
          color: #fff;
        }
        .dropdown-item.selected {
          color: #e8405c;
          font-weight: 600;
        }
      `}</style>
      <div className="select-inner" onClick={() => setOpen((o) => !o)}>
        <span className="select-label">{label}</span>
        <div className="select-value-row">
          <span className="select-value">{value || placeholder}</span>
          <svg className={`chevron ${open ? "open" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>
      {open && (
        <>
          <div style={{ position: "fixed", inset: 0, zIndex: 99 }} onClick={() => setOpen(false)} />
          <div className="dropdown-list">
            {options.map((opt) => (
              <div
                key={opt}
                className={`dropdown-item ${value === opt ? "selected" : ""}`}
                onClick={() => { onChange(opt); setOpen(false); }}
              >
                {opt}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function FindUni() {
  const [activeTab, setActiveTab] = useState<Tab>("COURSES");
  const [subject, setSubject] = useState("");
  const [courseType, setCourseType] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    console.log({ activeTab, subject, courseType, location });
    // wire up your search/router logic here
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        .hero-banner {
          position: relative;
          background: #0d0f1c;
          min-height: 340px;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding: 60px 64px;
          font-family: 'DM Sans', sans-serif;
        }

        /* ——— DECORATIVE ZIGZAG RIGHT ——— */
        .deco-right {
          position: absolute;
          right: -10px;
          top: 0;
          bottom: 0;
          width: 320px;
          pointer-events: none;
          overflow: hidden;
        }
        .zigzag-svg {
          width: 100%;
          height: 100%;
        }

        /* ——— GLOW ——— */
        .hero-glow {
          position: absolute;
          top: -80px;
          left: -80px;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(232,64,92,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        /* ——— CONTENT ——— */
        .hero-content {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 900px;
        }

        /* ——— HEADLINE ——— */
        .hero-headline {
          font-family: 'Playfair Display', serif;
          font-size: clamp(32px, 5vw, 58px);
          font-weight: 800;
          color: #ffffff;
          line-height: 1.12;
          letter-spacing: -1.5px;
          margin-bottom: 32px;
          animation: slideUp 0.6s ease both;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ——— TAB ROW ——— */
        .tab-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
          flex-wrap: wrap;
          gap: 12px;
          animation: slideUp 0.6s 0.1s ease both;
        }
        .tabs {
          display: flex;
          gap: 8px;
        }
        .tab-btn {
          padding: 9px 22px;
          border-radius: 8px;
          border: 1.5px solid rgba(255,255,255,0.25);
          background: transparent;
          color: rgba(255,255,255,0.6);
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.22s;
        }
        .tab-btn:hover {
          border-color: rgba(255,255,255,0.5);
          color: #fff;
        }
        .tab-btn.active {
          background: #fff;
          border-color: #fff;
          color: #0d0f1c;
        }
        .download-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 9px 22px;
          border-radius: 8px;
          border: 1.5px solid rgba(255,255,255,0.25);
          background: transparent;
          color: rgba(255,255,255,0.75);
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.22s;
        }
        .download-btn:hover {
          border-color: #e8405c;
          color: #e8405c;
        }
        .download-btn svg { width: 14px; height: 14px; }

        /* ——— SEARCH BAR ——— */
        .search-bar {
          display: flex;
          align-items: stretch;
          border: 1.5px solid #e8405c;
          border-radius: 12px;
          overflow: visible;
          background: rgba(255,255,255,0.04);
          animation: slideUp 0.6s 0.2s ease both;
          min-height: 76px;
          position: relative;
        }
        .search-divider {
          width: 1px;
          background: rgba(255,255,255,0.1);
          flex-shrink: 0;
          margin: 12px 0;
        }
        .search-btn {
          width: 76px;
          flex-shrink: 0;
          background: #e8405c;
          border: none;
          border-radius: 0 10px 10px 0;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          transition: background 0.2s, transform 0.15s;
        }
        .search-btn:hover { background: #c72e48; }
        .search-btn:active { transform: scale(0.96); }
        .search-btn svg { width: 24px; height: 24px; }

        /* ——— RESPONSIVE ——— */
        @media (max-width: 768px) {
          .hero-banner { padding: 48px 24px; min-height: auto; }
          .search-bar { flex-direction: column; min-height: auto; }
          .search-divider { width: auto; height: 1px; margin: 0 12px; }
          .search-btn { width: 100%; height: 56px; border-radius: 0 0 10px 10px; }
          .deco-right { display: none; }
          .tab-row { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <section className="hero-banner">
        <div className="hero-glow" />

        {/* Decorative zigzag right */}
        <div className="deco-right">
          <svg className="zigzag-svg" viewBox="0 0 320 340" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMaxYMid slice">
            {/* Pink filled zigzag */}
            <path
              d="M320 0 L220 55 L320 110 L220 165 L320 220 L220 275 L320 340 L320 0Z"
              fill="#e879b0"
              opacity="0.9"
            />
            {/* Dark overlay chevrons */}
            <path d="M320 0 L240 50 L320 100" fill="#0d0f1c" opacity="0.85" />
            <path d="M320 110 L240 160 L320 210" fill="#0d0f1c" opacity="0.85" />
            <path d="M320 220 L240 270 L320 340" fill="#0d0f1c" opacity="0.85" />
            {/* Outline-only zigzag behind */}
            <path
              d="M290 -10 L190 55 L290 120 L190 185 L290 250 L190 315 L290 380"
              fill="none"
              stroke="rgba(232,121,176,0.35)"
              strokeWidth="1.5"
            />
            <path
              d="M260 -10 L160 55 L260 120 L160 185 L260 250 L160 315 L260 380"
              fill="none"
              stroke="rgba(232,121,176,0.18)"
              strokeWidth="1"
            />
          </svg>
        </div>

        <div className="hero-content">
          <h1 className="hero-headline">
            Find your best-fit university<br />and course
          </h1>

          {/* Tab row */}
          <div className="tab-row">
            <div className="tabs">
              {(["COURSES", "UNIVERSITIES"] as Tab[]).map((tab) => (
                <button
                  key={tab}
                  className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <button className="download-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 3v13M7 11l5 5 5-5M5 20h14" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Download Education Guide
            </button>
          </div>

          {/* Search bar */}
          <div className="search-bar">
            <SelectDropdown
              label="I'm looking for:"
              placeholder="Enter subject or course"
              options={subjects}
              value={subject}
              onChange={setSubject}
            />
            <div className="search-divider" />
            <SelectDropdown
              label="I'm planning to study:"
              placeholder="Select course type"
              options={courseTypes}
              value={courseType}
              onChange={setCourseType}
            />
            <div className="search-divider" />
            <SelectDropdown
              label="I want to study in:"
              placeholder="Select location"
              options={locations}
              value={location}
              onChange={setLocation}
            />
            <button className="search-btn" onClick={handleSearch} aria-label="Search">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}