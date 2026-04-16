"use client";

import { useState } from "react";

// ─────────────────────────────────────────────
// Skyline SVG — exact replica of the silhouette
// ─────────────────────────────────────────────
function Skyline() {
  return (
    <div style={{ background: "#fff", lineHeight: 0, overflow: "hidden" }}>
      <svg
        viewBox="0 0 1440 140"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMax meet"
        style={{ display: "block", width: "100%", height: "auto" }}
      >
        {/* ── Sydney Opera House (left) ── */}
        <path d="M30 130 Q55 80 75 100 Q90 70 110 100 Q125 60 148 130Z" fill="#F5A800" />
        <rect x="20" y="128" width="140" height="4" fill="#F5A800" />

        {/* ── Harbour Bridge ── */}
        <rect x="180" y="110" width="200" height="5" fill="#F5A800" />
        {/* bridge towers */}
        <rect x="180" y="90" width="8" height="25" fill="#F5A800" />
        <rect x="372" y="90" width="8" height="25" fill="#F5A800" />
        {/* arch */}
        <path d="M188 115 Q280 48 372 115" stroke="#F5A800" strokeWidth="6" fill="none" />
        {/* vertical hangers */}
        {[200,215,230,245,260,275,290,305,320,335,350,365].map((x, i) => (
          <line key={i} x1={x} y1="115" x2={x} y2={60 + Math.abs(i - 5.5) * 5} stroke="#F5A800" strokeWidth="1.5" />
        ))}

        {/* ── Mid buildings ── */}
        <rect x="410" y="85" width="18" height="47" fill="#F5A800" />
        <rect x="432" y="95" width="14" height="37" fill="#F5A800" />
        <rect x="450" y="75" width="22" height="57" fill="#F5A800" />
        <rect x="476" y="90" width="16" height="42" fill="#F5A800" />
        <rect x="496" y="70" width="20" height="62" fill="#F5A800" />
        <rect x="520" y="100" width="12" height="32" fill="#F5A800" />

        {/* ── Big Ben ── */}
        {/* base */}
        <rect x="570" y="60" width="36" height="72" fill="#F5A800" />
        {/* cornice */}
        <rect x="563" y="55" width="50" height="8" fill="#F5A800" />
        {/* belfry */}
        <rect x="574" y="38" width="28" height="20" fill="#F5A800" />
        {/* spire */}
        <rect x="583" y="16" width="10" height="24" fill="#F5A800" />
        <polygon points="583,16 593,16 588,6" fill="#F5A800" />
        {/* clock face hint */}
        <circle cx="588" cy="68" r="8" fill="#E09000" />

        {/* ── Buildings between Big Ben and Eye ── */}
        <rect x="640" y="80" width="20" height="52" fill="#F5A800" />
        <rect x="664" y="92" width="16" height="40" fill="#F5A800" />
        <rect x="684" y="72" width="24" height="60" fill="#F5A800" />
        <rect x="712" y="88" width="18" height="44" fill="#F5A800" />
        <rect x="734" y="68" width="22" height="64" fill="#F5A800" />

        {/* ── London Eye ── */}
        <circle cx="820" cy="72" r="52" stroke="#F5A800" strokeWidth="4" fill="none" />
        {/* spokes */}
        {[0,30,60,90,120,150].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <line key={i}
              x1={820 + 52 * Math.cos(rad)} y1={72 + 52 * Math.sin(rad)}
              x2={820 - 52 * Math.cos(rad)} y2={72 - 52 * Math.sin(rad)}
              stroke="#F5A800" strokeWidth="1.5"
            />
          );
        })}
        <circle cx="820" cy="72" r="6" fill="#F5A800" />
        {/* gondolas */}
        {[0,45,90,135,180,225,270,315].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          return <circle key={i} cx={820 + 48 * Math.cos(rad)} cy={72 + 48 * Math.sin(rad)} r="4" fill="#F5A800" />;
        })}
        {/* support leg */}
        <rect x="815" y="123" width="10" height="10" fill="#F5A800" />

        {/* ── Tower Bridge ── */}
        {/* road deck */}
        <rect x="900" y="106" width="220" height="6" fill="#F5A800" />
        {/* left tower */}
        <rect x="900" y="65" width="28" height="47" fill="#F5A800" />
        <rect x="896" y="58" width="36" height="10" fill="#F5A800" />
        <rect x="906" y="44" width="16" height="16" fill="#F5A800" />
        <polygon points="906,44 922,44 914,34" fill="#F5A800" />
        {/* right tower */}
        <rect x="1092" y="65" width="28" height="47" fill="#F5A800" />
        <rect x="1088" y="58" width="36" height="10" fill="#F5A800" />
        <rect x="1098" y="44" width="16" height="16" fill="#F5A800" />
        <polygon points="1098,44 1114,44 1106,34" fill="#F5A800" />
        {/* suspension cables */}
        <path d="M914 68 Q1010 42 1106 68" stroke="#F5A800" strokeWidth="2.5" fill="none" />
        {[940,960,980,1000,1020,1040,1060,1080].map((x, i) => {
          const mid = 1010;
          const sag = 20 - Math.abs(x - mid) / 10;
          return <line key={i} x1={x} y1={68 + sag} x2={x} y2="106" stroke="#F5A800" strokeWidth="1.2" />;
        })}

        {/* ── Right city buildings ── */}
        <rect x="1150" y="72" width="24" height="60" fill="#F5A800" />
        <rect x="1178" y="84" width="18" height="48" fill="#F5A800" />
        <rect x="1200" y="60" width="26" height="72" fill="#F5A800" />
        <rect x="1230" y="78" width="20" height="54" fill="#F5A800" />
        <rect x="1254" y="65" width="22" height="67" fill="#F5A800" />
        <rect x="1280" y="88" width="16" height="44" fill="#F5A800" />
        <rect x="1300" y="55" width="28" height="77" fill="#F5A800" />
        <rect x="1332" y="76" width="20" height="56" fill="#F5A800" />
        <rect x="1356" y="68" width="24" height="64" fill="#F5A800" />
        <rect x="1384" y="82" width="18" height="50" fill="#F5A800" />
        <rect x="1406" y="72" width="34" height="60" fill="#F5A800" />

        {/* ── Ground fill ── */}
        <rect x="0" y="130" width="1440" height="10" fill="#F5A800" />
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────
// Social Icon Button
// ─────────────────────────────────────────────
function SocialBtn({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: 42, height: 42, color: "#1a0d00", textDecoration: "none",
        transition: "transform 0.15s",
      }}
      onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.15)")}
      onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
    >
      {children}
    </a>
  );
}

