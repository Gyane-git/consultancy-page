"use client";

import { useState, useEffect, useRef } from "react";
import TeamSection from "@/components/stap-team"
import Image from "next/image";

const stats = [
  { value: "2005", label: "Founded", color: "#e8352a" },
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

function useInView(threshold = 0.15) {
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

function FadeSection({ children, delay = 0, className = "" }) {
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
                Since 2005, we have been a trusted partner for Nepali students aspiring to study in the UK, USA, Australia, Canada and Denmark — with a legacy of guidance, integrity, and 100% visa dedication.
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
          <span className="ab-since-text">Serving since 2005</span>
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
                  <Image src="data:image/jpeg;base64,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" alt="Dinesh Dhakal" width={300} height={300} />
                  <div className="ab-ceo-photo-overlay" />
                </div>
                <div className="ab-ceo-name">Dinesh Dhakal</div>
                <div className="ab-ceo-role">CEO & Founder</div>
              </div>
              <div>
                <div className="ab-ceo-tag">Mission Insights</div>
                <div className="ab-ceo-quote-title">Message from our CEO</div>
                <p className="ab-ceo-quote-text">
                  At StudySync Educare, we believe every dream deserves the right direction. Since we started, our mission has been to guide students towards a future full of possibilities. We provide them with the knowledge, resources, and confidence they need to succeed globally. Studying abroad is more than just school; it's a life-changing experience. Our dedicated team works hard to make sure every student gets the right opportunity and feels supported along the way. We are not just counselors; we are partners in your success story.
                </p>
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

        <TeamSection/>

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