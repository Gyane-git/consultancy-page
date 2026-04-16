"use client";
import React, { useState } from "react";

interface LogoRowProps {
  logos: { name: string; abbr: string; country: string; color?: string }[];
  direction?: "right" | "left";
  speed?: number;
}

const COLORS = [
  { bg: "#1E3A5F", text: "#fff", accent: "#4A90D9" },
  { bg: "#1B4332", text: "#fff", accent: "#52B788" },
  { bg: "#4A1942", text: "#fff", accent: "#C77DFF" },
  { bg: "#7B2D00", text: "#fff", accent: "#FF9500" },
  { bg: "#1A237E", text: "#fff", accent: "#7986CB" },
  { bg: "#004D40", text: "#fff", accent: "#4DB6AC" },
  { bg: "#880E4F", text: "#fff", accent: "#F48FB1" },
  { bg: "#212121", text: "#fff", accent: "#BDBDBD" },
];

const LogoCard = ({ logo, colorIdx }: { logo: { name: string; abbr: string; country: string; color?: string }; colorIdx: number }) => {
  const c = COLORS[colorIdx % COLORS.length];
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="logo-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flexShrink: 0,
        width: "180px",
        height: "110px",
        borderRadius: "16px",
        background: hovered ? c.bg : "#fff",
        border: hovered ? `2px solid ${c.accent}` : "2px solid #e8e8e8",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
        cursor: "default",
        transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        transform: hovered ? "translateY(-6px) scale(1.04)" : "none",
        boxShadow: hovered
          ? `0 16px 40px ${c.bg}55`
          : "0 2px 12px rgba(0,0,0,0.06)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {hovered && (
        <div
          style={{
            position: "absolute",
            top: "-20px",
            right: "-20px",
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: c.accent + "33",
            pointerEvents: "none",
          }}
        />
      )}
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "12px",
          background: hovered ? c.accent + "22" : "#f5f5f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          fontSize: "15px",
          color: hovered ? c.accent : "#555",
          letterSpacing: "0.05em",
          transition: "all 0.3s",
          border: hovered ? `1px solid ${c.accent}44` : "1px solid transparent",
        }}
      >
        {logo.abbr}
      </div>
      <div style={{ textAlign: "center", padding: "0 10px" }}>
        <div
          style={{
            fontSize: "11px",
            fontWeight: 600,
            color: hovered ? "#fff" : "#222",
            lineHeight: 1.3,
            transition: "color 0.3s",
            maxWidth: "150px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {logo.name}
        </div>
        <div
          style={{
            fontSize: "10px",
            color: hovered ? c.accent : "#999",
            marginTop: "2px",
            transition: "color 0.3s",
          }}
        >
          {logo.country}
        </div>
      </div>
    </div>
  );
};

