"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const FALLBACK_SERVICES = [
  {
    id: "01",
    slug: "study-abroad-counselling",
    title: "Study Abroad Counselling",
    tagline: "Your dream destination, mapped.",
    color: "#e8352a",
    bg: "#fff0ef",
    desc: "Personalized one-on-one counselling to help you choose the right country, university, and course — aligned with your academic background, career goals, and budget.",
    features: ["Country & university shortlisting", "Course & intake selection", "Profile evaluation", "Career pathway planning"],
    stat: "10+",
    statLabel: "Countries Covered",
  },
  {
    id: "02",
    slug: "university-applications",
    title: "University & College Applications",
    tagline: "Applications that open doors.",
    color: "#e8922a",
    bg: "#fff7ee",
    desc: "End-to-end application management — from SOP writing and document preparation to submission tracking and offer letter follow-up.",
    features: ["SOP & personal statement drafting", "Document checklist & preparation", "Application portal submission", "Offer letter follow-up"],
    stat: "500+",
    statLabel: "Applications Processed",
  },
  {
    id: "03",
    slug: "visa-documentation",
    title: "Visa Documentation & Guidance",
    tagline: "99%+ success, zero guesswork.",
    color: "#1a9e5c",
    bg: "#edf9f3",
    desc: "Meticulous visa file preparation with expert review at every step. We handle complex cases and ensure your application meets every requirement.",
    features: ["Visa document checklist", "Financial document guidance", "Mock visa interview prep", "Embassy appointment support"],
    stat: "99%+",
    statLabel: "Visa Success Rate",
  },
  {
    id: "04",
    slug: "career-counselling",
    title: "Career Counselling & Course Selection",
    tagline: "Choose smart. Grow faster.",
    color: "#1a90c8",
    bg: "#edf6fb",
    desc: "Data-driven career guidance that maps your skills and interests to the most in-demand courses and industries across global markets.",
    features: ["Personality & skills assessment", "Industry demand analysis", "Course comparison & selection", "Post-study work pathway advice"],
    stat: "700+",
    statLabel: "Students Guided",
  },
  {
    id: "05",
    slug: "ielts-preparation",
    title: "IELTS & Test Preparation Support",
    tagline: "Score higher. Apply stronger.",
    color: "#e8352a",
    bg: "#fff0ef",
    desc: "Structured IELTS, PTE, and Duolingo preparation with practice tests, score analysis, and targeted improvement strategies to hit your target band score.",
    features: ["Full-length mock tests", "Band score analysis", "Speaking & writing coaching", "PTE & Duolingo guidance"],
    stat: "6.5+",
    statLabel: "Avg. Band Score",
  },
];

const stats = [
  { value: "5000+", label: "Visa Approvals", color: "#e8352a" },
  { value: "99%+", label: "Success Rate", color: "#e8922a" },
  { value: "700+", label: "Students / Year", color: "#1a9e5c" },
  { value: "2005", label: "Est. Year", color: "#1a90c8" },
];

