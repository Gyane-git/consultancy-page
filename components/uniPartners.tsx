"use client";
import React, { useEffect, useState } from "react";

type LogoItem = {
  name: string;
  logo?: string;
  country?: string;
  color?: string;
};

interface LogoRowProps {
  logos: LogoItem[];
  direction?: "right" | "left";
  speed?: number;
}

const COLORS = [
  { bg: "", text: "#fff", accent: "" },
  { bg: "", text: "#fff", accent: "" },
  { bg: "", text: "#fff", accent: "" },
  { bg: "", text: "#fff", accent: "" },
  { bg: "", text: "#fff", accent: "" },
  { bg: "", text: "#fff", accent: "" },
  { bg: "", text: "#fff", accent: "" },
  { bg: "", text: "#fff", accent: "" },
];

const LogoCard = ({ logo, colorIdx }: { logo: LogoItem; colorIdx: number }) => {
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
          width: "112px",
          height: "82px",
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
        {logo.logo ? (
          <img
            src={logo.logo}
            alt={logo.name}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        ) : (
          <span style={{ fontSize: "12px", padding: "0 8px", textAlign: "center" }}>{logo.name}</span>
        )}
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
  const fallbackLogos: LogoItem[] = [
    { name: "University of York", logo: "/uni/University-of-York.png" },
    { name: "AUC School of Medicine", logo: "/uni/american-university-of-the-caribbean-school-of-medicine-logo.png" },
    { name: "Amsterdam School of the Arts", logo: "/uni/amsterdam-school-of-the-arts-logo.png" },
    { name: "Aureus University", logo: "/uni/aureus-university-school-of-medicine-logo.png" },
    { name: "Autonomous University of Barcelona", logo: "/uni/autonomous-university-of-barcelona-logo.png" },
    { name: "Avans University", logo: "/uni/avans-university-of-applied-sciences-logo.png" },
    { name: "Codarts University", logo: "/uni/codarts-university-of-the-arts-logo.png" },
    { name: "Delft University of Technology", logo: "/uni/delft-university-of-technology-logo.png" },
    { name: "Durham University", logo: "/uni/durham-university-logo.png" },
    { name: "University of Exeter", logo: "/uni/University-of-Exeter.png" },
    { name: "Oxford University", logo: "/uni/oxford.png" },
    { name: "University of Manchester", logo: "/uni/the-university-of-manchester-logo.png" },
  ];

  const [logos, setLogos] = useState<LogoItem[]>(fallbackLogos);

  useEffect(() => {
    let ignore = false;

    async function loadUniversities() {
      try {
        const res = await fetch("/api/university", { cache: "no-store" });
        const data = await res.json();
        if (!ignore && res.ok && data?.success && Array.isArray(data.universities)) {
          const nextLogos = data.universities
            .filter((u: { logo?: string | null; name?: string }) => Boolean(u?.logo))
            .map((u: { logo?: string | null; name?: string }) => ({
              name: String(u.name || "University"),
              logo: String(u.logo || ""),
            }));
          if (nextLogos.length > 0) setLogos(nextLogos);
        }
      } catch (error) {
        console.error("Failed to load universities", error);
      }
    }

    loadUniversities();
    return () => {
      ignore = true;
    };
  }, []);

  const chunkSize = Math.max(1, Math.ceil(logos.length / 3));
  const row1 = logos.slice(0, chunkSize);
  const row2 = logos.slice(chunkSize, chunkSize * 2);
  const row3 = logos.slice(chunkSize * 2);
  const safeRow1 = row1.length ? row1 : logos;
  const safeRow2 = row2.length ? row2 : logos;
  const safeRow3 = row3.length ? row3 : logos;

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
      <div style={{ position: "relative", maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        {/* Edge fades */}
        <div style={{
          pointerEvents: "none",
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, #f9f7ff 0%, transparent 12%, transparent 88%, #f0f7ff 100%)",
          zIndex: 10,
        }} />

        <div style={{ display: "flex", flexDirection: "column", gap: "26px" }}>
          <LogoRow logos={safeRow1} direction="right" speed={45} colorOffset={0} />
          <LogoRow logos={safeRow2} direction="left"  speed={38} colorOffset={3} />
          {/* <LogoRow logos={safeRow3} direction="right" speed={50} colorOffset={5} /> */}
        </div>
      </div>

      {/* CTA footer */}
      <div style={{ textAlign: "center", marginTop: "56px", padding: "0 24px" }}>
        <p style={{ fontSize: "0.9rem", color: "#94a3b8", marginBottom: "16px" }}>
          Can&apos;t find your target university?
        </p>
        <button
          onClick= {() => window.location.href = "/contact"}
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
