"use client";

import { useState, useEffect, useRef } from "react";
import StaffTeam from "@/components/staff-team";

const stats = [
  { value: "2025", label: "Founded", color: "#e8352a" },
  { value: "99%+", label: "Visa Success Rate", color: "#e8922a" },
  { value: "700+", label: "Students Annually", color: "#1a9e5c" },
  { value: "100%", label: "Dedicated Guidance", color: "#1a90c8" },
];

const countries = ["UK", "USA", "Australia", "Canada", "Denmark"];

const mvg = [
  {
    key: "mission",
    color: "#e8352a",
    bg: "#fff0ef",
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
      </svg>
    ),
    title: "Mission",
    text: "To empower students in Nepal with world-class guidance, resources, and opportunities to pursue higher education abroad, fostering personal growth, academic excellence, and global career success.",
  },
  {
    key: "vision",
    color: "#1a90c8",
    bg: "#edf6fb",
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    ),
    title: "Vision",
    text: "To be Nepal's most trusted and results-driven educational consultancy, recognized for shaping futures, transforming lives, and achieving the highest visa success rates for students aspiring to study abroad.",
  },
  {
    key: "goal",
    color: "#1a9e5c",
    bg: "#edf9f3",
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
    title: "Goal",
    text: "Send 700+ Nepali students annually to top universities across the UK, USA, Australia, Canada, and beyond. Maintain a 99%+ visa success rate with accurate documentation and expert guidance. Build a strong global alumni network and introduce innovative IELTS, PTE, and Duolingo preparation programs.",
  },
];