// ─────────────────────────────────────────────
// Main Footer
// ─────────────────────────────────────────────
export default function StudySyncFooter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const subscribe = () => {
    if (email.trim()) { setDone(true); setEmail(""); setTimeout(() => setDone(false), 3000); }
  };

  const links     = ["IELTS Prep", "Destinations", "Services", "Courses", "Universities", "Blog", "About", "Contact"];
  const quickLinks = ["Apply Now", "Scholarships", "Visa Guide", "Pre-Departure", "Partner Login"];

  return (
    <div style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700;800&display=swap');
        .rf * { box-sizing: border-box; margin: 0; padding: 0; }
        .rf a { text-decoration: none; }
        .rf-link {
          display: block;
          font-family: 'Nunito Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #1a0d00;
          padding: 5px 0;
          transition: color 0.15s, padding-left 0.15s;
        }
        .rf-link:hover { color: #5a3300; padding-left: 6px; }
        .rf-sub-input {
          flex: 1; padding: 13px 16px; border: none; outline: none;
          font-family: 'Nunito Sans', sans-serif; font-size: 13px;
          background: rgba(255,255,255,0.85); color: #1a0d00;
          border-radius: 0;
        }
        .rf-sub-input::placeholder { color: #888; }
        .rf-sub-btn {
          padding: 0 16px; min-width: 105px;
          background: #5a4a00; color: #F5A800;
          border: none; cursor: pointer;
          font-family: 'Nunito Sans', sans-serif;
          font-size: 11px; font-weight: 800;
          letter-spacing: 0.06em; text-transform: uppercase;
          line-height: 1.35; transition: background 0.2s;
        }
        .rf-sub-btn:hover { background: #3a3000; }

        /* Achievement side tab */
        .rf-side-tab {
          position: fixed; right: 0; top: 50%;
          transform: translateY(-50%) rotate(90deg);
          transform-origin: right center;
          background: #fff; border: 1px solid #ddd;
          padding: 6px 14px; font-size: 12px; font-weight: 700;
          color: #333; letter-spacing: 0.08em; z-index: 999;
          cursor: pointer;
        }

        /* Partner badges */
        .rf-partner {
          display: flex; align-items: center; justify-content: center;
          flex-wrap: wrap; gap: 20px; padding: 26px 0 22px;
          border-top: 1.5px solid rgba(0,0,0,0.15);
          border-bottom: 1.5px solid rgba(0,0,0,0.15);
          margin: 32px 0 0;
        }
        .badge-box {
          display: flex; align-items: center; gap: 6px;
          font-family: 'Nunito Sans', sans-serif;
          font-size: 12px; font-weight: 700; color: #1a0d00;
        }
        .badge-dark {
          background: #111; color: #fff; padding: 8px 14px;
          border-radius: 4px; font-size: 11px; font-weight: 800;
          letter-spacing: 0.04em; white-space: nowrap;
        }
        .badge-outline {
          border: 2px solid rgba(0,0,0,0.25); padding: 6px 12px;
          border-radius: 4px; font-size: 12px; font-weight: 700;
          color: #1a0d00; white-space: nowrap;
        }

        @media (max-width: 1000px) {
          .rf-grid { grid-template-columns: 1fr 1fr !important; }
          .rf-col4 { grid-column: 1 / -1 !important; }
        }
        @media (max-width: 600px) {
          .rf-grid { grid-template-columns: 1fr !important; }
          .rf-inner { padding: 0 18px !important; }
        }
      `}</style>

      <div className="rf">

        {/* Skyline */}
        <Skyline />

        {/* Gold body */}
        <div style={{ background: "#F5A800", paddingBottom: 0 }}>
          <div className="rf-inner" style={{ maxWidth: 1320, margin: "0 auto", padding: "46px 48px 0" }}>

            {/* 4-column grid */}
            <div
              className="rf-grid"
              style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1.5fr", gap: "36px 40px", alignItems: "start" }}
            >
              {/* Col 1 – About */}
              <div>
                <h2 style={{
                  fontFamily: "'Nunito Sans', sans-serif", fontSize: 20, fontWeight: 800,
                  color: "#1a0d00", marginBottom: 18, lineHeight: 1.25,
                }}>
                  Study Sync
                </h2>
                <p style={{
                  fontFamily: "'Nunito Sans', sans-serif", fontSize: 13.5, lineHeight: 1.78,
                  color: "#1a0d00", maxWidth: 340,
                }}>
                  Study Sync helps students find the right university, visa pathway, and pre-departure support.
                  We guide applicants through admissions, IELTS prep, visa processing and scholarships with
                  personalised consulting to make international study smooth and successful.
                </p>
              </div>

              {/* Col 2 – Links */}
              <div>
                <h3 style={{
                  fontFamily: "'Nunito Sans', sans-serif", fontSize: 15, fontWeight: 800,
                  color: "#1a0d00", marginBottom: 16,
                }}>Links</h3>
                {links.map(l => <a key={l} href="#" className="rf-link">{l}</a>)}
              </div>

              {/* Col 3 – Quick Links */}
              <div>
                <h3 style={{
                  fontFamily: "'Nunito Sans', sans-serif", fontSize: 15, fontWeight: 800,
                  color: "#1a0d00", marginBottom: 16,
                }}>Quick Links</h3>
                {quickLinks.map(l => <a key={l} href="#" className="rf-link">{l}</a>)}
              </div>

              {/* Col 4 – Social + Subscribe + Map */}
              <div className="rf-col4">
                {/* Social row */}
                <div style={{ display: "flex", gap: 4, marginBottom: 16, flexWrap: "wrap" }}>
                  {/* Facebook */}
                  <SocialBtn href="#" label="Facebook">
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="currentColor">
                      <path d="M28 4H8a4 4 0 00-4 4v20a4 4 0 004 4h10V22h-4v-5h4v-3.5C18 10.1 20.4 8 23.6 8c1.5 0 3.1.3 3.1.3V12H24.7c-1.7 0-2.2 1.1-2.2 2.2V17h4.3l-.7 5H22.5v10H28a4 4 0 004-4V8a4 4 0 00-4-4z"/>
                    </svg>
                  </SocialBtn>
                  {/* YouTube */}
                  <SocialBtn href="#" label="YouTube">
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="currentColor">
                      <path d="M32.5 10.2a4 4 0 00-2.8-2.8C27.5 7 18 7 18 7s-9.5 0-11.7.4a4 4 0 00-2.8 2.8C3 12.5 3 18 3 18s0 5.5.5 7.8a4 4 0 002.8 2.8C8.5 29 18 29 18 29s9.5 0 11.7-.4a4 4 0 002.8-2.8C33 23.5 33 18 33 18s0-5.5-.5-7.8zM15 22.5v-9l7.5 4.5-7.5 4.5z"/>
                    </svg>
                  </SocialBtn>
                  {/* Instagram */}
                  <SocialBtn href="#" label="Instagram">
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="4" y="4" width="28" height="28" rx="7"/>
                      <circle cx="18" cy="18" r="7"/>
                      <circle cx="25.5" cy="10.5" r="1.5" fill="currentColor" stroke="none"/>
                    </svg>
                  </SocialBtn>
                  {/* TikTok */}
                  <SocialBtn href="#" label="TikTok">
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="currentColor">
                      <path d="M28 4h-4.5v18.5a4.5 4.5 0 01-4.5 4.5 4.5 4.5 0 01-4.5-4.5 4.5 4.5 0 014.5-4.5c.4 0 .8.06 1.2.16V13.5a9 9 0 00-1.2-.08A9 9 0 0010 22.5 9 9 0 0019 31.5a9 9 0 009-9V15a12.2 12.2 0 007 2.2v-4.5A7.7 7.7 0 0128 4z"/>
                    </svg>
                  </SocialBtn>
                  {/* WhatsApp */}
                  <SocialBtn href="#" label="WhatsApp">
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="currentColor">
                      <path d="M18 3C9.7 3 3 9.7 3 18c0 2.7.7 5.3 2 7.5L3 33l7.7-2c2.1 1.2 4.5 1.9 7.3 1.9 8.3 0 15-6.7 15-15S26.3 3 18 3zm7.5 20.3c-.3.8-1.6 1.5-2.3 1.6-.6.1-1.4.1-2.2-.1-.5-.1-1.1-.3-1.9-.6-3.3-1.4-5.5-4.7-5.6-4.9-.2-.2-1.3-1.7-1.3-3.3 0-1.6.8-2.3 1.1-2.7.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5.2.5.8 1.9.9 2 .1.2.1.4 0 .6-.1.2-.2.4-.4.5-.2.2-.4.4-.5.5-.2.2-.4.4-.2.7.2.4.9 1.4 1.9 2.3 1.3 1.1 2.3 1.5 2.7 1.6.4.2.6.1.8-.1.2-.2.9-1 1.1-1.4.2-.4.5-.3.8-.2.3.1 2 .9 2.3 1.1.3.2.5.3.6.4.1.4-.2 1.4-.5 2.3z"/>
                    </svg>
                  </SocialBtn>
                </div>

                {/* Subscribe bar */}
                <div style={{ display: "flex", borderRadius: 4, overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.15)", marginBottom: 14 }}>
                  <input
                    className="rf-sub-input"
                    type="email"
                    placeholder="Enter your Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && subscribe()}
                  />
                  <button className="rf-sub-btn" onClick={subscribe}>
                    {done ? "✓ Done!" : "Subscribe for\nNewsletter"}
                  </button>
                </div>

                {/* Google Map */}
                <div style={{ borderRadius: 6, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.18)" }}>
                  <iframe
                    title="Study Sync Office"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.2!2d85.3147!3d27.7091!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19000a37b73d%3A0x3c04dc75e0e9e2a6!2sBag%20Bazar%2C%20Kathmandu!5e0!3m2!1sen!2snp"
                    width="100%"
                    height="165"
                    style={{ border: "none", display: "block" }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>

            {/* Partner logos row */}
            <div className="rf-partner">
              {/* QEAC */}
              <div className="badge-box">
                <svg width="28" height="18" viewBox="0 0 28 18" fill="none">
                  <ellipse cx="14" cy="9" rx="13" ry="8" stroke="#1a0d00" strokeWidth="2"/>
                  <path d="M6 9h16M14 2v14" stroke="#1a0d00" strokeWidth="1.5"/>
                </svg>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, fontFamily:"'Nunito Sans',sans-serif" }}>QEAC</div>
                  <div style={{ fontSize: 10, fontWeight: 600, fontFamily:"'Nunito Sans',sans-serif" }}>AUSTRALIA</div>
                </div>
              </div>

              {/* ECAN */}
              <div className="badge-outline">ECAN</div>

              {/* ICEF */}
              <div className="badge-outline" style={{ fontSize: 11 }}>
                <div>ICEF AGENCY</div>
                <div style={{ fontSize: 9, fontWeight: 600 }}>2019–2021</div>
              </div>

              {/* Education NZ */}
              <div className="badge-dark">
                <span style={{ fontSize: 9, display: "block" }}>RECOGNISED</span>
                AGENCY
                <span style={{ fontSize: 9, display: "block", marginTop: 2 }}>EDUCATION NEW ZEALAND</span>
              </div>

              {/* Canada Course */}
              <div className="badge-outline" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 18, lineHeight: 1 }}>🍁</span>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 800 }}>Canada Course for</div>
                  <div style={{ fontSize: 11, fontWeight: 800 }}>Education Agents</div>
                </div>
              </div>

              {/* Ministry of Education */}
              <div style={{ fontFamily: "'Nunito Sans',sans-serif", lineHeight: 1.4 }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#1a0d00" }}>Ministry of Education</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#1a0d00" }}>Government of Nepal</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#1a0d00" }}>Approved Consultancy</div>
              </div>
            </div>

            {/* Bottom bar */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "14px 0", flexWrap: "wrap", gap: 8,
            }}>
              <p style={{ fontFamily: "'Nunito Sans',sans-serif", fontSize: 13, color: "#1a0d00" }}>
                © {new Date().getFullYear()}. Study Sync. All rights reserved.
              </p>
              <p style={{ fontFamily: "'Nunito Sans',sans-serif", fontSize: 13, color: "#1a0d00" }}>
                Designed by{" "}
                <a href="#" style={{ color: "#1a0d00", fontWeight: 800, fontStyle: "italic", textDecoration: "underline" }}>
                  DevMind Solutions
                </a>
              </p>
            </div>

          </div>
        </div>

        {/* Achievement side tab */}
        <div style={{
          position: "fixed", right: -28, top: "40%",
          transform: "rotate(90deg)", transformOrigin: "right center",
          background: "#fff", border: "1px solid #ccc",
          padding: "6px 16px", fontSize: 11, fontWeight: 700,
          color: "#333", letterSpacing: "0.1em", cursor: "pointer",
          zIndex: 999, borderRadius: "4px 4px 0 0",
          fontFamily: "'Nunito Sans',sans-serif",
        }}>
          Achievement
        </div>

      </div>
    </div>
  );
}