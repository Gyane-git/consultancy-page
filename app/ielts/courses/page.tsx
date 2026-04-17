"use client";

import React, { useState, useEffect, useRef } from "react";
import { CheckCircle, Star, Award, BookOpen } from "lucide-react";

// ─── Brand palette (extracted from logo) ────────────────────────────────────
// Red: #e53935 | Orange: #f4a01c | Teal: #29a8d4 | Green: #2eaa62

const COURSES = [
  {
    title: "Foundations",
    label: "Beginner",
    week: "4 Weeks",
    desc: "Listening, reading basics, grammar and vocabulary — built for students starting from zero.",
    icon: BookOpen,
    accent: "#29a8d4",
    accentLight: "#e8f6fb",
    num: "01",
  },
  {
    title: "Target Band",
    label: "6 – 7",
    week: "8 Weeks",
    desc: "Structured technique drills, timed tests and weekly mock exams to reach your target.",
    icon: Star,
    accent: "#f4a01c",
    accentLight: "#fef6e4",
    num: "02",
  },
  {
    title: "Advanced Band",
    label: "7+",
    week: "12 Weeks",
    desc: "Intensive 1:1 coaching, essay feedback and speaking clinics for top-tier results.",
    icon: Award,
    accent: "#e53935",
    accentLight: "#fdecea",
    num: "03",
  },
];

const FEATURES = [
  { text: "Real exam simulation", color: "#e53935" },
  { text: "Personal mentorship", color: "#f4a01c" },
  { text: "Flexible class schedule", color: "#29a8d4" },
  { text: "Weekly mock tests", color: "#2eaa62" },
  { text: "AI-based performance tracking", color: "#e53935" },
  { text: "Speaking confidence training", color: "#29a8d4" },
];

