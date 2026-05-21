"use client";

import React, { useState, useEffect, useRef } from "react";
import { CheckCircle, Monitor, Zap, BookOpen, Award } from "lucide-react";

// ─── Brand palette ───────────────────────────────────────────────────────────
// PTE accent: Blue #1565c0 | Cyan #00acc1 | Violet #7b1fa2 | Amber #f9a825

const FALLBACK_COURSES = [
  {
    title: "PTE Foundation",
    label: "Beginner",
    week: "6 Weeks",
    price: "NPR 8,000",
    mode: "Offline & Online",
    modeColor: "#00acc1",
    desc: "Build a solid PTE base — all four communicative skills covered with computer-based practice and AI scoring strategies.",
    breakdown: [
      "Week 1 — Speaking & Writing (Integrated Tasks Overview)",
      "Week 2 — Reading (Multiple Choice, Re-order, Fill Blanks)",
      "Week 3 — Listening (Highlight, Summarise, Select Missing)",
      "Week 4 — Computer-Based Test Strategies",
      "Week 5 — Timed Practice + AI Scoring Orientation",
      "Week 6 — Full Mock Test + Feedback Session",
    ],
    bestFor: "Beginners with no prior PTE experience",
    icon: BookOpen,
    accent: "#1565c0",
    accentLight: "#e3f2fd",
    num: "01",
  },
  {
    title: "PTE Intensive",
    label: "50 – 65",
    week: "5 Weeks",
    price: "NPR 7,000",
    mode: "Offline & Online",
    modeColor: "#00acc1",
    desc: "Score-targeted drills on the most heavily weighted PTE tasks — Read Aloud, Repeat Sentence, and Essay with real AI feedback.",
    breakdown: [
      "Week 1 — Read Aloud + Repeat Sentence (High-weight tasks)",
      "Week 2 — Summarise Written Text + Essay Writing",
      "Week 3 — Reading: Re-order Paragraphs + FIB",
      "Week 4 — Listening: Highlight Incorrect Words + HCS",
      "Week 5 — Scored Mock Test + Section-wise Analysis",
    ],
    bestFor: "Students targeting PTE score 50–65",
    icon: Monitor,
    accent: "#00acc1",
    accentLight: "#e0f7fa",
    num: "02",
  },
  {
    title: "PTE Advanced",
    label: "65 – 79+",
    week: "4 Weeks",
    price: "NPR 6,000",
    mode: "Offline & Online",
    modeColor: "#00acc1",
    desc: "High-score techniques for band 65+ — enabling skills, AI scoring hacks, and intensive mock test environment.",
    breakdown: [
      "Week 1 — Enabling Skills: Oral Fluency + Pronunciation",
      "Week 2 — Writing Grammar + Vocabulary Band Boosting",
      "Week 3 — Advanced Listening Strategies",
      "Week 4 — 3× Scored Mocks + 1:1 Feedback & Gap Analysis",
    ],
    bestFor: "Students aiming for 65–79+ for PR or university",
    icon: Award,
    accent: "#7b1fa2",
    accentLight: "#f3e5f5",
    num: "03",
  },
  {
    title: "PTE Fast-Track",
    label: "All Levels",
    week: "2 Weeks",
    price: "NPR 4,500",
    mode: "Offline & Online",
    modeColor: "#00acc1",
    desc: "Rapid-fire PTE revision — key task types, exam-day strategy, and back-to-back scored mocks for last-minute test takers.",
    breakdown: [
      "Week 1 — All Task Types Overview + Strategy Drills",
      "Week 2 — Scored Mock Tests + Detailed Section Feedback",
    ],
    bestFor: "Students with limited time before their PTE exam",
    icon: Zap,
    accent: "#f9a825",
    accentLight: "#fffde7",
    num: "04",
  },
];

