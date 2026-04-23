"use client";

import React, { useState, useEffect, useRef } from "react";
import { CheckCircle, Smartphone, Zap, BookOpen, Clock } from "lucide-react";

// ─── Brand palette (Duolingo-inspired) ──────────────────────────────────────
// Green: #58cc02 | Blue: #1cb0f6 | Purple: #ce82ff | Orange: #ff9600

const COURSES = [
  {
    title: "DET Starter",
    label: "Beginner",
    week: "4 Weeks",
    price: "NPR 6,000",
    mode: "Offline & Online",
    modeColor: "#58cc02",
    desc: "Introduction to the Duolingo English Test format — adaptive questions, literacy, comprehension, conversation, and production tasks explained from zero.",
    breakdown: [
      "Week 1 — Test Format & Adaptive Question Types Overview",
      "Week 2 — Literacy Tasks: Read & Complete, Fill in the Blanks",
      "Week 3 — Comprehension: Listen & Select, Read Aloud",
      "Week 4 — Production: Speaking Sample + Writing Sample + Mock",
    ],
    bestFor: "Students new to the DET format with basic English",
    icon: BookOpen,
    accent: "#58cc02",
    accentLight: "#f0fce0",
    num: "01",
  },
  {
    title: "DET Core",
    label: "90 – 110",
    week: "5 Weeks",
    price: "NPR 7,000",
    mode: "Offline & Online",
    modeColor: "#58cc02",
    desc: "Structured DET prep targeting 90–110 — vocabulary expansion, grammar in context, speaking fluency, and adaptive pacing strategies.",
    breakdown: [
      "Week 1 — Vocabulary: Missing Letter + Listening Dictation",
      "Week 2 — Grammar in Context: Sentence Builders + Cloze",
      "Week 3 — Listening & Speaking: Interactive tasks + Read Aloud",
      "Week 4 — Writing Sample: 5-min writing drills + band analysis",
      "Week 5 — Full Adaptive Mock + Comprehensive Feedback",
    ],
    bestFor: "Students targeting DET score 90–110",
    icon: Smartphone,
    accent: "#1cb0f6",
    accentLight: "#e8f7ff",
    num: "02",
  },
  {
    title: "DET Advanced",
    label: "115 – 130+",
    week: "4 Weeks",
    price: "NPR 7,500",
    mode: "Offline & Online",
    modeColor: "#58cc02",
    desc: "High-score coaching for 115+ — production fluency, advanced vocabulary, interview-style speaking, and full adaptive simulation.",
    breakdown: [
      "Week 1 — Advanced Vocabulary & Spelling Accuracy",
      "Week 2 — Speaking Sample: 1–3 min responses + fluency coaching",
      "Week 3 — Writing Sample: Extended writing + argument structure",
      "Week 4 — 3× Adaptive Mock Tests + 1:1 Score Report Analysis",
    ],
    bestFor: "Students aiming for 115–130+ for top university admission",
    icon: Zap,
    accent: "#ce82ff",
    accentLight: "#faf0ff",
    num: "03",
  },
  {
    title: "DET Express",
    label: "All Levels",
    week: "10 Days",
    price: "NPR 3,500",
    mode: "Offline & Online",
    modeColor: "#58cc02",
    desc: "10-day rapid DET review — task-type crash course, timed drills, and scored mock tests. Perfect for students who know English but not the test.",
    breakdown: [
      "Days 1–3 — Task Type Crash Course (all DET question types)",
      "Days 4–6 — Timed Speaking & Writing Drills",
      "Days 7–10 — 2× Adaptive Mock Tests + Targeted Feedback",
    ],
    bestFor: "Students with good English needing fast DET strategy",
    icon: Clock,
    accent: "#ff9600",
    accentLight: "#fff4e5",
    num: "04",
  },
];

const FEATURES = [
  { text: "Adaptive question-type strategy training", color: "#58cc02" },
  { text: "Speaking sample coaching (1–3 min responses)", color: "#1cb0f6" },
  { text: "Writing sample: argument structure & fluency", color: "#ce82ff" },
  { text: "Vocabulary & spelling accuracy drills", color: "#ff9600" },
  { text: "Fully online test — practise from anywhere", color: "#58cc02" },
  { text: "Ministry of Education approved consultancy", color: "#1cb0f6" },
];