const PLANS = [
  { name: "Foundation", price: "$99", tag: "Starter", accent: "#29a8d4", light: "#e8f6fb" },
  { name: "Target 6–7", price: "$249", tag: "Most Popular", accent: "#e53935", light: "#fdecea" },
  { name: "Advanced 7+", price: "$449", tag: "Elite", accent: "#2eaa62", light: "#e6f6ee" },
];

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function useCounter(target, active, duration = 1300) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const numeric = parseFloat(String(target).replace(/[^0-9.]/g, ""));
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(+(numeric * p).toFixed(1));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return val;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatBox({ label, value, suffix, accent }) {
  const [ref, vis] = useInView();
  const count = useCounter(value, vis);
  return (
    <div ref={ref} className="stat-box">
      <span className="stat-num" style={{ color: accent }}>{count}{suffix}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

function BandCalculator() {
  const [scores, setScores] = useState({ listening: "", reading: "", writing: "", speaking: "" });
  const keys = ["listening", "reading", "writing", "speaking"];
  const keyColors = ["#29a8d4", "#f4a01c", "#e53935", "#2eaa62"];

  const band = () => {
    const vals = keys.map((k) => Number(scores[k]));
    if (vals.some((v) => isNaN(v) || v === 0)) return "—";
    const avg = vals.reduce((a, b) => a + b, 0) / 4;
    return (Math.round(avg * 2) / 2).toFixed(1);
  };

  const result = band();
  const numResult = parseFloat(result);
  const resultColor = !isNaN(numResult)
    ? numResult >= 7 ? "#2eaa62" : numResult >= 5.5 ? "#f4a01c" : "#e53935"
    : "#c0c0d0";

  return (
    <div className="calc-card">
      <p className="calc-eyebrow">Estimate Your Score</p>
      <h2 className="calc-title">IELTS Band Calculator</h2>
      <div className="calc-grid">
        {keys.map((k, i) => (
          <div key={k} className="calc-field">
            <label className="calc-label" style={{ color: keyColors[i] }}>
              {k.charAt(0).toUpperCase() + k.slice(1)}
            </label>
            <input
              type="number"
              min={0} max={9} step={0.5}
              placeholder="0 – 9"
              value={scores[k]}
              onChange={(e) => setScores((p) => ({ ...p, [k]: e.target.value }))}
              className="calc-input"
              style={{ "--focus-color": keyColors[i] }}
            />
          </div>
        ))}
      </div>
      <div className="calc-result" style={{ borderColor: result !== "—" ? resultColor : "#e4e8f0" }}>
        <div>
          <p className="calc-result-label">Overall Band Score</p>
          <p className="calc-result-hint">Based on all four components</p>
        </div>
        <span className="calc-result-score" style={{ color: resultColor }}>{result}</span>
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function IELTSCourses() {
  const [coursesRef, coursesVis] = useInView();
  const [featRef, featVis] = useInView();
  const [pricRef, pricVis] = useInView();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=Nunito:ital,opsz,wght@0,6..12,300;0,6..12,400;0,6..12,500;0,6..12,600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #f8f9fc;
          --white: #ffffff;
          --surface: #ffffff;
          --surface2: #f2f4f8;
          --border: #e4e8f0;
          --text: #1a1a2e;
          --muted: #6b7280;
          --red: #e53935;
          --orange: #f4a01c;
          --teal: #29a8d4;
          --green: #2eaa62;
          --font-head: 'Bricolage Grotesque', sans-serif;
          --font-body: 'Nunito', sans-serif;
          --shadow-sm: 0 2px 8px rgba(0,0,0,0.06);
          --shadow-md: 0 8px 24px rgba(0,0,0,0.10);
          --shadow-lg: 0 20px 48px rgba(0,0,0,0.12);
        }

        body { background: var(--bg); color: var(--text); font-family: var(--font-body); }

        /* ── HERO ───────────────────────────────────────────────────────── */
        .hero {
          position: relative;
          min-height: 92vh;
          display: flex;
          align-items: center;
          padding: 80px 6vw 60px;
          overflow: hidden;
          background: var(--white);
        }
        .hero-blob { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.15; }
        .hero-inner {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }
        @media (max-width: 860px) {
          .hero-inner { grid-template-columns: 1fr; gap: 48px; }
          .hero-visual { display: none; }
        }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 6px 16px; border-radius: 100px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--teal);
          background: #e8f6fb; border: 1px solid rgba(41,168,212,0.25);
          margin-bottom: 24px; width: fit-content;
        }
        .hero-badge span {
          width: 6px; height: 6px; background: var(--teal);
          border-radius: 50%; animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }
        .hero-h1 {
          font-family: var(--font-head);
          font-size: clamp(2.8rem, 5vw, 5rem);
          font-weight: 800; line-height: 1.05;
          letter-spacing: -0.03em; margin-bottom: 22px; color: var(--text);
        }
        .w-red { color: var(--red); }
        .w-teal { color: var(--teal); }
        .w-green { color: var(--green); }
        .w-orange { color: var(--orange); }
        .hero-sub {
          font-size: 1.05rem; color: var(--muted); line-height: 1.75;
          max-width: 440px; margin-bottom: 40px;
        }
        .hero-cta { display: flex; gap: 14px; flex-wrap: wrap; }
        .btn-primary {
          padding: 14px 30px; background: var(--red); color: #fff;
          font-family: var(--font-head); font-weight: 700; font-size: 14px;
          letter-spacing: 0.04em; border-radius: 10px; border: none;
          cursor: pointer; text-decoration: none; display: inline-block;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 16px rgba(229,57,53,0.3);
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(229,57,53,0.4); }
        .btn-ghost {
          padding: 14px 30px; background: transparent; color: var(--text);
          font-family: var(--font-head); font-weight: 600; font-size: 14px;
          letter-spacing: 0.04em; border-radius: 10px;
          border: 1.5px solid var(--border);
          cursor: pointer; text-decoration: none; display: inline-block;
          transition: border-color 0.2s, background 0.2s, color 0.2s;
        }
        .btn-ghost:hover { border-color: var(--teal); background: #e8f6fb; color: var(--teal); }

        /* Hero visual cards */
        .hero-visual { display: flex; align-items: center; justify-content: center; }
        .hero-visual-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 16px; width: 380px;
        }
        .hero-vis-card {
          background: var(--white); border: 1.5px solid var(--border);
          border-radius: 18px; padding: 22px 20px;
          box-shadow: var(--shadow-sm); transition: transform 0.3s, box-shadow 0.3s;
        }
        .hero-vis-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
        .hero-vis-card:nth-child(2) { margin-top: 24px; }
        .hero-vis-card:nth-child(4) { margin-top: -24px; }
        .vis-icon {
          width: 38px; height: 38px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 12px; font-size: 18px;
        }
        .vis-label { font-size: 10px; color: var(--muted); font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 4px; }
        .vis-value { font-family: var(--font-head); font-size: 1.6rem; font-weight: 800; letter-spacing: -0.03em; }

        /* ── STATS STRIP ────────────────────────────────────────────────── */
        .stats-strip {
          background: var(--text); padding: 52px 6vw;
          display: flex; justify-content: center; flex-wrap: wrap;
        }
        .stat-box {
          flex: 1 1 180px; display: flex; flex-direction: column;
          align-items: center; padding: 16px 32px; position: relative;
        }
        .stat-box:not(:last-child)::after {
          content: ''; position: absolute; right: 0; top: 20%; bottom: 20%;
          width: 1px; background: rgba(255,255,255,0.12);
        }
        .stat-num {
          font-family: var(--font-head);
          font-size: clamp(2.4rem, 5vw, 3.2rem);
          font-weight: 800; letter-spacing: -0.04em; line-height: 1;
        }
        .stat-label {
          font-size: 11px; color: rgba(255,255,255,0.5);
          letter-spacing: 0.12em; text-transform: uppercase; margin-top: 8px; font-weight: 600;
        }

        /* ── SECTION ────────────────────────────────────────────────────── */
        .section { padding: 96px 6vw; max-width: 1200px; margin: 0 auto; }
        .section-eyebrow {
          font-size: 11px; font-weight: 700; letter-spacing: 0.2em;
          text-transform: uppercase; margin-bottom: 10px;
        }
        .section-title {
          font-family: var(--font-head);
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 800; letter-spacing: -0.03em;
          margin-bottom: 56px; max-width: 480px; line-height: 1.15;
        }

        /* ── COURSES ────────────────────────────────────────────────────── */
        .courses-outer { background: var(--bg); }
        .courses-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }
        .course-card {
          background: var(--white); border: 1.5px solid var(--border);
          border-radius: 20px; padding: 40px 32px;
          position: relative; overflow: hidden;
          opacity: 0; transform: translateY(36px);
          transition: opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s;
        }
        .course-card.vis { opacity: 1; transform: translateY(0); }
        .course-card:nth-child(1) { transition-delay: 0s; }
        .course-card:nth-child(2) { transition-delay: 0.15s; }
        .course-card:nth-child(3) { transition-delay: 0.3s; }
        .course-card:hover { box-shadow: var(--shadow-lg); }
        .course-top-bar { position: absolute; top: 0; left: 0; right: 0; height: 4px; border-radius: 20px 20px 0 0; }
        .course-num {
          font-family: var(--font-head); font-size: 100px; font-weight: 800;
          position: absolute; top: -16px; right: 20px;
          opacity: 0.05; line-height: 1; pointer-events: none; user-select: none; color: var(--text);
        }
        .course-icon-wrap {
          width: 52px; height: 52px; border-radius: 14px;
          display: flex; align-items: center; justify-content: center; margin-bottom: 24px;
        }
        .course-week { font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 8px; }
        .course-title { font-family: var(--font-head); font-size: 1.6rem; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 4px; color: var(--text); }
        .course-band { font-size: 0.9rem; color: var(--muted); font-weight: 500; margin-bottom: 18px; }
        .course-desc { font-size: 0.9rem; color: var(--muted); line-height: 1.75; }
        .course-link {
          margin-top: 28px; font-family: var(--font-head); font-size: 13px;
          font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
          display: flex; align-items: center; gap: 6px;
          text-decoration: none; opacity: 0.45;
          transition: opacity 0.2s, gap 0.2s;
        }
        .course-card:hover .course-link { opacity: 1; gap: 10px; }

        /* ── FEATURES ───────────────────────────────────────────────────── */
        .features-outer { background: var(--white); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .features-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
        @media (max-width: 768px) { .features-inner { grid-template-columns: 1fr; gap: 40px; } }
        .features-list { display: flex; flex-direction: column; gap: 6px; }
        .feature-row {
          display: flex; align-items: center; gap: 14px; padding: 14px 18px; border-radius: 12px;
          opacity: 0; transform: translateX(-24px);
          transition: opacity 0.5s ease, transform 0.5s ease, background 0.2s; cursor: default;
        }
        .feature-row.vis { opacity: 1; transform: translateX(0); }
        .feature-row:nth-child(1) { transition-delay: 0.05s; }
        .feature-row:nth-child(2) { transition-delay: 0.1s; }
        .feature-row:nth-child(3) { transition-delay: 0.15s; }
        .feature-row:nth-child(4) { transition-delay: 0.2s; }
        .feature-row:nth-child(5) { transition-delay: 0.25s; }
        .feature-row:nth-child(6) { transition-delay: 0.3s; }
        .feature-row:hover { background: var(--surface2); }
        .feature-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
        .feature-text { font-size: 0.95rem; font-weight: 600; color: var(--text); }
        .features-right { display: flex; flex-direction: column; gap: 18px; }
        .feat-card { border-radius: 18px; padding: 30px 28px; border: 1.5px solid transparent; }
        .feat-card-icon { font-size: 1.8rem; margin-bottom: 12px; }
        .feat-card-title { font-family: var(--font-head); font-size: 1.05rem; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 8px; color: var(--text); }
        .feat-card-text { font-size: 0.875rem; color: var(--muted); line-height: 1.7; }

        /* ── PRICING ────────────────────────────────────────────────────── */
        .pricing-outer { background: var(--bg); }
        .pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; }
        .price-card {
          background: var(--white); border: 1.5px solid var(--border);
          border-radius: 20px; padding: 40px 32px;
          display: flex; flex-direction: column;
          opacity: 0; transform: translateY(30px);
          transition: opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s;
          position: relative; overflow: hidden;
        }
        .price-card.vis { opacity: 1; transform: translateY(0); }
        .price-card:nth-child(1) { transition-delay: 0s; }
        .price-card:nth-child(2) { transition-delay: 0.15s; }
        .price-card:nth-child(3) { transition-delay: 0.3s; }
        .price-card:hover { box-shadow: var(--shadow-lg); }
        .price-corner { position: absolute; bottom: -30px; right: -30px; width: 100px; height: 100px; border-radius: 50%; opacity: 0.1; }
        .price-tag {
          display: inline-block; padding: 4px 14px; border-radius: 100px;
          font-size: 10px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; margin-bottom: 24px; width: fit-content;
        }
        .price-name { font-family: var(--font-head); font-size: 1.15rem; font-weight: 700; margin-bottom: 14px; color: var(--text); }
        .price-amount { font-family: var(--font-head); font-size: 3.6rem; font-weight: 800; letter-spacing: -0.05em; line-height: 1; margin-bottom: 24px; }
        .price-divider { height: 1px; background: var(--border); margin-bottom: 22px; }
        .price-features { list-style: none; display: flex; flex-direction: column; gap: 12px; flex: 1; margin-bottom: 28px; }
        .price-features li { font-size: 0.875rem; color: var(--muted); display: flex; align-items: center; gap: 10px; }
        .price-btn {
          width: 100%; padding: 14px; border-radius: 10px;
          font-family: var(--font-head); font-weight: 700; font-size: 13px;
          letter-spacing: 0.06em; text-transform: uppercase;
          cursor: pointer; border: 2px solid;
          transition: transform 0.15s, box-shadow 0.15s, background 0.2s, color 0.2s;
        }
        .price-btn:hover { transform: translateY(-2px); }

        /* ── CALCULATOR ─────────────────────────────────────────────────── */
        .calc-outer { background: var(--white); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .calc-card { max-width: 780px; margin: 0 auto; }
        .calc-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--orange); margin-bottom: 10px; }
        .calc-title { font-family: var(--font-head); font-size: clamp(1.8rem, 3.5vw, 2.8rem); font-weight: 800; letter-spacing: -0.03em; margin-bottom: 48px; }
        .calc-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 16px; margin-bottom: 32px; }
        .calc-field { display: flex; flex-direction: column; gap: 8px; }
        .calc-label { font-size: 10px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; }
        .calc-input {
          background: var(--bg); border: 1.5px solid var(--border); border-radius: 12px;
          padding: 14px 16px; color: var(--text);
          font-size: 1.1rem; font-family: var(--font-head); font-weight: 700;
          outline: none; width: 100%; -moz-appearance: textfield;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .calc-input::-webkit-outer-spin-button,
        .calc-input::-webkit-inner-spin-button { -webkit-appearance: none; }
        .calc-result {
          display: flex; align-items: center; justify-content: space-between;
          background: var(--bg); border: 2px solid; border-radius: 16px; padding: 28px 36px;
          transition: border-color 0.4s;
        }
        .calc-result-label { font-family: var(--font-head); font-weight: 700; font-size: 1rem; margin-bottom: 4px; }
        .calc-result-hint { font-size: 12px; color: var(--muted); }
        .calc-result-score { font-family: var(--font-head); font-size: 3.5rem; font-weight: 800; letter-spacing: -0.05em; transition: color 0.4s; }

        /* ── CTA ────────────────────────────────────────────────────────── */
        .cta-section {
          padding: 110px 6vw; text-align: center;
          position: relative; overflow: hidden; background: var(--text);
        }
        .cta-dots {
          position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 28px 28px;
        }
        .cta-bar { display: flex; height: 6px; width: 80px; margin: 0 auto 40px; border-radius: 3px; overflow: hidden; }
        .cta-bar span { flex: 1; }
        .cta-title {
          font-family: var(--font-head);
          font-size: clamp(2.2rem, 5vw, 4.2rem);
          font-weight: 800; letter-spacing: -0.03em; line-height: 1.1;
          margin-bottom: 18px; color: #fff; position: relative;
        }
        .cta-title .highlight { color: var(--orange); }
        .cta-sub { color: rgba(255,255,255,0.5); font-size: 1rem; margin-bottom: 44px; position: relative; }
        .cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; position: relative; }
        .btn-white {
          padding: 14px 32px; background: #fff; color: var(--text);
          font-family: var(--font-head); font-weight: 700; font-size: 14px;
          border-radius: 10px; border: none; cursor: pointer;
          text-decoration: none; display: inline-block; letter-spacing: 0.04em;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        }
        .btn-white:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(0,0,0,0.3); }
        .btn-outline-white {
          padding: 14px 32px; background: transparent; color: rgba(255,255,255,0.85);
          font-family: var(--font-head); font-weight: 600; font-size: 14px;
          border-radius: 10px; border: 1.5px solid rgba(255,255,255,0.25);
          cursor: pointer; text-decoration: none; display: inline-block; letter-spacing: 0.04em;
          transition: border-color 0.2s, background 0.2s;
        }
        .btn-outline-white:hover { border-color: rgba(255,255,255,0.6); background: rgba(255,255,255,0.06); }

        @media (max-width: 640px) {
          .hero { padding: 80px 24px 60px; }
          .section { padding: 72px 24px; }
          .stats-strip { padding: 40px 24px; }
          .stat-box::after { display: none; }
          .calc-result { flex-direction: column; gap: 16px; text-align: center; }
          .cta-section { padding: 80px 24px; }
        }
      `}</style>

      <main style={{ background: "var(--bg)" }}>

        {/* ── HERO ── */}
        <section className="hero">
          <div className="hero-blob" style={{ width: 500, height: 500, top: -120, right: -80, background: "#e53935" }} />
          <div className="hero-blob" style={{ width: 400, height: 400, bottom: -100, left: "30%", background: "#f4a01c" }} />
          <div className="hero-blob" style={{ width: 350, height: 350, top: "20%", left: -80, background: "#29a8d4" }} />
          <div className="hero-blob" style={{ width: 280, height: 280, bottom: 0, right: "35%", background: "#2eaa62" }} />

          <div className="hero-inner">
            <div>
              <div className="hero-badge"><span /> IELTS Coaching Centre</div>
              <h1 className="hero-h1">
                <span className="w-teal">Master</span> the test.<br />
                <span className="w-red">Not just</span> the<br />
                <span className="w-green">language.</span>
              </h1>
              <p className="hero-sub">
                Real practice, real results, real confidence. Structured courses from beginner to Band 7+ with expert mentorship tailored to you.
              </p>
              <div className="hero-cta">
                <a href="/contact" className="btn-primary">Book Free Trial</a>
                <a href="#courses" className="btn-ghost">View Courses</a>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-visual-grid">
                {[
                  { label: "Success Rate", value: "90%", icon: "🎯", color: "#e53935", light: "#fdecea" },
                  { label: "Avg Band Score", value: "7.5+", icon: "⭐", color: "#f4a01c", light: "#fef6e4" },
                  { label: "Students", value: "500+", icon: "👥", color: "#29a8d4", light: "#e8f6fb" },
                  { label: "Years Active", value: "8+", icon: "🏆", color: "#2eaa62", light: "#e6f6ee" },
                ].map((item, i) => (
                  <div key={i} className="hero-vis-card">
                    <div className="vis-icon" style={{ background: item.light }}>{item.icon}</div>
                    <p className="vis-label">{item.label}</p>
                    <p className="vis-value" style={{ color: item.color }}>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <div className="stats-strip">
          <StatBox value="500" suffix="+" label="Students Trained" accent="#29a8d4" />
          <StatBox value="90" suffix="%" label="Success Rate" accent="#f4a01c" />
          <StatBox value="7.5" suffix="+" label="Average Band Score" accent="#2eaa62" />
        </div>

        {/* ── COURSES ── */}
        <div className="courses-outer">
          <div className="section" id="courses">
            <p className="section-eyebrow" style={{ color: "#29a8d4" }}>Programs</p>
            <h2 className="section-title">Choose Your Path</h2>
            <div className="courses-grid" ref={coursesRef}>
              {COURSES.map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.title}
                    className={`course-card${coursesVis ? " vis" : ""}`}
                    style={{ borderColor: coursesVis ? `${c.accent}35` : "var(--border)" }}>
                    <div className="course-top-bar" style={{ background: c.accent }} />
                    <span className="course-num">{c.num}</span>
                    <div className="course-icon-wrap" style={{ background: c.accentLight, color: c.accent }}>
                      <Icon size={24} />
                    </div>
                    <p className="course-week" style={{ color: c.accent }}>{c.week}</p>
                    <h3 className="course-title">{c.title}</h3>
                    <p className="course-band">Band {c.label}</p>
                    <p className="course-desc">{c.desc}</p>
                    <a href="#" className="course-link" style={{ color: c.accent }}>Learn More →</a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── FEATURES ── */}
        <div className="features-outer">
          <div className="section">
            <div className="features-inner">
              <div>
                <p className="section-eyebrow" style={{ color: "#2eaa62" }}>Why Us</p>
                <h2 className="section-title">Built for results, not just lessons.</h2>
                <div className="features-list" ref={featRef}>
                  {FEATURES.map((f, i) => (
                    <div key={i} className={`feature-row${featVis ? " vis" : ""}`}>
                      <div className="feature-dot" style={{ background: f.color }} />
                      <span className="feature-text">{f.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="features-right">
                {[
                  { icon: "🤝", title: "Community-Driven Learning", text: "Learn alongside peers — our cohort model keeps you motivated and accountable throughout.", color: "#e8f6fb", border: "#29a8d4" },
                  { icon: "📊", title: "Adaptive Progress Tracking", text: "Weekly reports pinpoint exactly where you lose marks — and show you how to fix it fast.", color: "#fef6e4", border: "#f4a01c" },
                  { icon: "🎙️", title: "Speaking Clinics", text: "Dedicated speaking labs with native-accent recordings and fluency drills every session.", color: "#e6f6ee", border: "#2eaa62" },
                ].map((card, i) => (
                  <div key={i} className="feat-card"
                    style={{ background: card.color, borderColor: `${card.border}40` }}>
                    <div className="feat-card-icon">{card.icon}</div>
                    <h4 className="feat-card-title">{card.title}</h4>
                    <p className="feat-card-text">{card.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── PRICING ── */}
        <div className="pricing-outer">
          <div className="section">
            <p className="section-eyebrow" style={{ color: "#e53935" }}>Investment</p>
            <h2 className="section-title">Simple Pricing Plans</h2>
            <div className="pricing-grid" ref={pricRef}>
              {PLANS.map((plan, i) => (
                <div key={i}
                  className={`price-card${pricVis ? " vis" : ""}${i === 1 ? " price-card-featured" : ""}`}
                  style={i === 1 ? { borderColor: `${plan.accent}45`, background: `${plan.accent}05`, borderWidth: "2px" } : {}}>
                  <div className="price-corner" style={{ background: plan.accent }} />
                  <span className="price-tag" style={{ background: plan.light, color: plan.accent }}>{plan.tag}</span>
                  <h4 className="price-name">{plan.name}</h4>
                  <p className="price-amount" style={{ color: plan.accent }}>{plan.price}</p>
                  <div className="price-divider" />
                  <ul className="price-features">
                    {["Full course access", "Mock exams included", "Expert feedback sessions"].map((f, fi) => (
                      <li key={fi}>
                        <CheckCircle size={15} style={{ color: plan.accent, flexShrink: 0 }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button className="price-btn"
                    style={i === 1
                      ? { background: plan.accent, borderColor: plan.accent, color: "#fff" }
                      : { background: "transparent", borderColor: plan.accent, color: plan.accent }}>
                    Enroll Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CALCULATOR ── */}
        <div className="calc-outer">
          <div className="section">
            <BandCalculator />
          </div>
        </div>

        {/* ── CTA ── */}
        <section className="cta-section">
          <div className="cta-dots" />
          <div className="cta-bar">
            <span style={{ background: "#e53935" }} />
            <span style={{ background: "#f4a01c" }} />
            <span style={{ background: "#29a8d4" }} />
            <span style={{ background: "#2eaa62" }} />
          </div>
          <h2 className="cta-title">
            Ready to <span className="highlight">boost</span><br />your IELTS score?
          </h2>
          <p className="cta-sub">Start your journey today with a free trial class — no commitment required.</p>
          <div className="cta-btns">
            <a href="/contact" className="btn-white">Book Free Trial</a>
            <a href="/contact" className="btn-outline-white">Talk to an Advisor</a>
          </div>
        </section>

      </main>
    </>
  );
}