const LogoRow: React.FC<LogoRowProps & { colorOffset?: number }> = ({
  logos,
  direction = "right",
  speed = 30,
  colorOffset = 0,
}) => {
  const tripled = [...logos, ...logos, ...logos];

  return (
    <div style={{ position: "relative", overflow: "hidden", width: "100%", padding: "8px 0" }}>
      <div
        style={{
          display: "flex",
          gap: "20px",
          animationName: direction === "right" ? "scrollRight" : "scrollLeft",
          animationDuration: `${speed}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          width: "max-content",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLElement).style.animationPlayState = "paused")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLElement).style.animationPlayState = "running")
        }
      >
        {tripled.map((logo, i) => (
          <LogoCard
            key={i}
            logo={logo}
            colorIdx={(i % logos.length) + colorOffset}
          />
        ))}
      </div>
    </div>
  );
};

const UniPartners = () => {
  const row1 = [
    { name: "University of Oxford", abbr: "OX", country: "UK" },
    { name: "Canterbury Christ Church", abbr: "CC", country: "UK" },
    { name: "Oxford Brookes", abbr: "OB", country: "UK" },
    { name: "Swansea University", abbr: "SW", country: "UK" },
    { name: "Univ. of Westminster", abbr: "UW", country: "UK" },
    { name: "Univ. of Essex", abbr: "UE", country: "UK" },
    { name: "Lancaster University", abbr: "LU", country: "UK" },
  ];

  const row2 = [
    { name: "Univ. of California Irvine", abbr: "UCI", country: "USA" },
    { name: "Bath Spa University", abbr: "BS", country: "UK" },
    { name: "Univ. of Bristol", abbr: "UB", country: "UK" },
    { name: "Univ. of West London", abbr: "WL", country: "UK" },
    { name: "Univ. of Stirling", abbr: "ST", country: "UK" },
    { name: "York St John Univ.", abbr: "YJ", country: "UK" },
    { name: "Pearson College", abbr: "PC", country: "UK" },
  ];

  const row3 = [
    { name: "Univ. of Surrey", abbr: "SY", country: "UK" },
    { name: "Univ. of Nottingham", abbr: "UN", country: "UK" },
    { name: "Univ. of Kent", abbr: "KT", country: "UK" },
    { name: "Univ. of Exeter", abbr: "EX", country: "UK" },
    { name: "SOAS Univ. of London", abbr: "SA", country: "UK" },
    { name: "Roehampton University", abbr: "RH", country: "UK" },
    { name: "Univ. of Birmingham", abbr: "BM", country: "UK" },
  ];

  const stats = [
    { value: "250+", label: "Partner Universities" },
    { value: "40+", label: "Countries" },
    { value: "10K+", label: "Students Placed" },
    { value: "98%", label: "Visa Success Rate" },
  ];

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        padding: "80px 0",
        background: "linear-gradient(180deg, #f9f7ff 0%, #ffffff 40%, #f0f7ff 100%)",
        overflow: "hidden",
        fontFamily: "'DM Sans', 'Inter', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');

        @keyframes scrollRight {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes scrollLeft {
          0% { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
        @keyframes floatUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes blobMove {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(40px, -30px) scale(1.08); }
        }
      `}</style>

      {/* BG blobs */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{
          position: "absolute", top: "-80px", left: "-60px",
          width: "400px", height: "400px",
          background: "radial-gradient(circle, #a78bfa33 0%, transparent 70%)",
          animation: "blobMove 8s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", bottom: "-80px", right: "-60px",
          width: "500px", height: "500px",
          background: "radial-gradient(circle, #60a5fa29 0%, transparent 70%)",
          animation: "blobMove 10s ease-in-out infinite reverse",
        }} />
      </div>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "64px", padding: "0 24px", animation: "floatUp 0.7s ease both" }}>
        <span style={{
          display: "inline-block",
          background: "linear-gradient(135deg, #ede9fe, #dbeafe)",
          color: "#5b21b6",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          padding: "6px 20px",
          borderRadius: "50px",
          border: "1px solid #c4b5fd55",
          marginBottom: "20px",
        }}>
          Trusted Worldwide
        </span>

        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(2rem, 4.5vw, 3.6rem)",
          fontWeight: 700,
          lineHeight: 1.12,
          margin: "0 0 16px",
          background: "linear-gradient(135deg, #1e1b4b 0%, #4c1d95 50%, #1d4ed8 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          250+ Global University Partners
        </h2>

        <p style={{
          fontSize: "1rem",
          color: "#64748b",
          maxWidth: "520px",
          margin: "0 auto 40px",
          lineHeight: 1.7,
          fontWeight: 400,
        }}>
          Connecting ambitious students with world-class institutions across every continent.
        </p>

        {/* Stat pills */}
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          {stats.map((s) => (
            <div key={s.label} style={{
              background: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: "50px",
              padding: "10px 24px",
              display: "flex",
              alignItems: "baseline",
              gap: "8px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
            }}>
              <span style={{ fontSize: "1.2rem", fontWeight: 700, color: "#4c1d95" }}>{s.value}</span>
              <span style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 500 }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll rows */}
      <div style={{ position: "relative" }}>
        {/* Edge fades */}
        <div style={{
          pointerEvents: "none",
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, #f9f7ff 0%, transparent 12%, transparent 88%, #f0f7ff 100%)",
          zIndex: 10,
        }} />

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <LogoRow logos={row1} direction="right" speed={45} colorOffset={0} />
          <LogoRow logos={row2} direction="left"  speed={38} colorOffset={3} />
          <LogoRow logos={row3} direction="right" speed={50} colorOffset={5} />
        </div>
      </div>

      {/* CTA footer */}
      <div style={{ textAlign: "center", marginTop: "56px", padding: "0 24px" }}>
        <p style={{ fontSize: "0.9rem", color: "#94a3b8", marginBottom: "16px" }}>
          Can&apos;t find your target university?
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            padding: "13px 32px",
            borderRadius: "50px",
            border: "none",
            background: "linear-gradient(135deg, #4c1d95, #1d4ed8)",
            color: "#fff",
            fontSize: "0.92rem",
            fontWeight: 600,
            cursor: "pointer",
            letterSpacing: "0.02em",
            boxShadow: "0 8px 24px rgba(76,29,149,0.35)",
            transition: "transform 0.15s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 14px 32px rgba(76,29,149,0.45)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "none";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(76,29,149,0.35)";
          }}
        >
          Talk to a Counsellor →
        </button>
      </div>
    </div>
  );
};

export default UniPartners;