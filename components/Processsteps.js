"use client";

import { useState } from "react";
import Link from "next/link";

const steps = [
  {
    id: 1,
    label: "Meet",
    color: "#e8352a",
    bg: "#fff0ef",
    borderGlow: "rgba(232,53,42,0.18)",
    desc: "Book a free one-on-one session with your dedicated counsellor. We learn about your goals, academic background, and preferred countries.",
    tags: ["Free session", "Profile review", "Goal mapping"],
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
      </svg>
    ),
  },
  {
    id: 2,
    label: "Plan",
    color: "#e8922a",
    bg: "#fff7ee",
    borderGlow: "rgba(232,146,42,0.18)",
    desc: "We build a personalised roadmap — shortlisting universities, course options, intake timelines, and estimated budgets tailored to your profile.",
    tags: ["University shortlist", "Budget plan", "Intake timeline"],
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
      </svg>
    ),
  },
  {
    id: 3,
    label: "Prepare",
    color: "#1a9e5c",
    bg: "#edf9f3",
    borderGlow: "rgba(26,158,92,0.18)",
    desc: "We help craft your SOP, gather recommendation letters, organise transcripts, and prepare every document your application needs.",
    tags: ["SOP writing", "Document checklist", "Rec letters"],
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
  },
  {
    id: 4,
    label: "Apply",
    color: "#1a90c8",
    bg: "#edf6fb",
    borderGlow: "rgba(26,144,200,0.18)",
    desc: "Applications are submitted through the correct portals with careful attention to deadlines. We track every submission and follow up on offer letters.",
    tags: ["Portal submission", "Deadline tracking", "Offer follow-up"],
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    id: 5,
    label: "Visa",
    color: "#e8352a",
    bg: "#fff0ef",
    borderGlow: "rgba(232,53,42,0.18)",
    desc: "Our expert team prepares a watertight visa file — financial documents, cover letters, and mock interview practice — to maximise your approval chances.",
    tags: ["Document review", "Mock interview", "99%+ success"],
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
      </svg>
    ),
  },
  {
    id: 6,
    label: "Fly Abroad",
    color: "#1a9e5c",
    bg: "#edf9f3",
    borderGlow: "rgba(26,158,92,0.18)",
    desc: "Pre-departure briefing, accommodation guidance, and a warm handover to our alumni network. Your new chapter begins — we're still here if you need us.",
    tags: ["Pre-departure brief", "Accommodation", "Alumni network"],
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
      </svg>
    ),
  },
];