// ─── Hooks ───────────────────────────────────────────────────────────────────
function useInView(threshold = 0.15): [React.RefObject<null>, boolean] {
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

function useCounter(target: string, active: boolean, duration = 1300) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const numeric = parseFloat(String(target).replace(/[^0-9.]/g, ""));
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(+(numeric * p).toFixed(0));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return val;
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function StatBox({ label, value, suffix, accent }: { label: string; value: string; suffix: string; accent: string }) {
  const [ref, vis] = useInView();
  const count = useCounter(value, vis);
  return (
    <div ref={ref} className="stat-box">
      <span className="stat-num" style={{ color: accent }}>{count}{suffix}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

function DETCalculator() {
  const [scores, setScores] = useState<Record<string, string>>({
    literacy: "", comprehension: "", conversation: "", production: "",
  });
  const keys = ["literacy", "comprehension", "conversation", "production"] as const;
  const keyColors = ["#58cc02", "#1cb0f6", "#ce82ff", "#ff9600"];
  const labels = ["Literacy", "Comprehension", "Conversation", "Production"];

  const overall = () => {
    const vals = keys.map((k) => Number(scores[k]));
    if (vals.some((v) => isNaN(v) || v === 0)) return "—";
    const avg = vals.reduce((a, b) => a + b, 0) / 4;
    return Math.round(avg).toString();
  };

  const result = overall();
  const num = parseInt(result);
  const color = !isNaN(num) ? num >= 115 ? "#58cc02" : num >= 90 ? "#1cb0f6" : "#ff9600" : "#c0c0d0";
  const levelLabel = !isNaN(num)
    ? num >= 125 ? "Advanced+" : num >= 115 ? "Advanced" : num >= 90 ? "Intermediate" : "Developing"
    : "—";

  return (
    <div className="calc-card">
      <p className="calc-eyebrow">Estimate Your Score</p>
      <h2 className="calc-title">DET Score Calculator</h2>
      <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 32, marginTop: -36, lineHeight: 1.6 }}>
        Enter your subscores for each skill area (10–160 scale). The DET reports four subscores alongside an overall score.
      </p>
      <div className="calc-grid">
        {keys.map((k, i) => (
          <div key={k} className="calc-field">
            <label className="calc-label" style={{ color: keyColors[i] }}>{labels[i]}</label>
            <input
              type="number" min={10} max={160} step={5}
              placeholder="10–160"
              value={scores[k]}
              onChange={(e) => setScores((p) => ({ ...p, [k]: e.target.value }))}
              className="calc-input"
              style={{ "--focus-color": keyColors[i] } as React.CSSProperties}
            />
          </div>
        ))}
      </div>
      <div className="calc-result" style={{ borderColor: result !== "—" ? color : "#e4e8f0" }}>
        <div>
          <p className="calc-result-label">Overall DET Score</p>
          <p className="calc-result-hint">
            Level: <strong style={{ color }}>{levelLabel}</strong> &nbsp;·&nbsp; Scale: 10–160
          </p>
        </div>
        <span className="calc-result-score" style={{ color }}>{result}</span>
      </div>
    </div>
  );
}

function CourseCard({ c, visible }: { c: typeof COURSES[0]; visible: boolean }) {
  const [open, setOpen] = useState(false);
  const Icon = c.icon;
  return (
    <div className={`course-card${visible ? " vis" : ""}`}
      style={{ borderColor: visible ? `${c.accent}35` : "var(--border)" }}>
      <div className="course-top-bar" style={{ background: c.accent }} />
      <span className="course-num">{c.num}</span>
      <div style={{
        position: "absolute", top: 18, right: 18,
        background: `${c.modeColor}18`, color: c.modeColor,
        fontSize: 10, fontWeight: 700, letterSpacing: "0.08em",
        padding: "3px 10px", borderRadius: 100, textTransform: "uppercase",
      }}>{c.mode}</div>
      <div className="course-icon-wrap" style={{ background: c.accentLight, color: c.accent }}>
        <Icon size={24} />
      </div>
      <p className="course-week" style={{ color: c.accent }}>{c.week}</p>
      <h3 className="course-title">{c.title}</h3>
      <p className="course-band">Target: {c.label}</p>
      <div style={{
        margin: "10px 0 14px", fontFamily: "var(--font-head)",
        fontSize: "1.4rem", fontWeight: 800, color: c.accent, letterSpacing: "-0.03em",
      }}>{c.price}</div>
      <p className="course-desc">{c.desc}</p>
      <button onClick={() => setOpen(!open)} style={{
        marginTop: 20, background: "none", border: "none", cursor: "pointer",
        fontFamily: "var(--font-head)", fontSize: 12, fontWeight: 700,
        color: c.accent, letterSpacing: "0.08em", textTransform: "uppercase",
        display: "flex", alignItems: "center", gap: 6, padding: 0,
      }}>
        {open ? "Hide" : "View"} Weekly Breakdown {open ? "↑" : "↓"}
      </button>
      {open && (
        <div style={{
          marginTop: 16, padding: "16px 18px",
          background: c.accentLight, borderRadius: 12,
          borderLeft: `3px solid ${c.accent}`,
        }}>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
            {c.breakdown.map((b, i) => (
              <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.accent, flexShrink: 0, marginTop: 6 }} />
                <span style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.6 }}>{b}</span>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${c.accent}30`, fontSize: 12, color: "var(--muted)", fontWeight: 600 }}>
            ✦ Best For: {c.bestFor}
          </div>
        </div>
      )}
      <a href="#" className="course-link" style={{ color: c.accent, marginTop: 20 }}>Enroll Now →</a>
    </div>
  );
}

function DETFormatCard() {
  const tasks = [
    { name: "Read and Complete", skill: "Literacy", color: "#58cc02" },
    { name: "Listen and Type", skill: "Comprehension", color: "#1cb0f6" },
    { name: "Read Aloud", skill: "Conversation", color: "#ce82ff" },
    { name: "Speaking Sample", skill: "Production", color: "#ff9600" },
    { name: "Writing Sample", skill: "Production", color: "#ff9600" },
  ];
  return (
    <div style={{
      background: "var(--white)", border: "1.5px solid var(--border)",
      borderRadius: 20, padding: "36px 32px", boxShadow: "var(--shadow-sm)",
    }}>
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#58cc02", marginBottom: 8 }}>Test Format</p>
      <h3 style={{ fontFamily: "var(--font-head)", fontSize: "1.4rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 6, color: "var(--text)" }}>
        What's in the DET?
      </h3>
      <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 22, lineHeight: 1.6 }}>
        ~45–60 min · fully online · adaptive · 4 subscores
      </p>
      {tasks.map((t) => (
        <div key={t.name} style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "12px 16px", borderRadius: 10, marginBottom: 8,
          background: "var(--surface2)",
        }}>
          <span style={{ fontSize: 13.5, fontWeight: 600, color: "var(--text)" }}>{t.name}</span>
          <span style={{
            fontSize: 10, fontWeight: 700, letterSpacing: "0.07em",
            textTransform: "uppercase", color: t.color,
            background: `${t.color}18`, padding: "3px 10px", borderRadius: 100,
          }}>{t.skill}</span>
        </div>
      ))}
      <div style={{
        marginTop: 16, padding: "12px 16px", background: "#f0fce0",
        borderRadius: 10, fontSize: 13, color: "#3a7d00", lineHeight: 1.65, fontWeight: 500,
      }}>
        🌐 <strong>Accepted by 5,500+</strong> universities and programs worldwide — including top institutions in the US, UK, Canada and Australia.
      </div>
    </div>
  );
}

export default function DuolingoCourses() {
  const [coursesRef, coursesVis] = useInView();
  const [featRef, featVis] = useInView();
  const [pricRef, pricVis] = useInView();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,600;0,700;0,800;0,900;1,700&display=swap&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #f5fff0;
          --white: #ffffff;
          --surface2: #edfae0;
          --border: #d4f0c0;
          --text: #1a2e0d;
          --muted: #5a7a4a;
          --green: #58cc02;
          --blue: #1cb0f6;
          --purple: #ce82ff;
          --orange: #ff9600;
          --font-head: 'Nunito', sans-serif;
          --font-body: 'Plus Jakarta Sans', sans-serif;
          --shadow-sm: 0 2px 8px rgba(88,204,2,0.08);
          --shadow-md: 0 8px 24px rgba(88,204,2,0.12);
          --shadow-lg: 0 20px 48px rgba(88,204,2,0.16);
        }

        body { background: var(--bg); color: var(--text); font-family: var(--font-body); }

        .hero {
          position: relative; min-height: 92vh; display: flex; align-items: center;
          padding: 80px 6vw 60px; overflow: hidden; background: var(--white);
        }
        .hero-blob { position: absolute; border-radius: 50%; filter: blur(90px); opacity: 0.18; }
        .hero-inner {
          position: relative; display: grid; grid-template-columns: 1fr 1fr;
          gap: 80px; align-items: center; max-width: 1200px; margin: 0 auto; width: 100%;
        }
        @media (max-width: 860px) { .hero-inner { grid-template-columns: 1fr; gap: 48px; } .hero-visual { display: none; } }

        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px; padding: 6px 16px;
          border-radius: 100px; font-size: 11px; font-weight: 800; letter-spacing: 0.12em;
          text-transform: uppercase; color: #3a9400;
          background: #f0fce0; border: 1.5px solid rgba(88,204,2,0.3);
          margin-bottom: 24px; width: fit-content;
        }
        .hero-badge span { width: 6px; height: 6px; background: #58cc02; border-radius: 50%; animation: pulse 2s ease-in-out infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.7); } }

        .hero-h1 {
          font-family: var(--font-head); font-size: clamp(2.8rem, 5vw, 5rem);
          font-weight: 900; line-height: 1.05; letter-spacing: -0.02em; margin-bottom: 22px; color: var(--text);
        }
        .w-green { color: #58cc02; }
        .w-blue { color: #1cb0f6; }
        .w-purple { color: #8b5cf6; }
        .w-orange { color: #ff9600; }
        .hero-sub { font-size: 1.05rem; color: var(--muted); line-height: 1.75; max-width: 440px; margin-bottom: 40px; }
        .hero-cta { display: flex; gap: 14px; flex-wrap: wrap; }
        .btn-primary {
          padding: 14px 30px; background: #58cc02; color: #fff;
          font-family: var(--font-head); font-weight: 800; font-size: 14px;
          letter-spacing: 0.04em; border-radius: 12px; border: none; cursor: pointer;
          text-decoration: none; display: inline-block;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 0 #3a9400, 0 6px 16px rgba(88,204,2,0.3);
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 0 #3a9400, 0 10px 24px rgba(88,204,2,0.4); }
        .btn-ghost {
          padding: 14px 30px; background: transparent; color: var(--text);
          font-family: var(--font-head); font-weight: 700; font-size: 14px;
          letter-spacing: 0.04em; border-radius: 12px;
          border: 2px solid var(--border); cursor: pointer;
          text-decoration: none; display: inline-block;
          transition: border-color 0.2s, background 0.2s;
        }
        .btn-ghost:hover { border-color: #58cc02; background: #f0fce0; }

        .hero-visual { display: flex; align-items: center; justify-content: center; }
        .hero-visual-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; width: 380px; }
        .hero-vis-card {
          background: var(--white); border: 2px solid var(--border);
          border-radius: 20px; padding: 22px 20px;
          box-shadow: var(--shadow-sm); transition: transform 0.3s, box-shadow 0.3s;
        }
        .hero-vis-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
        .hero-vis-card:nth-child(2) { margin-top: 24px; }
        .hero-vis-card:nth-child(4) { margin-top: -24px; }
        .vis-icon { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 12px; font-size: 20px; }
        .vis-label { font-size: 10px; color: var(--muted); font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 4px; }
        .vis-value { font-family: var(--font-head); font-size: 1.6rem; font-weight: 900; letter-spacing: -0.03em; }

        .stats-strip { background: #58cc02; padding: 52px 6vw; display: flex; justify-content: center; flex-wrap: wrap; }
        .stat-box { flex: 1 1 180px; display: flex; flex-direction: column; align-items: center; padding: 16px 32px; position: relative; }
        .stat-box:not(:last-child)::after { content: ''; position: absolute; right: 0; top: 20%; bottom: 20%; width: 1px; background: rgba(255,255,255,0.2); }
        .stat-num { font-family: var(--font-head); font-size: clamp(2.4rem, 5vw, 3.2rem); font-weight: 900; letter-spacing: -0.04em; line-height: 1; }
        .stat-label { font-size: 11px; color: rgba(255,255,255,0.6); letter-spacing: 0.12em; text-transform: uppercase; margin-top: 8px; font-weight: 700; }

        .section { padding: 96px 6vw; max-width: 1200px; margin: 0 auto; }
        .section-eyebrow { font-size: 11px; font-weight: 800; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 10px; }
        .section-title { font-family: var(--font-head); font-size: clamp(1.8rem, 3.5vw, 2.8rem); font-weight: 900; letter-spacing: -0.03em; margin-bottom: 56px; max-width: 480px; line-height: 1.15; }

        .courses-outer { background: var(--bg); }
        .courses-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
        .course-card {
          background: var(--white); border: 2px solid var(--border);
          border-radius: 24px; padding: 40px 32px; position: relative; overflow: hidden;
          opacity: 0; transform: translateY(36px);
          transition: opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s;
        }
        .course-card.vis { opacity: 1; transform: translateY(0); }
        .course-card:nth-child(1) { transition-delay: 0s; }
        .course-card:nth-child(2) { transition-delay: 0.12s; }
        .course-card:nth-child(3) { transition-delay: 0.24s; }
        .course-card:nth-child(4) { transition-delay: 0.36s; }
        .course-card:hover { box-shadow: var(--shadow-lg); }
        .course-top-bar { position: absolute; top: 0; left: 0; right: 0; height: 5px; border-radius: 24px 24px 0 0; }
        .course-num { font-family: var(--font-head); font-size: 100px; font-weight: 900; position: absolute; top: -16px; right: 20px; opacity: 0.05; line-height: 1; pointer-events: none; user-select: none; color: var(--text); }
        .course-icon-wrap { width: 52px; height: 52px; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; }
        .course-week { font-size: 11px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 8px; }
        .course-title { font-family: var(--font-head); font-size: 1.6rem; font-weight: 900; letter-spacing: -0.03em; margin-bottom: 4px; color: var(--text); }
        .course-band { font-size: 0.9rem; color: var(--muted); font-weight: 600; margin-bottom: 8px; }
        .course-desc { font-size: 0.9rem; color: var(--muted); line-height: 1.75; }
        .course-link { display: flex; align-items: center; gap: 6px; font-family: var(--font-head); font-size: 13px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; text-decoration: none; opacity: 0.45; transition: opacity 0.2s, gap 0.2s; }
        .course-card:hover .course-link { opacity: 1; gap: 10px; }

        .features-outer { background: var(--white); border-top: 2px solid var(--border); border-bottom: 2px solid var(--border); }
        .features-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
        @media (max-width: 768px) { .features-inner { grid-template-columns: 1fr; gap: 40px; } }
        .features-list { display: flex; flex-direction: column; gap: 6px; }
        .feature-row {
          display: flex; align-items: center; gap: 14px; padding: 14px 18px; border-radius: 14px;
          opacity: 0; transform: translateX(-24px);
          transition: opacity 0.5s ease, transform 0.5s ease, background 0.2s; cursor: default;
        }
        .feature-row.vis { opacity: 1; transform: translateX(0); }
        .feature-row:nth-child(1) { transition-delay: 0.05s; } .feature-row:nth-child(2) { transition-delay: 0.1s; }
        .feature-row:nth-child(3) { transition-delay: 0.15s; } .feature-row:nth-child(4) { transition-delay: 0.2s; }
        .feature-row:nth-child(5) { transition-delay: 0.25s; } .feature-row:nth-child(6) { transition-delay: 0.3s; }
        .feature-row:hover { background: var(--surface2); }
        .feature-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
        .feature-text { font-size: 0.95rem; font-weight: 600; color: var(--text); }
        .features-right { display: flex; flex-direction: column; gap: 18px; }
        .feat-card { border-radius: 20px; padding: 30px 28px; border: 2px solid transparent; }
        .feat-card-icon { font-size: 1.8rem; margin-bottom: 12px; }
        .feat-card-title { font-family: var(--font-head); font-size: 1.05rem; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 8px; color: var(--text); }
        .feat-card-text { font-size: 0.875rem; color: var(--muted); line-height: 1.7; }

        .pricing-outer { background: var(--bg); }
        .pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; }
        .price-card {
          background: var(--white); border: 2px solid var(--border); border-radius: 24px;
          padding: 40px 32px; display: flex; flex-direction: column;
          opacity: 0; transform: translateY(30px);
          transition: opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s; position: relative; overflow: hidden;
        }
        .price-card.vis { opacity: 1; transform: translateY(0); }
        .price-card:nth-child(1) { transition-delay: 0s; } .price-card:nth-child(2) { transition-delay: 0.12s; }
        .price-card:nth-child(3) { transition-delay: 0.24s; } .price-card:nth-child(4) { transition-delay: 0.36s; }
        .price-card:hover { box-shadow: var(--shadow-lg); }
        .price-corner { position: absolute; bottom: -30px; right: -30px; width: 100px; height: 100px; border-radius: 50%; opacity: 0.1; }
        .price-tag { display: inline-block; padding: 5px 14px; border-radius: 100px; font-size: 10px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 24px; width: fit-content; }
        .price-name { font-family: var(--font-head); font-size: 1.15rem; font-weight: 800; margin-bottom: 6px; color: var(--text); }
        .price-duration { font-size: 12px; color: var(--muted); margin-bottom: 14px; font-weight: 500; }
        .price-amount { font-family: var(--font-head); font-size: 2.4rem; font-weight: 900; letter-spacing: -0.04em; line-height: 1; margin-bottom: 4px; }
        .price-amount-sub { font-size: 11.5px; color: var(--muted); margin-bottom: 22px; }
        .price-divider { height: 1px; background: var(--border); margin-bottom: 22px; }
        .price-features { list-style: none; display: flex; flex-direction: column; gap: 12px; flex: 1; margin-bottom: 28px; }
        .price-features li { font-size: 0.875rem; color: var(--muted); display: flex; align-items: flex-start; gap: 10px; line-height: 1.5; }
        .price-btn { width: 100%; padding: 14px; border-radius: 12px; font-family: var(--font-head); font-weight: 800; font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer; border: 2px solid; transition: transform 0.15s, box-shadow 0.15s, background 0.2s, color 0.2s; }
        .price-btn:hover { transform: translateY(-2px); }

        .calc-outer { background: var(--white); border-top: 2px solid var(--border); border-bottom: 2px solid var(--border); }
        .calc-card { max-width: 780px; margin: 0 auto; }
        .calc-eyebrow { font-size: 11px; font-weight: 800; letter-spacing: 0.2em; text-transform: uppercase; color: var(--green); margin-bottom: 10px; }
        .calc-title { font-family: var(--font-head); font-size: clamp(1.8rem, 3.5vw, 2.8rem); font-weight: 900; letter-spacing: -0.03em; margin-bottom: 16px; }
        .calc-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 16px; margin-bottom: 32px; }
        .calc-field { display: flex; flex-direction: column; gap: 8px; }
        .calc-label { font-size: 10px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; }
        .calc-input { background: var(--bg); border: 2px solid var(--border); border-radius: 14px; padding: 14px 16px; color: var(--text); font-size: 1.1rem; font-family: var(--font-head); font-weight: 800; outline: none; width: 100%; -moz-appearance: textfield; transition: border-color 0.2s; }
        .calc-input::-webkit-outer-spin-button, .calc-input::-webkit-inner-spin-button { -webkit-appearance: none; }
        .calc-result { display: flex; align-items: center; justify-content: space-between; background: var(--bg); border: 2px solid; border-radius: 18px; padding: 28px 36px; transition: border-color 0.4s; }
        .calc-result-label { font-family: var(--font-head); font-weight: 800; font-size: 1rem; margin-bottom: 4px; }
        .calc-result-hint { font-size: 12px; color: var(--muted); }
        .calc-result-score { font-family: var(--font-head); font-size: 3.5rem; font-weight: 900; letter-spacing: -0.05em; transition: color 0.4s; }

        .cta-section { padding: 110px 6vw; text-align: center; position: relative; overflow: hidden; background: #1a2e0d; }
        .cta-dots { position: absolute; inset: 0; pointer-events: none; background-image: radial-gradient(rgba(88,204,2,0.08) 1px, transparent 1px); background-size: 24px 24px; }
        .cta-bar { display: flex; height: 6px; width: 80px; margin: 0 auto 40px; border-radius: 3px; overflow: hidden; }
        .cta-bar span { flex: 1; }
        .cta-title { font-family: var(--font-head); font-size: clamp(2.2rem, 5vw, 4.2rem); font-weight: 900; letter-spacing: -0.03em; line-height: 1.1; margin-bottom: 18px; color: #fff; position: relative; }
        .cta-title .highlight { color: #58cc02; }
        .cta-sub { color: rgba(255,255,255,0.45); font-size: 1rem; margin-bottom: 44px; position: relative; }
        .cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; position: relative; }
        .btn-white { padding: 14px 32px; background: #58cc02; color: #fff; font-family: var(--font-head); font-weight: 800; font-size: 14px; border-radius: 12px; border: none; cursor: pointer; text-decoration: none; display: inline-block; letter-spacing: 0.04em; transition: transform 0.2s, box-shadow 0.2s; box-shadow: 0 4px 0 #3a9400; }
        .btn-white:hover { transform: translateY(-2px); box-shadow: 0 6px 0 #3a9400; }
        .btn-outline-white { padding: 14px 32px; background: transparent; color: rgba(255,255,255,0.85); font-family: var(--font-head); font-weight: 700; font-size: 14px; border-radius: 12px; border: 2px solid rgba(255,255,255,0.2); cursor: pointer; text-decoration: none; display: inline-block; letter-spacing: 0.04em; transition: border-color 0.2s, background 0.2s; }
        .btn-outline-white:hover { border-color: rgba(255,255,255,0.5); background: rgba(255,255,255,0.06); }

        @media (max-width: 640px) {
          .hero { padding: 80px 24px 60px; } .section { padding: 72px 24px; }
          .stats-strip { padding: 40px 24px; } .stat-box::after { display: none; }
          .calc-result { flex-direction: column; gap: 16px; text-align: center; }
          .cta-section { padding: 80px 24px; }
        }
      `}</style>

      <main style={{ background: "var(--bg)" }}>

        {/* ── HERO ── */}
        <section className="hero">
          <div className="hero-blob" style={{ width: 500, height: 500, top: -120, right: -80, background: "#58cc02" }} />
          <div className="hero-blob" style={{ width: 400, height: 400, bottom: -80, left: "20%", background: "#1cb0f6" }} />
          <div className="hero-blob" style={{ width: 300, height: 300, top: "30%", left: -60, background: "#ce82ff" }} />
          <div className="hero-blob" style={{ width: 250, height: 250, bottom: 0, right: "30%", background: "#ff9600" }} />

          <div className="hero-inner">
            <div>
              <div className="hero-badge"><span /> Duolingo English Test Coaching · Kathmandu</div>
              <h1 className="hero-h1">
                <span className="w-green">Score big.</span><br />
                <span className="w-blue">Test online.</span><br />
                <span className="w-purple">Get in.</span>
              </h1>
              <p className="hero-sub">
                45 minutes. Fully online. Accepted worldwide. Our DET courses teach you exactly what the adaptive algorithm rewards — fast.
              </p>
              <div className="hero-cta">
                <a href="/contact" className="btn-primary">Book Free Trial</a>
                <a href="#courses" className="btn-ghost">View Courses ↓</a>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-visual-grid">
                {[
                  { label: "DET Starter", value: "4 wks", icon: "📚", color: "#58cc02" },
                  { label: "DET Core", value: "5 wks", icon: "📱", color: "#1cb0f6" },
                  { label: "DET Advanced", value: "4 wks", icon: "⚡", color: "#ce82ff" },
                  { label: "DET Express", value: "10 days", icon: "🚀", color: "#ff9600" },
                ].map((item, i) => (
                  <div key={i} className="hero-vis-card">
                    <div className="vis-icon" style={{ background: `${item.color}18` }}>{item.icon}</div>
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
          <StatBox value="300" suffix="+" label="DET Students" accent="#fff" />
          <StatBox value="85" suffix="%" label="Success Rate" accent="#fff" />
          <StatBox value="110" suffix="+" label="Avg Score Achieved" accent="#fff" />
          <StatBox value="5500" suffix="+" label="Universities Accept DET" accent="#fff" />
        </div>

        {/* ── COURSES ── */}
        <div className="courses-outer">
          <div className="section" id="courses">
            <p className="section-eyebrow" style={{ color: "#58cc02" }}>Programs</p>
            <h2 className="section-title">Choose Your DET Path</h2>
            <div className="courses-grid" ref={coursesRef}>
              {COURSES.map((c) => <CourseCard key={c.title} c={c} visible={coursesVis} />)}
            </div>
          </div>
        </div>

        {/* ── FEATURES ── */}
        <div className="features-outer">
          <div className="section">
            <div className="features-inner">
              <div>
                <p className="section-eyebrow" style={{ color: "#1cb0f6" }}>Why Study Sync</p>
                <h2 className="section-title">Strategy-first coaching for an adaptive test.</h2>
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
                <DETFormatCard />
                {[
                  { icon: "🎙️", title: "Speaking Sample Coaching", text: "1–3 minute open-ended responses are heavily weighted. We train fluency, structure, and confidence until it's natural.", color: "#f0fce0", border: "#58cc02" },
                  { icon: "✍️", title: "Writing Sample Mastery", text: "Argument structure, vocabulary range, and coherence — we break down exactly what scorers reward.", color: "#e8f7ff", border: "#1cb0f6" },
                ].map((card, i) => (
                  <div key={i} className="feat-card" style={{ background: card.color, borderColor: `${card.border}40` }}>
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
            <p className="section-eyebrow" style={{ color: "#ce82ff" }}>Investment</p>
            <h2 className="section-title">Transparent Pricing</h2>
            <div className="pricing-grid" ref={pricRef}>
              {[
                { name: "DET Starter", duration: "4 Weeks · Offline & Online", price: "NPR 6,000", tag: "Start Here", accent: "#58cc02", light: "#f0fce0", features: ["Full DET format orientation", "All 4 skill areas covered", "1 full adaptive mock test"], featured: false },
                { name: "DET Core", duration: "5 Weeks · Offline & Online", price: "NPR 7,000", tag: "Most Popular", accent: "#1cb0f6", light: "#e8f7ff", features: ["Vocabulary & grammar drills", "Speaking & writing coaching", "Full adaptive mock + feedback"], featured: true },
                { name: "DET Advanced", duration: "4 Weeks · Offline & Online", price: "NPR 7,500", tag: "Score 115+", accent: "#ce82ff", light: "#faf0ff", features: ["Advanced fluency coaching", "3× adaptive mock tests", "1:1 score report analysis"], featured: false },
                { name: "DET Express", duration: "10 Days · Offline & Online", price: "NPR 3,500", tag: "Last-Minute", accent: "#ff9600", light: "#fff4e5", features: ["Task type crash course", "Timed speaking & writing drills", "2× scored mock tests"], featured: false },
              ].map((plan, i) => (
                <div key={i} className={`price-card${pricVis ? " vis" : ""}`}
                  style={plan.featured ? { borderColor: `${plan.accent}55`, background: `${plan.accent}04`, borderWidth: "2px" } : {}}>
                  <div className="price-corner" style={{ background: plan.accent }} />
                  <span className="price-tag" style={{ background: plan.light, color: plan.accent }}>{plan.tag}</span>
                  <h4 className="price-name">{plan.name}</h4>
                  <p className="price-duration">{plan.duration}</p>
                  <p className="price-amount" style={{ color: plan.accent }}>{plan.price}</p>
                  <p className="price-amount-sub">per course · all materials included</p>
                  <div className="price-divider" />
                  <ul className="price-features">
                    {plan.features.map((f, fi) => (
                      <li key={fi}>
                        <CheckCircle size={14} style={{ color: plan.accent, flexShrink: 0, marginTop: 1 }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button className="price-btn"
                    style={plan.featured
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
            <DETCalculator />
          </div>
        </div>

        {/* ── CTA ── */}
        <section className="cta-section">
          <div className="cta-dots" />
          <div className="cta-bar">
            <span style={{ background: "#58cc02" }} />
            <span style={{ background: "#1cb0f6" }} />
            <span style={{ background: "#ce82ff" }} />
            <span style={{ background: "#ff9600" }} />
          </div>
          <h2 className="cta-title">
            Ready to <span className="highlight">ace</span><br />the Duolingo test?
          </h2>
          <p className="cta-sub">Start with a free trial class — learn the strategy before your first practice test.</p>
          <div className="cta-btns">
            <a href="/contact" className="btn-white">Book Free Trial</a>
            <a href="/contact" className="btn-outline-white">Talk to an Advisor</a>
          </div>
        </section>

      </main>
    </>
  );
}