function useInView(threshold = 0.15): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FadeSection({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.65s ${delay}s ease, transform 0.65s ${delay}s ease`,
    }}>
      {children}
    </div>
  );
}

export default function AboutPage() {
  const [ceo, setCeo] = useState({
    ceoName: "Dinesh Dhakal",
    designation: "CEO & Founder",
    message:
      "At StudySync Educare, we believe every dream deserves the right direction. Our dedicated team supports students through each step of the study abroad journey.",
    profileImage: "",
    linkedinUrl: "",
  });

  useEffect(() => {
    let ignore = false;

    async function loadCeo() {
      try {
        const res = await fetch("/api/about-ceo", { cache: "no-store" });
        const data = await res.json();
        if (!ignore && data?.success && data?.ceo) {
          setCeo({
            ceoName: data.ceo.ceoName || "Dinesh Dhakal",
            designation: data.ceo.designation || "CEO & Founder",
            message:
              data.ceo.message ||
              "At StudySync Educare, we believe every dream deserves the right direction. Our dedicated team supports students through each step of the study abroad journey.",
            profileImage: data.ceo.profileImage || "",
            linkedinUrl: data.ceo.linkedinUrl || "",
          });
        }
      } catch (error) {
        console.error("Failed to load CEO profile", error);
      }
    }

    loadCeo();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,600;0,700;1,300;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .ab-root {
          font-family: 'Plus Jakarta Sans', sans-serif;
          color: #1a1a1a;
          background: #fff;
          overflow-x: hidden;
        }

        /* ── HERO ── */
        .ab-hero {
          background: linear-gradient(135deg, #f7f8fa 0%, #eef3f8 100%);
          padding: 80px 48px 0;
          position: relative;
          overflow: hidden;
          min-height: 420px;
          display: flex;
          align-items: flex-end;
        }
        .ab-hero-bg-text {
          position: absolute;
          top: 20px; right: -20px;
          font-family: 'Fraunces', serif;
          font-size: clamp(80px, 14vw, 160px);
          font-weight: 700;
          color: rgba(26,144,200,0.06);
          line-height: 1;
          pointer-events: none;
          letter-spacing: -0.04em;
          white-space: nowrap;
        }
        .ab-hero-inner {
          max-width: 1040px; margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: flex-end;
          width: 100%;
          position: relative;
          z-index: 1;
        }
        .ab-hero-left { padding-bottom: 64px; }
        .ab-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          background: #fff; border: 1px solid #e8e8e8;
          border-radius: 100px; padding: 5px 14px 5px 8px;
          margin-bottom: 20px;
        }
        .ab-eyebrow-dot { width: 8px; height: 8px; border-radius: 50%; background: #e8352a; }
        .ab-eyebrow-text { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: #e8352a; }
        .ab-hero h1 {
          font-family: 'Fraunces', serif;
          font-size: clamp(2.4rem, 5vw, 3.6rem);
          font-weight: 700;
          color: #111;
          line-height: 1.12;
          letter-spacing: -0.025em;
          margin-bottom: 18px;
        }
        .ab-hero h1 em { font-style: italic; color: #1a90c8; }
        .ab-hero-desc {
          font-size: 0.9rem; color: #777;
          line-height: 1.75; font-weight: 400;
          max-width: 400px;
        }
        .ab-country-pills {
          display: flex; flex-wrap: wrap; gap: 8px;
          margin-top: 28px;
        }
        .ab-country-pill {
          background: #fff; border: 1.5px solid #e8e8e8;
          border-radius: 100px; padding: 5px 14px;
          font-size: 0.78rem; font-weight: 600; color: #444;
          transition: border-color 0.2s, color 0.2s;
        }
        .ab-country-pill:hover { border-color: #1a90c8; color: #1a90c8; }

        /* right side: stat cards */
        .ab-hero-right {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          padding-bottom: 40px;
        }
        .ab-stat-card {
          background: #fff;
          border: 1px solid #ebebeb;
          border-radius: 14px;
          padding: 22px 20px;
          position: relative;
          overflow: hidden;
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .ab-stat-card:hover { box-shadow: 0 6px 24px rgba(0,0,0,0.08); transform: translateY(-3px); }
        .ab-stat-bar {
          position: absolute; top: 0; left: 0; right: 0;
          height: 3px; border-radius: 14px 14px 0 0;
        }
        .ab-stat-value {
          font-family: 'Fraunces', serif;
          font-size: 2rem; font-weight: 700;
          line-height: 1.1; margin-top: 4px;
          color: #111;
        }
        .ab-stat-label {
          font-size: 0.73rem; font-weight: 500;
          color: #aaa; margin-top: 4px;
          text-transform: uppercase; letter-spacing: 0.08em;
        }

        /* ── SINCE BANNER ── */
        .ab-since {
          background: #111;
          padding: 18px 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 32px;
          flex-wrap: wrap;
        }
        .ab-since-text {
          font-size: 0.8rem; font-weight: 500;
          color: rgba(255,255,255,0.5);
          letter-spacing: 0.1em; text-transform: uppercase;
        }
        .ab-since-dots { display: flex; gap: 10px; align-items: center; }
        .ab-since-dot { width: 8px; height: 8px; border-radius: 50%; }

        /* ── SECTION WRAPPER ── */
        .ab-section {
          max-width: 1040px;
          margin: 0 auto;
          padding: 80px 48px;
        }
        .ab-section-label {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 12px;
        }
        .ab-section-label-line { width: 28px; height: 2px; border-radius: 2px; }
        .ab-section-label-text {
          font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase; color: #aaa;
        }
        .ab-section-title {
          font-family: 'Fraunces', serif;
          font-size: clamp(1.8rem, 3.5vw, 2.6rem);
          font-weight: 700; color: #111;
          line-height: 1.18; letter-spacing: -0.02em;
          margin-bottom: 16px;
        }
        .ab-section-sub {
          font-size: 0.88rem; color: #888;
          line-height: 1.75; max-width: 520px;
        }

        /* ── CEO CARD ── */
        .ab-ceo-wrap {
          background: #f7f8fa;
          border: 1px solid #ebebeb;
          border-radius: 20px;
          padding: 40px;
          display: grid;
          grid-template-columns: 180px 1fr;
          gap: 40px;
          align-items: center;
          margin-top: 48px;
          position: relative;
          overflow: hidden;
        }
        .ab-ceo-wrap::before {
          content: '"';
          position: absolute;
          top: -10px; right: 32px;
          font-family: 'Fraunces', serif;
          font-size: 140px;
          color: rgba(26,144,200,0.07);
          line-height: 1;
          pointer-events: none;
        }
        .ab-ceo-photo-wrap {
          display: flex; flex-direction: column; align-items: center; gap: 12px;
        }
        .ab-ceo-photo {
          width: 140px; height: 140px;
          border-radius: 16px;
          background: linear-gradient(135deg, #e8e8e8, #d0d0d0);
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
          border: 3px solid #fff;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        .ab-ceo-photo svg { color: #bbb; }
        .ab-ceo-name {
          font-family: 'Fraunces', serif;
          font-size: 1rem; font-weight: 600;
          color: #111; text-align: center;
        }
        .ab-ceo-role {
          font-size: 0.72rem; font-weight: 500;
          color: #1a90c8; text-transform: uppercase;
          letter-spacing: 0.1em; text-align: center;
        }
        .ab-ceo-tag {
          font-size: 0.65rem; font-weight: 700;
          letter-spacing: 0.15em; text-transform: uppercase;
          color: #e8352a; margin-bottom: 8px;
        }
        .ab-ceo-quote-title {
          font-family: 'Fraunces', serif;
          font-size: 1.4rem; font-weight: 600;
          color: #111; margin-bottom: 14px;
          line-height: 1.25;
        }
        .ab-ceo-quote-text {
          font-size: 0.875rem; color: #666;
          line-height: 1.8; font-weight: 400;
        }
        .ab-ceo-accent {
          width: 3px; height: 100%;
          background: linear-gradient(to bottom, #e8352a, #1a90c8);
          border-radius: 2px;
          position: absolute;
          left: 0; top: 0;
          border-radius: 20px 0 0 20px;
        }

        /* ── DIVIDER ── */
        .ab-divider {
          max-width: 1040px; margin: 0 auto;
          padding: 0 48px;
        }
        .ab-divider hr {
          border: none; border-top: 1px solid #f0f0f0;
        }

        /* ── MVG CARDS ── */
        .ab-mvg-section {
          max-width: 1040px; margin: 0 auto;
          padding: 80px 48px;
        }
        .ab-mvg-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-top: 48px;
        }
        .ab-mvg-card {
          border: 1px solid #ebebeb;
          border-radius: 16px;
          padding: 32px 28px;
          background: #fff;
          transition: box-shadow 0.22s, transform 0.22s;
          position: relative;
          overflow: hidden;
        }
        .ab-mvg-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.08); transform: translateY(-4px); }
        .ab-mvg-card-top-bar {
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
        }
        .ab-mvg-icon {
          width: 52px; height: 52px;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 20px;
          margin-top: 8px;
        }
        .ab-mvg-title {
          font-family: 'Fraunces', serif;
          font-size: 1.2rem; font-weight: 700;
          color: #111; margin-bottom: 12px;
        }
        .ab-mvg-text {
          font-size: 0.855rem; color: #777;
          line-height: 1.75; font-weight: 400;
        }

        /* ── WHY US ── */
        .ab-why {
          background: #f7f8fa;
          padding: 80px 48px;
        }
        .ab-why-inner { max-width: 1040px; margin: 0 auto; }
        .ab-why-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-top: 48px;
        }
        .ab-why-item {
          background: #fff;
          border: 1px solid #ebebeb;
          border-radius: 12px;
          padding: 24px 22px;
          display: flex;
          gap: 16px;
          align-items: flex-start;
          transition: box-shadow 0.18s;
        }
        .ab-why-item:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.07); }
        .ab-why-num {
          font-family: 'Fraunces', serif;
          font-size: 2rem; font-weight: 700;
          line-height: 1; flex-shrink: 0;
          opacity: 0.18;
        }
        .ab-why-content-title {
          font-weight: 600; font-size: 0.92rem;
          color: #111; margin-bottom: 5px;
        }
        .ab-why-content-text { font-size: 0.82rem; color: #999; line-height: 1.65; }

        /* ── CTA ── */
        .ab-cta {
          padding: 80px 48px;
          text-align: center;
        }
        .ab-cta-inner {
          max-width: 600px; margin: 0 auto;
          background: #111;
          border-radius: 24px;
          padding: 56px 48px;
          position: relative;
          overflow: hidden;
        }
        .ab-cta-inner::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 60% 60% at 80% 20%, rgba(232,53,42,0.15), transparent),
                      radial-gradient(ellipse 50% 50% at 20% 80%, rgba(26,144,200,0.12), transparent);
          pointer-events: none;
        }
        .ab-cta-title {
          font-family: 'Fraunces', serif;
          font-size: 2rem; font-weight: 700;
          color: #fff; margin-bottom: 12px;
          position: relative;
        }
        .ab-cta-sub {
          font-size: 0.875rem; color: rgba(255,255,255,0.5);
          line-height: 1.7; margin-bottom: 32px;
          position: relative;
        }
        .ab-cta-btns {
          display: flex; gap: 12px;
          justify-content: center; flex-wrap: wrap;
          position: relative;
        }
        .ab-cta-btn-primary {
          background: #e8352a; color: #fff;
          border: none; border-radius: 8px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.85rem; font-weight: 600;
          padding: 13px 28px; cursor: pointer;
          transition: background 0.18s, transform 0.15s;
        }
        .ab-cta-btn-primary:hover { background: #c8281e; transform: translateY(-1px); }
        .ab-cta-btn-sec {
          background: rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.7);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 8px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.85rem; font-weight: 500;
          padding: 13px 28px; cursor: pointer;
          transition: background 0.18s, color 0.18s;
        }
        .ab-cta-btn-sec:hover { background: rgba(255,255,255,0.15); color: #fff; }

        /* RESPONSIVE */
        @media (max-width: 900px) {
          .ab-hero-inner { grid-template-columns: 1fr; gap: 32px; }
          .ab-hero { padding: 60px 20px 0; min-height: auto; }
          .ab-hero-right { padding-bottom: 40px; }
          .ab-ceo-wrap { grid-template-columns: 1fr; text-align: center; }
          .ab-ceo-accent { display: none; }
          .ab-mvg-grid { grid-template-columns: 1fr; }
          .ab-why-grid { grid-template-columns: 1fr; }
          .ab-section, .ab-mvg-section, .ab-why, .ab-cta { padding-left: 20px; padding-right: 20px; }
          .ab-divider { padding: 0 20px; }
          .ab-since { padding: 18px 20px; }
          .ab-cta-inner { padding: 40px 24px; }
        }
      `}</style>

      <div className="ab-root">

        {/* ── HERO ── */}
        <div className="ab-hero">
          <div className="ab-hero-bg-text">About</div>
          <div className="ab-hero-inner">
            <div className="ab-hero-left">
              <div className="ab-eyebrow">
                <div className="ab-eyebrow-dot" />
                <span className="ab-eyebrow-text">About Us</span>
              </div>
              <h1>
                Empowering<br />
                <em>Nepali Students</em><br />
                Globally
              </h1>
              <p className="ab-hero-desc">
                Since 2025, we have been a trusted partner for Nepali students aspiring to study in the UK, USA, Australia, Canada and Denmark — with a legacy of guidance, integrity, and 100% visa dedication.
              </p>
              <div className="ab-country-pills">
                {countries.map((c) => (
                  <span key={c} className="ab-country-pill">{c}</span>
                ))}
              </div>
            </div>

            <div className="ab-hero-right">
              {stats.map((s, i) => (
                <div className="ab-stat-card" key={i}>
                  <div className="ab-stat-bar" style={{ background: s.color }} />
                  <div className="ab-stat-value" style={{ color: s.color }}>{s.value}</div>
                  <div className="ab-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── SINCE BANNER ── */}
        <div className="ab-since">
          <span className="ab-since-text">Serving since 2025</span>
          <div className="ab-since-dots">
            {["#e8352a","#e8922a","#1a9e5c","#1a90c8"].map((c, i) => (
              <div key={i} className="ab-since-dot" style={{ background: c }} />
            ))}
          </div>
          <span className="ab-since-text">We empower dreams & shape futures</span>
        </div>

        {/* ── ABOUT SECTION + CEO ── */}
        <FadeSection>
          <div className="ab-section">
            <div className="ab-section-label">
              <div className="ab-section-label-line" style={{ background: "#e8352a" }} />
              <span className="ab-section-label-text">Our Story</span>
            </div>
            <h2 className="ab-section-title">Who We Are</h2>
            <p className="ab-section-sub">
              StudySync Educare is more than a consultancy — we are partners in your success story. Our dedicated team works tirelessly to ensure every student gets the right opportunity and feels supported throughout their journey abroad.
            </p>

            {/* CEO CARD */}
            <div className="ab-ceo-wrap">
              <div className="ab-ceo-accent" />
              <div className="ab-ceo-photo-wrap">
                <div className="ab-ceo-photo">
                  {ceo.profileImage ? (
                    <img src={ceo.profileImage} alt={ceo.ceoName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#999", fontWeight: 600 }}>
                      CEO Image
                    </div>
                  )}
                  <div className="ab-ceo-photo-overlay" />
                </div>
                <div className="ab-ceo-name">{ceo.ceoName}</div>
                <div className="ab-ceo-role">{ceo.designation}</div>
              </div>
              <div>
                <div className="ab-ceo-tag">Mission Insights</div>
                <div className="ab-ceo-quote-title">Message from our CEO</div>
                <p className="ab-ceo-quote-text">
                  {ceo.message}
                </p>
                {ceo.linkedinUrl ? (
                  <a
                    href={ceo.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{ marginTop: 12, display: "inline-block", color: "#1a90c8", fontWeight: 600, textDecoration: "none" }}
                  >
                    Connect on LinkedIn
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </FadeSection>

        <div className="ab-divider"><hr /></div>

        {/* ── HEADLINE ── */}
        <FadeSection>
          <div className="ab-section" style={{ paddingBottom: 0 }}>
            <div style={{ textAlign: "center" }}>
              <div className="ab-section-label" style={{ justifyContent: "center" }}>
                <div className="ab-section-label-line" style={{ background: "#1a90c8" }} />
                <span className="ab-section-label-text">Our Foundation</span>
                <div className="ab-section-label-line" style={{ background: "#1a90c8" }} />
              </div>
              <h2 className="ab-section-title" style={{ textAlign: "center" }}>
                Empowering Students to<br />Succeed Beyond Borders
              </h2>
            </div>
          </div>
        </FadeSection>

        {/* ── MVG GRID ── */}
        <FadeSection>
          <div className="ab-mvg-section" style={{ paddingTop: 32 }}>
            <div className="ab-mvg-grid">
              {mvg.map((item) => (
                <div className="ab-mvg-card" key={item.key}>
                  <div className="ab-mvg-card-top-bar" style={{ background: item.color }} />
                  <div className="ab-mvg-icon" style={{ background: item.bg, color: item.color }}>
                    {item.icon}
                  </div>
                  <div className="ab-mvg-title">{item.title}</div>
                  <p className="ab-mvg-text">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeSection>

        <StaffTeam />

        {/* ── WHY US ── */}
        <FadeSection>
          <div className="ab-why">
            <div className="ab-why-inner">
              <div className="ab-section-label">
                <div className="ab-section-label-line" style={{ background: "#1a9e5c" }} />
                <span className="ab-section-label-text">Why Choose Us</span>
              </div>
              <h2 className="ab-section-title">Why Students Trust Us</h2>
              <div className="ab-why-grid">
                {[
                  { n: "01", color: "#e8352a", title: "Expert Counselling", text: "Personalized guidance from experienced counsellors who understand each student's unique goals." },
                  { n: "02", color: "#e8922a", title: "99%+ Visa Success", text: "Meticulous documentation and preparation that consistently achieves the highest visa approval rates in Nepal." },
                  { n: "03", color: "#1a9e5c", title: "Global University Network", text: "Partnerships with hundreds of top universities across the UK, USA, Australia, Canada, and Denmark." },
                  { n: "04", color: "#1a90c8", title: "End-to-End Support", text: "From course selection and applications to pre-departure briefings and alumni mentoring after arrival." },
                ].map((w) => (
                  <div className="ab-why-item" key={w.n}>
                    <div className="ab-why-num" style={{ color: w.color }}>{w.n}</div>
                    <div>
                      <div className="ab-why-content-title">{w.title}</div>
                      <p className="ab-why-content-text">{w.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeSection>

        {/* ── CTA ── */}
        <FadeSection>
          <div className="ab-cta">
            <div className="ab-cta-inner">
              <div className="ab-cta-title">Ready to Begin Your Journey?</div>
              <p className="ab-cta-sub">Join thousands of Nepali students who have already shaped their futures with our guidance.</p>
              <div className="ab-cta-btns">
                <button className="ab-cta-btn-primary">Book a Free Consultation</button>
                <button className="ab-cta-btn-sec">Contact Us →</button>
              </div>
            </div>
          </div>
        </FadeSection>

      </div>
    </>
  );
}