export default function ProcessSteps() {
  const [active, setActive] = useState(0);
  const step = steps[active];
  const progress = ((active + 1) / steps.length) * 100;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

        .ps-section {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: #f7f8fa;
          padding: 80px 48px;
        }
        .ps-inner { max-width: 1040px; margin: 0 auto; }

        /* HEADING */
        .ps-heading-wrap { text-align: center; margin-bottom: 56px; }
        .ps-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          background: #fff0ef; border: 1px solid #fad4d1;
          border-radius: 100px; padding: 5px 14px 5px 8px;
          margin-bottom: 14px;
        }
        .ps-eyebrow-dot { width: 7px; height: 7px; border-radius: 50%; background: #e8352a; animation: psPulse 2s ease infinite; }
        @keyframes psPulse {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:0.5; transform:scale(0.8); }
        }
        .ps-eyebrow-text { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #e8352a; }
        .ps-title { font-size: clamp(1.7rem, 3.5vw, 2.5rem); font-weight: 700; color: #111; letter-spacing: -0.02em; line-height: 1.2; margin-bottom: 10px; }
        .ps-title span { color: #3d52c4; }
        .ps-subtitle { font-size: 0.9rem; color: #999; font-weight: 300; line-height: 1.7; max-width: 480px; margin: 0 auto; }

        /* TRACK */
        .ps-track-wrap { position: relative; margin-bottom: 32px; }
        .ps-track {
          display: flex; align-items: flex-start;
          overflow-x: auto; padding-bottom: 4px;
          scrollbar-width: none;
        }
        .ps-track::-webkit-scrollbar { display: none; }

        /* STEP ITEM */
        .ps-step {
          display: flex; flex-direction: column; align-items: center;
          flex: 1; min-width: 80px; cursor: pointer;
          position: relative;
        }
        .ps-step-connector {
          flex: 1; display: flex; align-items: flex-start;
          padding-top: 26px; min-width: 16px;
        }
        .ps-connector-line {
          height: 2px; width: 100%;
          border-top: 2px dashed #e0e0e0;
          transition: border-color 0.4s;
        }
        .ps-connector-line.done { border-top: 2px solid #d0d0d0; }

        /* CIRCLE */
        .ps-circle {
          width: 52px; height: 52px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          border: 2px solid #e0e0e0;
          background: #fff;
          transition: all 0.35s cubic-bezier(.34,1.3,.64,1);
          position: relative; z-index: 1; flex-shrink: 0;
        }
        .ps-step.active .ps-circle {
          transform: scale(1.15);
          border-width: 2.5px;
        }
        .ps-step.done .ps-circle { opacity: 0.55; }

        .ps-step-num {
          font-size: 11px; font-weight: 600;
          color: #bbb; margin-top: 9px;
          letter-spacing: 0.06em;
          transition: color 0.3s;
        }
        .ps-step.active .ps-step-num { font-weight: 700; }
        .ps-step-label {
          font-size: 0.7rem; font-weight: 700;
          color: #bbb; margin-top: 3px;
          text-align: center; text-transform: uppercase;
          letter-spacing: 0.06em;
          transition: color 0.3s;
          line-height: 1.3;
        }
        .ps-step.active .ps-step-label { color: #111; }
        .ps-step.done .ps-step-label { color: #ccc; }

        /* PROGRESS BAR */
        .ps-progress-bar {
          height: 3px; background: #ebebeb;
          border-radius: 2px; overflow: hidden;
          margin-bottom: 24px;
        }
        .ps-progress-fill {
          height: 100%; border-radius: 2px;
          transition: width 0.45s ease, background 0.3s ease;
        }

        /* DETAIL PANEL */
        .ps-panel {
          background: #fff; border: 1px solid #ebebeb;
          border-radius: 16px; padding: 28px 28px 24px;
          animation: psPanelIn 0.3s ease;
          position: relative; overflow: hidden;
        }
        @keyframes psPanelIn {
          from { opacity:0; transform:translateY(8px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .ps-panel-accent {
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          border-radius: 16px 16px 0 0;
        }
        .ps-panel-top { display: flex; align-items: flex-start; gap: 16px; margin-bottom: 14px; }
        .ps-panel-icon {
          width: 48px; height: 48px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .ps-panel-step-num {
          font-size: 0.65rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.14em;
          color: #bbb; margin-bottom: 3px;
        }
        .ps-panel-title {
          font-size: 1.1rem; font-weight: 700;
          color: #111; letter-spacing: -0.01em;
        }
        .ps-panel-desc {
          font-size: 0.875rem; color: #777;
          line-height: 1.78; font-weight: 300;
          margin-bottom: 16px;
        }
        .ps-panel-tags { display: flex; gap: 8px; flex-wrap: wrap; }
        .ps-panel-tag {
          font-size: 0.72rem; font-weight: 600;
          padding: 4px 12px; border-radius: 6px;
          border: 1px solid #ebebeb; background: #f7f8fa;
          color: #888;
        }

        /* NAV ROW */
        .ps-nav-row {
          display: flex; align-items: center;
          justify-content: space-between;
          margin-top: 20px; flex-wrap: wrap; gap: 12px;
        }
        .ps-nav-btn {
          display: flex; align-items: center; gap: 6px;
          background: #fff; border: 1.5px solid #e8e8e8;
          border-radius: 8px; padding: 9px 18px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.8rem; font-weight: 600; color: #555;
          cursor: pointer; transition: all 0.18s;
        }
        .ps-nav-btn:hover:not(:disabled) { border-color: #ccc; color: #111; }
        .ps-nav-btn:disabled { opacity: 0.3; cursor: not-allowed; }
        .ps-nav-btn.primary {
          border-color: transparent;
          color: #fff;
          transition: background 0.18s, transform 0.15s;
        }
        .ps-nav-btn.primary:hover:not(:disabled) { transform: translateY(-1px); }

        /* DOTS */
        .ps-dots { display: flex; gap: 7px; align-items: center; }
        .ps-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #e0e0e0; cursor: pointer;
          border: none; padding: 0;
          transition: all 0.25s;
        }
        .ps-dot.active { transform: scale(1.35); }

        /* CTA */
        .ps-cta-wrap { text-align: center; margin-top: 48px; }
        .ps-cta-text { font-size: 0.85rem; color: #aaa; margin-bottom: 14px; }
        .ps-cta-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: #e8352a; color: #fff;
          border: none; border-radius: 10px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.875rem; font-weight: 600;
          padding: 14px 32px; cursor: pointer;
          text-decoration: none;
          transition: background 0.18s, transform 0.15s;
        }
        .ps-cta-btn:hover { background: #c8281e; transform: translateY(-2px); }

        @media (max-width: 640px) {
          .ps-section { padding: 56px 20px; }
          .ps-panel { padding: 22px 18px 20px; }
          .ps-nav-row { flex-direction: column; align-items: stretch; }
          .ps-nav-btn { justify-content: center; }
        }
      `}</style>

      <section className="ps-section">
        <div className="ps-inner">

          {/* HEADING */}
          <div className="ps-heading-wrap">
            <div className="ps-eyebrow">
              <div className="ps-eyebrow-dot" />
              <span className="ps-eyebrow-text">How It Works</span>
            </div>
            <h2 className="ps-title">
              Get Real Guidelines{" "}
              <span>From Expert Counsellor</span>
            </h2>
            <p className="ps-subtitle">
              Six simple steps from your first meeting to boarding the plane — we guide you through every stage.
            </p>
          </div>

          {/* STEP TRACK */}
          <div className="ps-track-wrap">
            <div className="ps-track">
              {steps.map((s, i) => {
                const state = i < active ? "done" : i === active ? "active" : "";
                return (
                  <div key={s.id} style={{ display: "flex", alignItems: "flex-start", flex: 1 }}>
                    <div
                      className={`ps-step ${state}`}
                      onClick={() => setActive(i)}
                      style={{ minWidth: 72 }}
                    >
                      <div
                        className="ps-circle"
                        style={
                          i === active
                            ? { borderColor: s.color, boxShadow: `0 0 0 5px ${s.borderGlow}` }
                            : {}
                        }
                      >
                        <span style={{ color: i === active ? s.color : i < active ? "#ccc" : "#ccc" }}>
                          {s.icon}
                        </span>
                      </div>
                      <div
                        className="ps-step-num"
                        style={i === active ? { color: s.color } : {}}
                      >
                        {String(s.id).padStart(2, "0")}
                      </div>
                      <div
                        className="ps-step-label"
                        style={i === active ? { color: s.color } : {}}
                      >
                        {s.label}
                      </div>
                    </div>

                    {/* CONNECTOR */}
                    {i < steps.length - 1 && (
                      <div className="ps-step-connector">
                        <div className={`ps-connector-line${i < active ? " done" : ""}`} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* PROGRESS BAR */}
          <div className="ps-progress-bar">
            <div
              className="ps-progress-fill"
              style={{ width: `${progress}%`, background: step.color }}
            />
          </div>

          {/* DETAIL PANEL */}
          <div className="ps-panel" key={active}>
            <div className="ps-panel-accent" style={{ background: step.color }} />
            <div className="ps-panel-top">
              <div
                className="ps-panel-icon"
                style={{ background: step.bg, color: step.color }}
              >
                {step.icon}
              </div>
              <div>
                <div className="ps-panel-step-num">
                  Step {step.id} of {steps.length}
                </div>
                <div className="ps-panel-title">{step.label}</div>
              </div>
            </div>
            <p className="ps-panel-desc">{step.desc}</p>
            <div className="ps-panel-tags">
              {step.tags.map((tag) => (
                <span
                  key={tag}
                  className="ps-panel-tag"
                  style={{ borderColor: step.color + "30", color: step.color }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* NAV ROW */}
          <div className="ps-nav-row">
            <button
              className="ps-nav-btn"
              onClick={() => setActive((a) => Math.max(0, a - 1))}
              disabled={active === 0}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>

            <div className="ps-dots">
              {steps.map((s, i) => (
                <button
                  key={i}
                  className={`ps-dot${i === active ? " active" : ""}`}
                  onClick={() => setActive(i)}
                  style={{ background: i === active ? s.color : undefined }}
                  aria-label={`Go to step ${i + 1}`}
                />
              ))}
            </div>

            {active < steps.length - 1 ? (
              <button
                className="ps-nav-btn primary"
                onClick={() => setActive((a) => Math.min(steps.length - 1, a + 1))}
                style={{ background: step.color }}
              >
                Next Step
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ) : (
              <Link href="/contact" className="ps-nav-btn primary" style={{ background: "#1a9e5c" }}>
                Book Consultation
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </div>

          {/* CTA */}
          <div className="ps-cta-wrap">
            <p className="ps-cta-text">Ready to start your journey? It's completely free.</p>
            <Link href="/contact" className="ps-cta-btn">
              Book Free Consultation
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12h12m0 0-4-4m4 4-4 4" />
              </svg>
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}