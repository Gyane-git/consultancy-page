"use client";
import { useState } from "react";

const subjects = [
  "Computer Science","Business & Management","Medicine & Health",
  "Engineering","Law","Arts & Design","Psychology",
  "Architecture","Economics","Education",
];
const courseTypes = [
  "Undergraduate (Bachelor's)","Postgraduate (Master's)","PhD / Doctorate",
  "Foundation Year","Diploma / Certificate","Online / Distance Learning","Part-time",
];
const locations = [
  "United Kingdom","United States","Australia","Canada","Germany",
  "Netherlands","New Zealand","Ireland","Singapore","UAE",
];

type Tab = "COURSES" | "UNIVERSITIES";

interface DropdownProps {
  label: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}

function Dropdown({ label, placeholder, options, value, onChange }: DropdownProps) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative", flex: 1, minWidth: 0 }}>
      <div
        style={{ padding: "14px 20px", cursor: "pointer", userSelect: "none", display: "flex", flexDirection: "column", gap: 4, height: "100%", justifyContent: "center" }}
        onClick={() => setOpen((o) => !o)}
      >
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#9ca3af" }}>{label}</span>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          <span style={{ fontSize: 14, color: value ? "#1a1a2e" : "#b0b8c8", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontFamily: "'DM Sans',sans-serif" }}>
            {value || placeholder}
          </span>
          <svg style={{ width: 14, height: 14, flexShrink: 0, color: "#c8102e", transition: "transform .2s", transform: open ? "rotate(180deg)" : "none" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>
      {open && (
        <>
          <div style={{ position: "fixed", inset: 0, zIndex: 199 }} onClick={() => setOpen(false)} />
          <div style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0, background: "#fff", border: "1px solid rgba(200,16,46,.18)", borderRadius: 12, overflow: "hidden", zIndex: 200, boxShadow: "0 16px 48px rgba(0,0,0,.1)" }}>
            <style>{`@keyframes dropIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}`}</style>
            {options.map((opt) => (
              <div
                key={opt}
                style={{ padding: "11px 20px", fontSize: 13, color: value === opt ? "#c8102e" : "#374151", cursor: "pointer", fontWeight: value === opt ? 600 : 400, fontFamily: "'DM Sans',sans-serif", background: "transparent", transition: "background .12s" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#fff5f6")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
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
  const [tab, setTab] = useState<Tab>("COURSES");
  const [subject, setSubject] = useState("");
  const [courseType, setCourseType] = useState("");
  const [location, setLocation] = useState("");

  const stats = [
    { value: "250+", label: "Partner Universities" },
    { value: "40+", label: "Countries" },
    { value: "10K+", label: "Students Placed" },
    { value: "98%", label: "Visa Success" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,800&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        @keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes blobMove{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(30px,-20px) scale(1.06)}}
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(1.4)}}

        .find-hero{
          position:relative;width:100%;
          padding:80px 24px 90px;
          background:linear-gradient(175deg,#f9f7ff 0%,#ffffff 45%,#fff5f6 100%);
          overflow:hidden;font-family:'DM Sans',sans-serif;text-align:center;
        }
        .find-blob1{position:absolute;top:-80px;left:-60px;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(200,16,46,.06) 0%,transparent 70%);animation:blobMove 9s ease-in-out infinite;pointer-events:none;}
        .find-blob2{position:absolute;bottom:-80px;right:-60px;width:480px;height:480px;border-radius:50%;background:radial-gradient(circle,rgba(167,139,250,.06) 0%,transparent 70%);animation:blobMove 11s ease-in-out infinite reverse;pointer-events:none;}

        .find-inner{position:relative;z-index:2;max-width:820px;margin:0 auto;}

        .find-eyebrow{
          display:inline-flex;align-items:center;gap:8px;
          font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;
          color:#c8102e;background:linear-gradient(135deg,#fff0f2,#fce7ea);
          border:1px solid rgba(200,16,46,.18);padding:6px 18px;border-radius:50px;
          margin-bottom:20px;animation:slideUp .5s ease both;
        }
        .find-eyebrow-dot{width:6px;height:6px;border-radius:50%;background:#c8102e;animation:pulse 2s infinite;}

        .find-h1{
          font-family:'Playfair Display',serif;
          font-size:clamp(1.9rem,4.5vw,3.4rem);font-weight:800;color:#1a1a2e;
          line-height:1.1;letter-spacing:-1px;margin-bottom:14px;
          animation:slideUp .55s .05s ease both;
        }
        .find-h1 em{font-style:italic;color:#c8102e;}

        .find-sub{
          font-size:1rem;color:#6b7280;max-width:480px;margin:0 auto 36px;
          line-height:1.75;font-weight:400;animation:slideUp .55s .1s ease both;
        }

        .find-stats{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-bottom:44px;animation:slideUp .55s .12s ease both;}
        .find-stat-pill{background:#fff;border:1px solid #ebebf0;border-radius:50px;padding:10px 22px;display:flex;align-items:baseline;gap:8px;box-shadow:0 2px 10px rgba(0,0,0,.04);}

        .find-tab-row{display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:16px;animation:slideUp .55s .14s ease both;}
        .find-tab-btn{
          padding:9px 22px;border-radius:8px;border:1.5px solid #e2e8f0;
          background:transparent;color:#6b7280;font-family:'DM Sans',sans-serif;
          font-size:11px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;
          cursor:pointer;transition:all .2s;
        }
        .find-tab-btn:hover{border-color:#c8102e;color:#c8102e;}
        .find-tab-btn.active{background:#c8102e;border-color:#c8102e;color:#fff;}

        .find-search{
          display:flex;align-items:stretch;
          border:1.5px solid #e8eaf0;border-radius:16px;overflow:visible;
          background:#fff;box-shadow:0 4px 24px rgba(0,0,0,.06),0 0 0 5px rgba(200,16,46,.04);
          min-height:80px;position:relative;text-align:left;
          animation:slideUp .55s .18s ease both;
          transition:border-color .2s,box-shadow .2s;
        }
        .find-search:focus-within{border-color:rgba(200,16,46,.35);box-shadow:0 4px 24px rgba(0,0,0,.07),0 0 0 5px rgba(200,16,46,.07);}
        .find-divider{width:1px;background:#f0f0f5;flex-shrink:0;margin:16px 0;}
        .find-search-btn{
          width:80px;flex-shrink:0;
          background:linear-gradient(135deg,#c8102e,#9b0c22);
          border:none;border-radius:0 14px 14px 0;cursor:pointer;
          display:flex;align-items:center;justify-content:center;
          color:#fff;transition:filter .2s,transform .15s;
        }
        .find-search-btn:hover{filter:brightness(1.08);}
        .find-search-btn:active{transform:scale(.96);}

        .find-dl-btn{
          display:inline-flex;align-items:center;gap:8px;
          margin-top:24px;padding:11px 26px;border-radius:50px;
          border:1.5px solid #e2e8f0;background:#fff;color:#6b7280;
          font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;
          letter-spacing:1px;text-transform:uppercase;cursor:pointer;
          transition:all .2s;box-shadow:0 2px 10px rgba(0,0,0,.04);
          animation:slideUp .55s .22s ease both;
        }
        .find-dl-btn:hover{border-color:#c8102e;color:#c8102e;}

        @media(max-width:680px){
          .find-hero{padding:56px 16px 64px;}
          .find-search{flex-direction:column;min-height:auto;}
          .find-divider{width:auto;height:1px;margin:0 14px;}
          .find-search-btn{width:100%;height:54px;border-radius:0 0 14px 14px;}
        }
      `}</style>

      <section className="find-hero">
        <div className="find-blob1" />
        <div className="find-blob2" />

        <div className="find-inner">
          <div className="find-eyebrow">
            <span className="find-eyebrow-dot" />
            Study Abroad Finder
          </div>

          <h1 className="find-h1">
            Find your best-fit<br /><em>university</em> and course
          </h1>
          <p className="find-sub">
            Search thousands of courses across 250+ partner universities worldwide and find the perfect match for your goals.
          </p>

          <div className="find-stats">
            {stats.map((s) => (
              <div key={s.label} className="find-stat-pill">
                <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "#c8102e" }}>{s.value}</span>
                <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>{s.label}</span>
              </div>
            ))}
          </div>

          <div className="find-tab-row">
            {(["COURSES", "UNIVERSITIES"] as Tab[]).map((t) => (
              <button key={t} className={`find-tab-btn ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
                {t.charAt(0) + t.slice(1).toLowerCase()}
              </button>
            ))}
          </div>

          <div className="find-search">
            <Dropdown label="I'm looking for:" placeholder="Enter subject or course" options={subjects} value={subject} onChange={setSubject} />
            <div className="find-divider" />
            <Dropdown label="I'm planning to study:" placeholder="Select course type" options={courseTypes} value={courseType} onChange={setCourseType} />
            <div className="find-divider" />
            <Dropdown label="I want to study in:" placeholder="Select location" options={locations} value={location} onChange={setLocation} />
            <button className="find-search-btn" aria-label="Search">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </button>
          </div>

          <button className="find-dl-btn">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 3v13M7 11l5 5 5-5M5 20h14" />
            </svg>
            Download Education Guide
          </button>
        </div>
      </section>
    </>
  );
}