const FEATURES = [
  { text: "Computer-based test simulation environment", color: "#1565c0" },
  { text: "AI-scored practice for instant band feedback", color: "#00acc1" },
  { text: "High-weight task focus: Read Aloud & Essay", color: "#7b1fa2" },
  { text: "Enabling skills: fluency, pronunciation, grammar", color: "#f9a825" },
  { text: "Flexible offline and online class modes", color: "#1565c0" },
  { text: "Ministry of Education approved consultancy", color: "#00acc1" },
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

function ScoreCalculator() {
  const [scores, setScores] = useState<Record<string, string>>({
    speaking: "", writing: "", reading: "", listening: "",
  });
  const keys = ["speaking", "writing", "reading", "listening"] as const;
  const keyColors = ["#1565c0", "#7b1fa2", "#00acc1", "#f9a825"];

  const overall = () => {
    const vals = keys.map((k) => Number(scores[k]));
    if (vals.some((v) => isNaN(v) || v === 0)) return "—";
    const avg = vals.reduce((a, b) => a + b, 0) / 4;
    return Math.round(avg).toString();
  };

  const result = overall();
  const num = parseInt(result);
  const color = !isNaN(num) ? num >= 65 ? "#00acc1" : num >= 50 ? "#f9a825" : "#e53935" : "#c0c0d0";

  const label = !isNaN(num)
    ? num >= 79 ? "Expert" : num >= 65 ? "Proficient" : num >= 50 ? "Competent" : "Developing"
    : "—";

  return (
    <div className="calc-card">
      <p className="calc-eyebrow">Estimate Your Score</p>
      <h2 className="calc-title">PTE Score Calculator</h2>
      <div className="calc-grid">
        {keys.map((k, i) => (
          <div key={k} className="calc-field">
            <label className="calc-label" style={{ color: keyColors[i] }}>
              {k.charAt(0).toUpperCase() + k.slice(1)}
            </label>
            <input
              type="number" min={10} max={90} step={1}
              placeholder="10 – 90"
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
          <p className="calc-result-label">Overall PTE Score</p>
          <p className="calc-result-hint">
            Level: <strong style={{ color }}>{label}</strong> &nbsp;·&nbsp; Scale: 10–90
          </p>
        </div>
        <span className="calc-result-score" style={{ color }}>{result}</span>
      </div>
    </div>
  );
}

function CourseCard({ c, visible }: { c: typeof FALLBACK_COURSES[0]; visible: boolean }) {
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

function TaskWeightCard() {
  const tasks = [
    { name: "Read Aloud", weight: 88, color: "#1565c0" },
    { name: "Repeat Sentence", weight: 82, color: "#00acc1" },
    { name: "Summarise Written Text", weight: 75, color: "#7b1fa2" },
    { name: "Essay (20 mins)", weight: 70, color: "#f9a825" },
    { name: "Highlight Incorrect Words", weight: 65, color: "#1565c0" },
  ];
  const [animate, setAnimate] = useState(false);
  const [ref, vis] = useInView(0.1);
  useEffect(() => { if (vis) setTimeout(() => setAnimate(true), 200); }, [vis]);
  return (
    <div ref={ref} style={{
      background: "var(--white)", border: "1.5px solid var(--border)",
      borderRadius: 20, padding: "36px 32px", boxShadow: "var(--shadow-sm)",
    }}>
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#1565c0", marginBottom: 8 }}>Strategy</p>
      <h3 style={{ fontFamily: "var(--font-head)", fontSize: "1.4rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 24, color: "var(--text)" }}>
        Highest-Impact Task Types
      </h3>
      {tasks.map((t) => (
        <div key={t.name} style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{t.name}</span>
            <span style={{ fontSize: 12, color: "var(--muted)", fontWeight: 600 }}>Impact {t.weight}%</span>
          </div>
          <div style={{ height: 8, background: "var(--surface2)", borderRadius: 4, overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: 4, background: t.color,
              width: animate ? `${t.weight}%` : "0%",
              transition: "width 1.1s cubic-bezier(0.4,0,0.2,1)",
            }} />
          </div>
        </div>
      ))}
      <div style={{ marginTop: 16, padding: "12px 16px", background: "#e3f2fd", borderRadius: 10, fontSize: 13, color: "#1565c0", lineHeight: 1.6, fontWeight: 500 }}>
        💡 Mastering Read Aloud alone can significantly improve your Speaking <em>and</em> Listening scores simultaneously.
      </div>
    </div>
  );
}

export default function PTECourses() {
  const [coursesRef, coursesVis] = useInView();
  const [featRef, featVis] = useInView();
  const [pricRef, pricVis] = useInView();
  const [courses, setCourses] = useState(FALLBACK_COURSES);

  useEffect(() => {
    let ignore = false;
    async function loadCourses() {
      try {
        const res = await fetch("/api/eng-courses?testType=pte", { cache: "no-store" });
        const data = await res.json();
        if (!ignore && res.ok && data?.success && Array.isArray(data.courses) && data.courses.length > 0) {
          const next = data.courses.map((item: {
            title?: string;
            target?: string;
            courseTime?: string;
            price?: string;
            description?: string;
            breakdown?: string[];
          }, i: number) => {
            const ui = FALLBACK_COURSES[i % FALLBACK_COURSES.length];
            return {
              ...ui,
              title: String(item.title || ui.title),
              label: String(item.target || ui.label),
              week: String(item.courseTime || ui.week),
              price: String(item.price || ui.price),
              desc: String(item.description || ui.desc),
              breakdown: Array.isArray(item.breakdown) && item.breakdown.length ? item.breakdown : ui.breakdown,
              num: String(i + 1).padStart(2, "0"),
            };
          });
          setCourses(next);
        }
      } catch (error) {
        console.error("Failed to load PTE courses", error);
      }
    }

    loadCourses();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #f0f4ff;
          --white: #ffffff;
          --surface2: #e8edf8;
          --border: #dde4f4;
          --text: #0d1b3e;
          --muted: #5a6a8a;
          --blue: #1565c0;
          --cyan: #00acc1;
          --violet: #7b1fa2;
          --amber: #f9a825;
          --font-head: 'Syne', sans-serif;
          --font-body: 'DM Sans', sans-serif;
          --shadow-sm: 0 2px 8px rgba(21,101,192,0.07);
          --shadow-md: 0 8px 24px rgba(21,101,192,0.12);
          --shadow-lg: 0 20px 48px rgba(21,101,192,0.16);
        }

        body { background: var(--bg); color: var(--text); font-family: var(--font-body); }

        .hero {
          position: relative; min-height: 92vh; display: flex; align-items: center;
          padding: 80px 6vw 60px; overflow: hidden; background: var(--text);
        }
        .hero-blob { position: absolute; border-radius: 50%; filter: blur(90px); opacity: 0.18; }
        .hero-inner {
          position: relative; display: grid;
          grid-template-columns: 1fr 1fr; gap: 80px;
          align-items: center; max-width: 1200px; margin: 0 auto; width: 100%;
        }
        @media (max-width: 860px) {
          .hero-inner { grid-template-columns: 1fr; gap: 48px; }
          .hero-visual { display: none; }
        }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 6px 16px; border-radius: 100px; font-size: 11px;
          font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
          color: #00acc1; background: rgba(0,172,193,0.15);
          border: 1px solid rgba(0,172,193,0.3); margin-bottom: 24px; width: fit-content;
        }
        .hero-badge span { width: 6px; height: 6px; background: #00acc1; border-radius: 50%; animation: pulse 2s ease-in-out infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.7); } }
        .hero-h1 {
          font-family: var(--font-head); font-size: clamp(2.8rem, 5vw, 5rem);
          font-weight: 800; line-height: 1.05; letter-spacing: -0.03em; margin-bottom: 22px; color: #fff;
        }
        .w-cyan { color: #00acc1; }
        .w-amber { color: #f9a825; }
        .w-violet { color: #a78bfa; }
        .hero-sub { font-size: 1.05rem; color: rgba(255,255,255,0.55); line-height: 1.75; max-width: 440px; margin-bottom: 40px; }
        .hero-cta { display: flex; gap: 14px; flex-wrap: wrap; }
        .btn-primary {
          padding: 14px 30px; background: #00acc1; color: #fff;
          font-family: var(--font-head); font-weight: 700; font-size: 14px;
          letter-spacing: 0.04em; border-radius: 10px; border: none; cursor: pointer;
          text-decoration: none; display: inline-block;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 16px rgba(0,172,193,0.4);
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(0,172,193,0.5); }
        .btn-ghost {
          padding: 14px 30px; background: transparent; color: rgba(255,255,255,0.8);
          font-family: var(--font-head); font-weight: 600; font-size: 14px;
          letter-spacing: 0.04em; border-radius: 10px;
          border: 1.5px solid rgba(255,255,255,0.2); cursor: pointer;
          text-decoration: none; display: inline-block;
          transition: border-color 0.2s, background 0.2s;
        }
        .btn-ghost:hover { border-color: rgba(255,255,255,0.5); background: rgba(255,255,255,0.06); }

        .hero-visual { display: flex; align-items: center; justify-content: center; }
        .hero-visual-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; width: 380px; }
        .hero-vis-card {
          background: rgba(255,255,255,0.07); border: 1.5px solid rgba(255,255,255,0.12);
          border-radius: 18px; padding: 22px 20px;
          backdrop-filter: blur(10px);
          transition: transform 0.3s, background 0.3s;
        }
        .hero-vis-card:hover { transform: translateY(-4px); background: rgba(255,255,255,0.12); }
        .hero-vis-card:nth-child(2) { margin-top: 24px; }
        .hero-vis-card:nth-child(4) { margin-top: -24px; }
        .vis-icon { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 12px; font-size: 18px; }
        .vis-label { font-size: 10px; color: rgba(255,255,255,0.45); font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 4px; }
        .vis-value { font-family: var(--font-head); font-size: 1.6rem; font-weight: 800; letter-spacing: -0.03em; color: #fff; }

        .stats-strip { background: #1565c0; padding: 52px 6vw; display: flex; justify-content: center; flex-wrap: wrap; }
        .stat-box { flex: 1 1 180px; display: flex; flex-direction: column; align-items: center; padding: 16px 32px; position: relative; }
        .stat-box:not(:last-child)::after { content: ''; position: absolute; right: 0; top: 20%; bottom: 20%; width: 1px; background: rgba(255,255,255,0.15); }
        .stat-num { font-family: var(--font-head); font-size: clamp(2.4rem, 5vw, 3.2rem); font-weight: 800; letter-spacing: -0.04em; line-height: 1; }
        .stat-label { font-size: 11px; color: rgba(255,255,255,0.5); letter-spacing: 0.12em; text-transform: uppercase; margin-top: 8px; font-weight: 600; }

        .section { padding: 96px 6vw; max-width: 1200px; margin: 0 auto; }
        .section-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 10px; }
        .section-title { font-family: var(--font-head); font-size: clamp(1.8rem, 3.5vw, 2.8rem); font-weight: 800; letter-spacing: -0.03em; margin-bottom: 56px; max-width: 480px; line-height: 1.15; }

        .courses-outer { background: var(--bg); }
        .courses-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
        .course-card {
          background: var(--white); border: 1.5px solid var(--border);
          border-radius: 20px; padding: 40px 32px; position: relative; overflow: hidden;
          opacity: 0; transform: translateY(36px);
          transition: opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s;
        }
        .course-card.vis { opacity: 1; transform: translateY(0); }
        .course-card:nth-child(1) { transition-delay: 0s; }
        .course-card:nth-child(2) { transition-delay: 0.12s; }
        .course-card:nth-child(3) { transition-delay: 0.24s; }
        .course-card:nth-child(4) { transition-delay: 0.36s; }
        .course-card:hover { box-shadow: var(--shadow-lg); }
        .course-top-bar { position: absolute; top: 0; left: 0; right: 0; height: 4px; border-radius: 20px 20px 0 0; }
        .course-num { font-family: var(--font-head); font-size: 100px; font-weight: 800; position: absolute; top: -16px; right: 20px; opacity: 0.05; line-height: 1; pointer-events: none; user-select: none; color: var(--text); }
        .course-icon-wrap { width: 52px; height: 52px; border-radius: 14px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; }
        .course-week { font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 8px; }
        .course-title { font-family: var(--font-head); font-size: 1.6rem; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 4px; color: var(--text); }
        .course-band { font-size: 0.9rem; color: var(--muted); font-weight: 500; margin-bottom: 8px; }
        .course-desc { font-size: 0.9rem; color: var(--muted); line-height: 1.75; }
        .course-link { display: flex; align-items: center; gap: 6px; font-family: var(--font-head); font-size: 13px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; text-decoration: none; opacity: 0.45; transition: opacity 0.2s, gap 0.2s; }
        .course-card:hover .course-link { opacity: 1; gap: 10px; }

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
        .feature-row:nth-child(1) { transition-delay: 0.05s; } .feature-row:nth-child(2) { transition-delay: 0.1s; }
        .feature-row:nth-child(3) { transition-delay: 0.15s; } .feature-row:nth-child(4) { transition-delay: 0.2s; }
        .feature-row:nth-child(5) { transition-delay: 0.25s; } .feature-row:nth-child(6) { transition-delay: 0.3s; }
        .feature-row:hover { background: var(--surface2); }
        .feature-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
        .feature-text { font-size: 0.95rem; font-weight: 600; color: var(--text); }
        .features-right { display: flex; flex-direction: column; gap: 18px; }
        .feat-card { border-radius: 18px; padding: 30px 28px; border: 1.5px solid transparent; }
        .feat-card-icon { font-size: 1.8rem; margin-bottom: 12px; }
        .feat-card-title { font-family: var(--font-head); font-size: 1.05rem; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 8px; color: var(--text); }
        .feat-card-text { font-size: 0.875rem; color: var(--muted); line-height: 1.7; }

        .pricing-outer { background: var(--bg); }
        .pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; }
        .price-card {
          background: var(--white); border: 1.5px solid var(--border); border-radius: 20px;
          padding: 40px 32px; display: flex; flex-direction: column;
          opacity: 0; transform: translateY(30px);
          transition: opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s;
          position: relative; overflow: hidden;
        }
        .price-card.vis { opacity: 1; transform: translateY(0); }
        .price-card:nth-child(1) { transition-delay: 0s; } .price-card:nth-child(2) { transition-delay: 0.12s; }
        .price-card:nth-child(3) { transition-delay: 0.24s; } .price-card:nth-child(4) { transition-delay: 0.36s; }
        .price-card:hover { box-shadow: var(--shadow-lg); }
        .price-corner { position: absolute; bottom: -30px; right: -30px; width: 100px; height: 100px; border-radius: 50%; opacity: 0.1; }
        .price-tag { display: inline-block; padding: 4px 14px; border-radius: 100px; font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 24px; width: fit-content; }
        .price-name { font-family: var(--font-head); font-size: 1.15rem; font-weight: 700; margin-bottom: 6px; color: var(--text); }
        .price-duration { font-size: 12px; color: var(--muted); margin-bottom: 14px; font-weight: 500; }
        .price-amount { font-family: var(--font-head); font-size: 2.4rem; font-weight: 800; letter-spacing: -0.04em; line-height: 1; margin-bottom: 4px; }
        .price-amount-sub { font-size: 11.5px; color: var(--muted); margin-bottom: 22px; }
        .price-divider { height: 1px; background: var(--border); margin-bottom: 22px; }
        .price-features { list-style: none; display: flex; flex-direction: column; gap: 12px; flex: 1; margin-bottom: 28px; }
        .price-features li { font-size: 0.875rem; color: var(--muted); display: flex; align-items: flex-start; gap: 10px; line-height: 1.5; }
        .price-btn { width: 100%; padding: 14px; border-radius: 10px; font-family: var(--font-head); font-weight: 700; font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer; border: 2px solid; transition: transform 0.15s, box-shadow 0.15s, background 0.2s, color 0.2s; }
        .price-btn:hover { transform: translateY(-2px); }

        .calc-outer { background: var(--white); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .calc-card { max-width: 780px; margin: 0 auto; }
        .calc-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--cyan); margin-bottom: 10px; }
        .calc-title { font-family: var(--font-head); font-size: clamp(1.8rem, 3.5vw, 2.8rem); font-weight: 800; letter-spacing: -0.03em; margin-bottom: 48px; }
        .calc-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 16px; margin-bottom: 32px; }
        .calc-field { display: flex; flex-direction: column; gap: 8px; }
        .calc-label { font-size: 10px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; }
        .calc-input { background: var(--bg); border: 1.5px solid var(--border); border-radius: 12px; padding: 14px 16px; color: var(--text); font-size: 1.1rem; font-family: var(--font-head); font-weight: 700; outline: none; width: 100%; -moz-appearance: textfield; transition: border-color 0.2s; }
        .calc-input::-webkit-outer-spin-button, .calc-input::-webkit-inner-spin-button { -webkit-appearance: none; }
        .calc-result { display: flex; align-items: center; justify-content: space-between; background: var(--bg); border: 2px solid; border-radius: 16px; padding: 28px 36px; transition: border-color 0.4s; }
        .calc-result-label { font-family: var(--font-head); font-weight: 700; font-size: 1rem; margin-bottom: 4px; }
        .calc-result-hint { font-size: 12px; color: var(--muted); }
        .calc-result-score { font-family: var(--font-head); font-size: 3.5rem; font-weight: 800; letter-spacing: -0.05em; transition: color 0.4s; }

        .cta-section { padding: 110px 6vw; text-align: center; position: relative; overflow: hidden; background: #1565c0; }
        .cta-dots { position: absolute; inset: 0; pointer-events: none; background-image: radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px); background-size: 28px 28px; }
        .cta-bar { display: flex; height: 6px; width: 80px; margin: 0 auto 40px; border-radius: 3px; overflow: hidden; }
        .cta-bar span { flex: 1; }
        .cta-title { font-family: var(--font-head); font-size: clamp(2.2rem, 5vw, 4.2rem); font-weight: 800; letter-spacing: -0.03em; line-height: 1.1; margin-bottom: 18px; color: #fff; position: relative; }
        .cta-title .highlight { color: #00acc1; }
        .cta-sub { color: rgba(255,255,255,0.5); font-size: 1rem; margin-bottom: 44px; position: relative; }
        .cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; position: relative; }
        .btn-white { padding: 14px 32px; background: #fff; color: #1565c0; font-family: var(--font-head); font-weight: 700; font-size: 14px; border-radius: 10px; border: none; cursor: pointer; text-decoration: none; display: inline-block; letter-spacing: 0.04em; transition: transform 0.2s, box-shadow 0.2s; box-shadow: 0 4px 16px rgba(0,0,0,0.2); }
        .btn-white:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(0,0,0,0.3); }
        .btn-outline-white { padding: 14px 32px; background: transparent; color: rgba(255,255,255,0.85); font-family: var(--font-head); font-weight: 600; font-size: 14px; border-radius: 10px; border: 1.5px solid rgba(255,255,255,0.3); cursor: pointer; text-decoration: none; display: inline-block; letter-spacing: 0.04em; transition: border-color 0.2s, background 0.2s; }
        .btn-outline-white:hover { border-color: rgba(255,255,255,0.6); background: rgba(255,255,255,0.08); }

        @media (max-width: 640px) {
          .hero { padding: 80px 24px 60px; } .section { padding: 72px 24px; }
          .stats-strip { padding: 40px 24px; } .stat-box::after { display: none; }
          .calc-result { flex-direction: column; gap: 16px; text-align: center; }
          .cta-section { padding: 80px 24px; }
        }
      `}</style>

      <main style={{ background: "var(--bg)" }}>

        {/* ── HERO (dark) ── */}
        <section className="hero">
          <div className="hero-blob" style={{ width: 500, height: 500, top: -100, right: -80, background: "#00acc1" }} />
          <div className="hero-blob" style={{ width: 400, height: 400, bottom: -80, left: "25%", background: "#1565c0" }} />
          <div className="hero-blob" style={{ width: 300, height: 300, top: "30%", left: -60, background: "#7b1fa2" }} />

          <div className="hero-inner">
            <div>
              <div className="hero-badge"><span /> PTE Academic Coaching · Kathmandu</div>
              <h1 className="hero-h1">
                <span className="w-cyan">Ace PTE.</span><br />
                <span className="w-amber">Score faster</span><br />
                <span className="w-violet">with AI.</span>
              </h1>
              <p className="hero-sub">
                Computer-based. AI-scored. Four focused courses from beginner to 79+. Master the high-weight tasks and get your target score fast.
              </p>
              <div className="hero-cta">
                <a href="/contact" className="btn-primary">Book Free Trial</a>
                <a href="#courses" className="btn-ghost">View Courses ↓</a>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-visual-grid">
                {[
                  { label: "Foundation", value: "6 weeks", icon: "📚" },
                  { label: "Intensive", value: "5 weeks", icon: "💻" },
                  { label: "Advanced", value: "4 weeks", icon: "🏆" },
                  { label: "Fast-Track", value: "2 weeks", icon: "⚡" },
                ].map((item, i) => (
                  <div key={i} className="hero-vis-card">
                    <div className="vis-icon" style={{ background: "rgba(255,255,255,0.08)" }}>{item.icon}</div>
                    <p className="vis-label">{item.label}</p>
                    <p className="vis-value">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <div className="stats-strip">
          <StatBox value="400" suffix="+" label="PTE Students" accent="#00acc1" />
          <StatBox value="88" suffix="%" label="Success Rate" accent="#f9a825" />
          <StatBox value="65" suffix="+" label="Avg Score Achieved" accent="#a78bfa" />
          <StatBox value="4" suffix="" label="Course Options" accent="#fff" />
        </div>

        {/* ── COURSES ── */}
        <div className="courses-outer">
          <div className="section" id="courses">
            <p className="section-eyebrow" style={{ color: "#1565c0" }}>Programs</p>
            <h2 className="section-title">Choose Your PTE Path</h2>
            <div className="courses-grid" ref={coursesRef}>
              {courses.map((c) => <CourseCard key={c.title} c={c} visible={coursesVis} />)}
            </div>
          </div>
        </div>

        {/* ── FEATURES ── */}
        <div className="features-outer">
          <div className="section">
            <div className="features-inner">
              <div>
                <p className="section-eyebrow" style={{ color: "#00acc1" }}>Why Study Sync</p>
                <h2 className="section-title">Computer-smart prep for a computer test.</h2>
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
                <TaskWeightCard />
                {[
                  { icon: "🤖", title: "AI Scoring Practice", text: "Practise with AI-scored tasks that mimic the real PTE scoring engine — know your score before exam day.", color: "#e0f7fa", border: "#00acc1" },
                  { icon: "🎯", title: "High-Weight Task Mastery", text: "Read Aloud and Repeat Sentence affect 6+ skills at once. We drill these until they're automatic.", color: "#f3e5f5", border: "#7b1fa2" },
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
        

        {/* ── CALCULATOR ── */}
        <div className="calc-outer">
          <div className="section">
            <ScoreCalculator />
          </div>
        </div>

        {/* ── CTA ── */}
        <section className="cta-section">
          <div className="cta-dots" />
          <div className="cta-bar">
            <span style={{ background: "#00acc1" }} />
            <span style={{ background: "#f9a825" }} />
            <span style={{ background: "#a78bfa" }} />
            <span style={{ background: "#fff" }} />
          </div>
          <h2 className="cta-title">
            Ready to <span className="highlight">score</span><br />your target PTE?
          </h2>
          <p className="cta-sub">Start with a free trial class — no commitment, real practice.</p>
          <div className="cta-btns">
            <a href="/contact" className="btn-white">Book Free Trial</a>
            <a href="/contact" className="btn-outline-white">Talk to an Advisor</a>
          </div>
        </section>

      </main>
    </>
  );
}