function useInView(threshold = 0.12) {
  const ref = useRef(null);
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

function AnimatedSection({ children, delay = 0, style = {} }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.65s ${delay}s ease, transform 0.65s ${delay}s ease`,
      ...style,
    }}>
      {children}
    </div>
  );
}

function ServiceCard({ service, index }) {
  const [hovered, setHovered] = useState(false);
  const [ref, inView] = useInView();
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.6s ${index * 0.1}s ease, transform 0.6s ${index * 0.1}s ease`,
      }}
    >
      <div
        className="sv-card"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          '--card-color': service.color,
          '--card-bg': service.bg,
          boxShadow: hovered ? `0 16px 48px ${service.color}22` : "0 2px 12px rgba(0,0,0,0.06)",
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
        }}
      >
        {/* TOP ACCENT */}
        <div className="sv-card-accent" style={{ background: service.color }} />

        <div className="sv-card-inner">
          {/* HEADER ROW */}
          <div className="sv-card-header">
            <div className="sv-card-num" style={{ color: service.color, borderColor: service.color + "30" }}>
              {service.id}
            </div>
            <div className="sv-card-icon" style={{ background: service.bg, color: service.color }}>
              {serviceIcons[index % serviceIcons.length]}
            </div>
          </div>

          {/* TITLE */}
          <div className="sv-card-tagline" style={{ color: service.color }}>{service.tagline}</div>
          <h3 className="sv-card-title">{service.title}</h3>
          <p className="sv-card-desc">{service.desc}</p>

          {/* FEATURES */}
          <ul className="sv-card-features">
            {service.features.map((f, i) => (
              <li key={i} className="sv-card-feature">
                <span className="sv-feat-dot" style={{ background: service.color }} />
                {f}
              </li>
            ))}
          </ul>

          {/* STAT + CTA */}
          <div className="sv-card-footer">
            <div>
              <div className="sv-card-stat" style={{ color: service.color }}>{service.stat}</div>
              <div className="sv-card-stat-label">{service.statLabel}</div>
            </div>
            <Link href="/contact" className="sv-card-cta" style={{ background: hovered ? service.color : "transparent", color: hovered ? "#fff" : service.color, borderColor: service.color }}>
              Get Started →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  const [services, setServices] = useState(FALLBACK_SERVICES);
  const [sectionData, setSectionData] = useState({
    subtitle: "Our Services",
    title: "Five Ways We Shape Your Future",
    description:
      "We support your full study abroad journey with expert guidance, documentation support, and career-focused planning.",
    pointsLabel: "5 Core Services",
  });

  useEffect(() => {
    let ignore = false;
    async function loadServicesContent() {
      try {
        const res = await fetch("/api/services-page", { cache: "no-store" });
        const data = await res.json();
        if (!ignore && data?.success) {
          if (Array.isArray(data.services) && data.services.length) {
            setServices(data.services);
          }
          if (data.section) {
            setSectionData({
              subtitle: data.section.subtitle || "Our Services",
              title: data.section.title || "Five Ways We Shape Your Future",
              description: data.section.description || "",
              pointsLabel: data.section.pointsLabel || `${data.services?.length || 0} Core Services`,
            });
          }
        }
      } catch (error) {
        console.error("Failed to load services page data", error);
      }
    }
    loadServicesContent();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;600;700;800&family=Nunito:wght@400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .sv-root {
          font-family: 'Nunito', sans-serif;
          background: #f8f8fc;
          color: #151520;
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* ── TOPBAR ── */
        .sv-topbar {
          background: #ffffff;
          border-bottom: 1px solid #e8e8f3;
          padding: 0 48px; height: 58px;
          display: flex; align-items: center; gap: 8px;
          position: sticky; top: 0; z-index: 100;
          backdrop-filter: blur(12px);
        }
        .sv-dot { width: 8px; height: 8px; border-radius: 50%; }
        .sv-brand { font-family: 'Bricolage Grotesque', sans-serif; font-size: 0.92rem; font-weight: 800; color: #151520; margin-left: 6px; letter-spacing: 0.02em; }
        .sv-sep { width: 1px; height: 16px; background: #ddddeb; margin: 0 12px; }
        .sv-page-crumb { font-size: 0.75rem; color: #6d6e7f; }
        .sv-topbar-cta {
          margin-left: auto;
          background: #e8352a; color: #fff;
          border: none; border-radius: 6px;
          font-family: 'Nunito', sans-serif;
          font-size: 0.75rem; font-weight: 500;
          padding: 8px 18px; cursor: pointer;
          text-decoration: none;
          transition: background 0.18s;
        }
        .sv-topbar-cta:hover { background: #cd2f23; }

        /* ── HERO ── */
        .sv-hero {
          position: relative;
          padding: 100px 48px 80px;
          overflow: hidden;
          border-bottom: 1px solid #ececf4;
          background: #ffffff;
        }
        .sv-hero-grid-bg {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(31,35,56,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(31,35,56,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }
        .sv-hero-glow {
          position: absolute;
          width: 500px; height: 500px;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
        }
        .sv-hero-inner {
          max-width: 1080px; margin: 0 auto;
          position: relative; z-index: 1;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 60px;
          align-items: center;
        }

        .sv-hero-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          border: 1px solid rgba(232,53,42,0.4);
          border-radius: 100px; padding: 5px 14px 5px 8px;
          margin-bottom: 20px;
        }
        .sv-hero-eyebrow-dot {
          width: 7px; height: 7px; border-radius: 50%; background: #e8352a;
          animation: svPulse 2s ease infinite;
        }
        @keyframes svPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.85); }
        }
        .sv-hero-eyebrow-text {
          font-size: 0.68rem; font-weight: 500;
          letter-spacing: 0.18em; text-transform: uppercase; color: #e8352a;
        }
        .sv-hero h1 {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: clamp(2.8rem, 6vw, 5rem);
          font-weight: 800; color: #151520;
          line-height: 1.05; letter-spacing: -0.03em;
          margin-bottom: 20px;
        }
        .sv-hero h1 .sv-h1-line2 { color: #e8352a; display: block; }
        .sv-hero-sub {
          font-size: 0.95rem; color: #5d6076;
          line-height: 1.8; max-width: 500px; font-weight: 300;
        }
        .sv-hero-disclaimer {
          margin-top: 28px;
          display: inline-flex; align-items: flex-start; gap: 10px;
          background: #f7f8ff;
          border: 1px solid #e6e9f7;
          border-radius: 10px; padding: 14px 18px;
          max-width: 500px;
        }
        .sv-hero-disclaimer-icon { flex-shrink: 0; margin-top: 1px; opacity: 0.5; }
        .sv-hero-disclaimer-text {
          font-size: 0.775rem; color: #606377;
          line-height: 1.65; font-weight: 300;
        }

        /* HERO STATS */
        .sv-hero-stats {
          display: flex; flex-direction: column; gap: 16px;
        }
        .sv-hero-stat {
          background: #ffffff;
          border: 1px solid #e7e8f3;
          border-radius: 14px; padding: 20px 24px;
          text-align: center; min-width: 140px;
          transition: border-color 0.2s;
          position: relative; overflow: hidden;
        }
        .sv-hero-stat::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
        }
        .sv-hero-stat:hover { border-color: #cfd2e6; }
        .sv-hero-stat-val {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 1.8rem; font-weight: 800;
          line-height: 1; margin-bottom: 4px;
        }
        .sv-hero-stat-lbl {
          font-size: 0.68rem; color: #73758a;
          text-transform: uppercase; letter-spacing: 0.1em; font-weight: 400;
        }

        /* ── SERVICES GRID ── */
        .sv-main {
          max-width: 1080px; margin: 0 auto;
          padding: 72px 48px 80px;
        }
        .sv-section-header {
          display: flex; align-items: flex-end;
          justify-content: space-between; gap: 24px;
          margin-bottom: 52px; flex-wrap: wrap;
        }
        .sv-section-label {
          font-size: 0.68rem; font-weight: 500;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: #7a7c90; margin-bottom: 10px;
          display: flex; align-items: center; gap: 10px;
        }
        .sv-section-label::before {
          content: '';
          display: inline-block; width: 24px; height: 1px;
          background: #e8352a;
        }
        .sv-section-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: clamp(1.8rem, 3.5vw, 2.6rem);
          font-weight: 800; color: #151520;
          line-height: 1.15; letter-spacing: -0.025em;
        }
        .sv-count-badge {
          background: #ffffff;
          border: 1px solid #e7e8f3;
          border-radius: 100px; padding: 6px 16px;
          font-size: 0.75rem; color: #606377;
          font-weight: 400; white-space: nowrap; align-self: flex-start;
          margin-top: 8px;
        }

        .sv-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        /* 5th card spans 2 cols for balance */
        .sv-grid > *:nth-child(4) { grid-column: span 1; }
        .sv-grid > *:nth-child(5) { grid-column: span 2; }

        /* ── CARD ── */
        .sv-card {
          background: #ffffff;
          border: 1px solid #e7e8f3;
          border-radius: 16px;
          overflow: hidden;
          transition: box-shadow 0.3s, transform 0.3s, border-color 0.3s;
          position: relative;
        }
        .sv-card:hover { border-color: #cfd2e6; }
        .sv-card-accent {
          height: 3px; width: 100%;
        }
        .sv-card-inner { padding: 28px 28px 26px; }
        .sv-card-header {
          display: flex; align-items: center;
          justify-content: space-between; margin-bottom: 18px;
        }
        .sv-card-num {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 0.75rem; font-weight: 800;
          letter-spacing: 0.1em;
          border: 1px solid; border-radius: 6px;
          padding: 4px 10px;
        }
        .sv-card-icon {
          width: 52px; height: 52px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
        }
        .sv-card-tagline {
          font-size: 0.7rem; font-weight: 500;
          letter-spacing: 0.1em; text-transform: uppercase;
          margin-bottom: 6px;
        }
        .sv-card-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 1.15rem; font-weight: 700;
          color: #151520; line-height: 1.25;
          margin-bottom: 12px; letter-spacing: -0.01em;
        }
        .sv-card-desc {
          font-size: 0.825rem; color: #616379;
          line-height: 1.75; font-weight: 300; margin-bottom: 20px;
        }
        .sv-card-features {
          list-style: none; padding: 0; margin: 0 0 24px;
          display: flex; flex-direction: column; gap: 8px;
          border-top: 1px solid #ececf4;
          padding-top: 18px;
        }
        .sv-card-feature {
          display: flex; align-items: center; gap: 10px;
          font-size: 0.8rem; color: #4f5268;
          font-weight: 400;
        }
        .sv-feat-dot {
          width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0;
        }
        .sv-card-footer {
          display: flex; align-items: center;
          justify-content: space-between; gap: 12px;
          border-top: 1px solid #ececf4;
          padding-top: 20px;
        }
        .sv-card-stat {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 1.6rem; font-weight: 800; line-height: 1;
        }
        .sv-card-stat-label {
          font-size: 0.68rem; color: #7b7d90;
          text-transform: uppercase; letter-spacing: 0.08em; margin-top: 3px;
        }
        .sv-card-cta {
          border: 1.5px solid;
          border-radius: 8px; padding: 9px 18px;
          font-family: 'Nunito', sans-serif;
          font-size: 0.78rem; font-weight: 500;
          text-decoration: none; white-space: nowrap;
          transition: background 0.2s, color 0.2s;
        }

        /* ── DISCLAIMER BANNER ── */
        .sv-disclaimer {
          max-width: 1080px; margin: 0 auto;
          padding: 0 48px 48px;
        }
        .sv-disclaimer-inner {
          background: #ffffff;
          border: 1px solid #e7e8f3;
          border-radius: 14px; padding: 28px 32px;
          display: flex; gap: 20px; align-items: flex-start;
        }
        .sv-disclaimer-icon-wrap {
          width: 44px; height: 44px; border-radius: 10px;
          background: rgba(232,53,42,0.12);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; color: #e8352a;
        }
        .sv-disclaimer-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 0.95rem; font-weight: 700;
          color: #151520; margin-bottom: 6px;
        }
        .sv-disclaimer-body {
          font-size: 0.825rem; color: #5f6277;
          line-height: 1.75; font-weight: 300;
        }

        /* ── CTA STRIP ── */
        .sv-cta {
          max-width: 1080px; margin: 0 auto;
          padding: 0 48px 80px;
        }
        .sv-cta-inner {
          background: #ffffff;
          border: 1px solid #e7e8f3;
          border-radius: 20px; padding: 60px;
          display: flex; align-items: center;
          justify-content: space-between; gap: 40px;
          flex-wrap: wrap; position: relative; overflow: hidden;
        }
        .sv-cta-inner::before {
          content: '';
          position: absolute; top: -80px; right: -80px;
          width: 300px; height: 300px; border-radius: 50%;
          background: radial-gradient(circle, rgba(232,53,42,0.12), transparent 70%);
          pointer-events: none;
        }
        .sv-cta-inner::after {
          content: '';
          position: absolute; bottom: -60px; left: 40px;
          width: 200px; height: 200px; border-radius: 50%;
          background: radial-gradient(circle, rgba(26,144,200,0.08), transparent 70%);
          pointer-events: none;
        }
        .sv-cta-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          font-weight: 800; color: #151520;
          line-height: 1.2; letter-spacing: -0.02em;
          margin-bottom: 10px; position: relative;
        }
        .sv-cta-sub {
          font-size: 0.875rem; color: #5f6277;
          font-weight: 300; line-height: 1.7; position: relative;
        }
        .sv-cta-btns {
          display: flex; gap: 12px; flex-wrap: wrap; position: relative;
        }
        .sv-cta-btn-primary {
          background: #e8352a; color: #fff; border: none;
          border-radius: 10px; font-family: 'Nunito', sans-serif;
          font-size: 0.875rem; font-weight: 500;
          padding: 15px 32px; cursor: pointer;
          text-decoration: none; display: inline-block;
          transition: background 0.18s, transform 0.15s;
        }
        .sv-cta-btn-primary:hover { background: #cd2f23; transform: translateY(-2px); }
        .sv-cta-btn-sec {
          background: transparent; color: #4f5268;
          border: 1px solid #d8dbec;
          border-radius: 10px; font-family: 'Nunito', sans-serif;
          font-size: 0.875rem; font-weight: 400;
          padding: 15px 32px; cursor: pointer;
          text-decoration: none; display: inline-block;
          transition: border-color 0.18s, color 0.18s;
        }
        .sv-cta-btn-sec:hover { border-color: #aeb3d3; color: #151520; }

        /* DOTS */
        .sv-dots-strip {
          display: flex; justify-content: center;
          gap: 10px; padding: 24px 0;
        }

        @media (max-width: 900px) {
          .sv-grid { grid-template-columns: 1fr 1fr; }
          .sv-grid > *:nth-child(5) { grid-column: span 2; }
          .sv-hero-inner { grid-template-columns: 1fr; }
          .sv-hero-stats { flex-direction: row; flex-wrap: wrap; justify-content: flex-start; }
          .sv-hero-stat { min-width: 120px; }
          .sv-hero { padding: 60px 20px 56px; }
          .sv-main, .sv-disclaimer, .sv-cta { padding-left: 20px; padding-right: 20px; }
          .sv-topbar { padding: 0 20px; }
          .sv-cta-inner { padding: 36px 28px; }
        }
        @media (max-width: 600px) {
          .sv-grid { grid-template-columns: 1fr; }
          .sv-grid > *:nth-child(5) { grid-column: span 1; }
          .sv-cta-inner { flex-direction: column; }
        }
      `}</style>

      <div className="sv-root">

        {/* ── TOPBAR ── */}
        <div className="sv-topbar">
          <div className="sv-dot" style={{ background: "#e8352a" }} />
          <div className="sv-dot" style={{ background: "#e8922a" }} />
          <div className="sv-dot" style={{ background: "#1a9e5c" }} />
          <div className="sv-dot" style={{ background: "#1a90c8" }} />
          <span className="sv-brand">Study Sync</span>
          <div className="sv-sep" />
          <span className="sv-page-crumb">Our Services</span>
          <Link href="/free-consultant" className="sv-topbar-cta">Book Free Consultation</Link>
        </div>

        {/* ── HERO ── */}
        <section className="sv-hero">
          <div className="sv-hero-grid-bg" />
          <div className="sv-hero-glow" style={{ background: "#e8352a", top: -200, left: -100, opacity: 0.08 }} />
          <div className="sv-hero-glow" style={{ background: "#1a90c8", bottom: -200, right: -100, opacity: 0.06 }} />

          <div className="sv-hero-inner">
            <AnimatedSection>
              <div className="sv-hero-eyebrow">
                <div className="sv-hero-eyebrow-dot" />
                <span className="sv-hero-eyebrow-text">What We Offer</span>
              </div>
              <h1>
                Everything You Need
                <span className="sv-h1-line2">To Study Abroad.</span>
              </h1>
              <p className="sv-hero-sub">
                Study Sync Private Limited provides comprehensive educational consultancy services — from choosing the right university to landing your visa successfully.
              </p>
              <div className="sv-hero-disclaimer">
                <svg className="sv-hero-disclaimer-icon" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                </svg>
                <span className="sv-hero-disclaimer-text">
                  We act as a guidance and application support provider. We do not guarantee admission or visa approval — final decisions rest with universities, embassies, and immigration authorities.
                </span>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="sv-hero-stats">
                {stats.map((s) => (
                  <div key={s.label} className="sv-hero-stat" style={{ '--stat-color': s.color }}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: s.color }} />
                    <div className="sv-hero-stat-val" style={{ color: s.color }}>{s.value}</div>
                    <div className="sv-hero-stat-lbl">{s.label}</div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <main className="sv-main">
          <AnimatedSection>
            <div className="sv-section-header">
              <div>
                <div className="sv-section-label">{sectionData.subtitle}</div>
                <h2 className="sv-section-title">{sectionData.title}</h2>
                <p style={{ color: "#4f5268", marginTop: 10, maxWidth: 560, lineHeight: 1.7 }}>
                  {sectionData.description}
                </p>
              </div>
              <div className="sv-count-badge">{sectionData.pointsLabel || `${services.length} Core Services`}</div>
            </div>
          </AnimatedSection>

          <div className="sv-grid">
            {services.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        </main>

        {/* ── DISCLAIMER ── */}
        <AnimatedSection>
          <div className="sv-disclaimer">
            <div className="sv-disclaimer-inner">
              <div className="sv-disclaimer-icon-wrap">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                </svg>
              </div>
              <div>
                <div className="sv-disclaimer-title">Important Notice</div>
                <p className="sv-disclaimer-body">
                  Study Sync Private Limited acts only as a guidance and application support provider. We do not guarantee admission to any institution or approval of any visa application. Final decisions are made solely by universities, colleges, embassies, and immigration authorities. Our role is to maximise your chances through expert guidance, complete documentation, and thorough preparation.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* ── CTA ── */}
        <AnimatedSection>
          <div className="sv-cta">
            <div className="sv-cta-inner">
              <div>
                <div className="sv-cta-title">Ready to Begin<br />Your Journey?</div>
                <p className="sv-cta-sub">Book a free consultation and let our experts guide you to the right path.</p>
              </div>
              <div className="sv-cta-btns">
                <Link href="/contact" className="sv-cta-btn-primary">Book Free Consultation</Link>
                <Link href="/about" className="sv-cta-btn-sec">Learn About Us →</Link>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* DOTS */}
        <div className="sv-dots-strip">
          {["#e8352a","#e8922a","#1a9e5c","#1a90c8"].map((c) => (
            <div key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c, opacity: 0.7 }} />
          ))}
        </div>

      </div>
    </>
  );
}
  const serviceIcons = [
    <svg key="a" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253" /></svg>,
    <svg key="b" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 3.741-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" /></svg>,
    <svg key="c" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" /></svg>,
    <svg key="d" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" /></svg>,
    <svg key="e" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>,
  ];
