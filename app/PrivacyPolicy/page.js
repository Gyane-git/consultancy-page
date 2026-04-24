"use client";

import Link from "next/link";

const sections = [
  {
    number: "1",
    title: "Who We Are",
    color: "#e8352a",
    content: (
      <p>Study Sync Private Limited is an educational consultancy based in Kathmandu, Nepal, helping students apply to universities abroad with admissions, visa support, and career counselling.</p>
    ),
  },
  {
    number: "2",
    title: "Information We Collect",
    color: "#e8922a",
    content: (
      <ul>
        <li><strong>Personal info:</strong> Name, email, phone, DOB, passport, address</li>
        <li><strong>Educational docs:</strong> Transcripts, IELTS/PTE, SOP, recommendations</li>
        <li><strong>Financial info:</strong> Bank statements, sponsor details</li>
        <li><strong>Usage data:</strong> Cookies, analytics, browsing behavior</li>
      </ul>
    ),
  },
  {
    number: "3",
    title: "How We Use Your Information",
    color: "#1a9e5c",
    content: (
      <ul>
        <li>Assess eligibility for study abroad programs</li>
        <li>Support admission &amp; visa processes</li>
        <li>Communicate with institutions on your behalf</li>
        <li>Improve our services &amp; website experience</li>
      </ul>
    ),
  },
  {
    number: "4",
    title: "Data Sharing",
    color: "#1a90c8",
    content: (
      <p>We may share data with universities, visa authorities, and trusted service providers. <strong>We never sell your personal data</strong> to third parties.</p>
    ),
  },
  {
    number: "5",
    title: "Data Security",
    color: "#e8352a",
    content: (
      <p>We use appropriate technical and organizational measures to protect your data. However, no system is 100% secure, and we cannot guarantee absolute security.</p>
    ),
  },
  {
    number: "6",
    title: "Your Rights",
    color: "#e8922a",
    content: (
      <ul>
        <li>Access your personal data</li>
        <li>Request corrections to inaccurate data</li>
        <li>Withdraw consent at any time</li>
        <li>Request deletion of your data</li>
      </ul>
    ),
  },
  {
    number: "7",
    title: "Cookies & Analytics",
    color: "#1a9e5c",
    content: (
      <p>We use cookies and tools like Google Analytics to understand website usage and improve your experience. You can disable cookies through your browser settings at any time.</p>
    ),
  },
  {
    number: "8",
    title: "External Links",
    color: "#1a90c8",
    content: (
      <p>Our platform may contain links to third-party websites. We are not responsible for the content or privacy practices of those external sites.</p>
    ),
  },
  {
    number: "9",
    title: "Contact Us",
    color: "#e8352a",
    content: (
      <div className="pp-contact-block">
        <a href="tel:015924164" className="pp-contact-item">
          <span className="pp-contact-icon">📞</span>
          <span>015924164</span>
        </a>
        <a href="mailto:admin@studysync.com.np" className="pp-contact-item">
          <span className="pp-contact-icon">📧</span>
          <span>admin@studysync.com.np</span>
        </a>
      </div>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .pp-root {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: #f7f8fa;
          min-height: 100vh;
          color: #1a1a1a;
        }

        /* TOPBAR */
        .pp-topbar {
          background: #fff;
          border-bottom: 1px solid #ebebeb;
          padding: 0 48px;
          height: 58px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .pp-dot { width: 9px; height: 9px; border-radius: 50%; }
        .pp-brand { font-size: 0.9rem; font-weight: 700; color: #111; margin-left: 4px; }
        .pp-sep { width: 1px; height: 15px; background: #e5e5e5; margin: 0 10px; }
        .pp-page-label { font-size: 0.78rem; color: #aaa; }

        /* HERO */
        .pp-hero {
          background: #fff;
          border-bottom: 1px solid #ebebeb;
          padding: 52px 48px 44px;
        }
        .pp-hero-inner { max-width: 860px; margin: 0 auto; }
        .pp-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          background: #fff0ef; border: 1px solid #fad4d1;
          border-radius: 100px; padding: 5px 14px 5px 8px;
          margin-bottom: 16px;
        }
        .pp-eyebrow-dot { width: 7px; height: 7px; border-radius: 50%; background: #e8352a; }
        .pp-eyebrow-text { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #e8352a; }
        .pp-hero h1 {
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          font-weight: 800; color: #111;
          letter-spacing: -0.025em; line-height: 1.15;
          margin-bottom: 10px;
        }
        .pp-hero-sub { font-size: 0.875rem; color: #999; line-height: 1.7; max-width: 520px; }
        .pp-hero-meta {
          display: flex; align-items: center; gap: 20px;
          margin-top: 20px; flex-wrap: wrap;
        }
        .pp-meta-chip {
          display: flex; align-items: center; gap: 6px;
          background: #f7f8fa; border: 1px solid #ebebeb;
          border-radius: 8px; padding: 6px 14px;
          font-size: 0.75rem; font-weight: 500; color: #777;
        }

        /* LAYOUT */
        .pp-layout {
          max-width: 860px; margin: 40px auto 80px;
          padding: 0 48px;
          display: grid;
          grid-template-columns: 1fr 220px;
          gap: 32px;
          align-items: start;
        }

        /* SECTIONS */
        .pp-sections { display: flex; flex-direction: column; gap: 0; }
        .pp-section {
          background: #fff;
          border: 1px solid #ebebeb;
          border-radius: 14px;
          margin-bottom: 16px;
          overflow: hidden;
          transition: box-shadow 0.2s;
        }
        .pp-section:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.07); }
        .pp-section-header {
          display: flex; align-items: center; gap: 16px;
          padding: 20px 24px;
          border-bottom: 1px solid #f5f5f5;
        }
        .pp-section-num {
          width: 36px; height: 36px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.85rem; font-weight: 800; flex-shrink: 0;
          color: #fff;
        }
        .pp-section-title {
          font-size: 1rem; font-weight: 700; color: #111;
          letter-spacing: -0.01em;
        }
        .pp-section-body {
          padding: 18px 24px 22px;
          font-size: 0.875rem; color: #666;
          line-height: 1.78;
        }
        .pp-section-body ul {
          list-style: none; padding: 0; margin: 0;
          display: flex; flex-direction: column; gap: 8px;
        }
        .pp-section-body ul li {
          display: flex; align-items: flex-start; gap: 10px;
          padding-left: 0;
        }
        .pp-section-body ul li::before {
          content: '';
          display: inline-block;
          width: 6px; height: 6px; border-radius: 50%;
          background: currentColor; flex-shrink: 0; margin-top: 7px;
          color: #ccc;
        }
        .pp-section-body p { margin: 0; }
        .pp-section-body strong { color: #333; font-weight: 600; }

        /* CONTACT BLOCK */
        .pp-contact-block { display: flex; flex-direction: column; gap: 10px; }
        .pp-contact-item {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 0.875rem; color: #444;
          text-decoration: none; font-weight: 500;
          transition: color 0.15s;
        }
        .pp-contact-item:hover { color: #e8352a; }
        .pp-contact-icon { font-size: 1rem; }

        /* SIDEBAR */
        .pp-sidebar {}
        .pp-sidebar-card {
          background: #fff; border: 1px solid #ebebeb;
          border-radius: 12px; padding: 20px;
          margin-bottom: 16px;
        }
        .pp-sidebar-label {
          font-size: 0.65rem; font-weight: 700;
          letter-spacing: 0.15em; text-transform: uppercase;
          color: #bbb; margin-bottom: 14px;
        }
        .pp-toc-item {
          display: flex; align-items: center; gap: 10px;
          padding: 7px 0; border-bottom: 1px solid #f5f5f5;
          cursor: pointer; transition: color 0.15s;
          text-decoration: none;
        }
        .pp-toc-item:last-child { border-bottom: none; }
        .pp-toc-num {
          width: 20px; height: 20px; border-radius: 5px;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.62rem; font-weight: 800; flex-shrink: 0; color: #fff;
        }
        .pp-toc-text { font-size: 0.75rem; color: #555; font-weight: 500; line-height: 1.3; }
        .pp-toc-item:hover .pp-toc-text { color: #111; }

        .pp-cta-card {
          background: #111; border-radius: 12px;
          padding: 24px 20px; text-align: center;
        }
        .pp-cta-title { font-size: 1rem; font-weight: 800; color: #fff; margin-bottom: 6px; }
        .pp-cta-sub { font-size: 0.75rem; color: rgba(255,255,255,0.45); line-height: 1.6; margin-bottom: 14px; }
        .pp-cta-btn {
          display: block; width: 100%;
          background: #e8352a; color: #fff;
          border: none; border-radius: 7px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.78rem; font-weight: 700;
          padding: 11px 16px; cursor: pointer;
          text-decoration: none; text-align: center;
          transition: background 0.18s;
        }
        .pp-cta-btn:hover { background: #c8281e; }

        .pp-dots-row {
          display: flex; justify-content: center; gap: 8px; padding: 12px 0;
        }

        @media (max-width: 760px) {
          .pp-layout { grid-template-columns: 1fr; padding: 0 20px; }
          .pp-hero, .pp-topbar { padding-left: 20px; padding-right: 20px; }
          .pp-sidebar { display: none; }
        }
      `}</style>

      <div className="pp-root">

        {/* TOPBAR */}
        <div className="pp-topbar">
          <div className="pp-dot" style={{ background: "#e8352a" }} />
          <div className="pp-dot" style={{ background: "#e8922a" }} />
          <div className="pp-dot" style={{ background: "#1a9e5c" }} />
          <div className="pp-dot" style={{ background: "#1a90c8" }} />
          <span className="pp-brand">Study Sync</span>
          <div className="pp-sep" />
          <span className="pp-page-label">Privacy Policy</span>
        </div>

        {/* HERO */}
        <div className="pp-hero">
          <div className="pp-hero-inner">
            <div className="pp-eyebrow">
              <div className="pp-eyebrow-dot" />
              <span className="pp-eyebrow-text">Legal</span>
            </div>
            <h1>Privacy Policy</h1>
            <p className="pp-hero-sub">
              Welcome to Study Sync Private Limited. Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
            </p>
            <div className="pp-hero-meta">
              <div className="pp-meta-chip">
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>
                Last updated: April 2025
              </div>
              <div className="pp-meta-chip">
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
                Kathmandu, Nepal
              </div>
              <Link href="/term" style={{ fontSize: "0.78rem", color: "#1a90c8", fontWeight: 600, textDecoration: "none" }}>
                View Terms & Conditions →
              </Link>
            </div>
          </div>
        </div>

        {/* LAYOUT */}
        <div className="pp-layout">

          {/* SECTIONS */}
          <div className="pp-sections">
            {sections.map((sec) => (
              <div className="pp-section" key={sec.number} id={`section-${sec.number}`}>
                <div className="pp-section-header">
                  <div className="pp-section-num" style={{ background: sec.color }}>
                    {sec.number}
                  </div>
                  <div className="pp-section-title">{sec.title}</div>
                </div>
                <div className="pp-section-body">{sec.content}</div>
              </div>
            ))}
          </div>

          {/* SIDEBAR */}
          <aside className="pp-sidebar">
            <div className="pp-sidebar-card">
              <div className="pp-sidebar-label">Contents</div>
              {sections.map((sec) => (
                <a key={sec.number} href={`#section-${sec.number}`} className="pp-toc-item">
                  <div className="pp-toc-num" style={{ background: sec.color }}>{sec.number}</div>
                  <span className="pp-toc-text">{sec.title}</span>
                </a>
              ))}
            </div>

            <div className="pp-cta-card">
              <div className="pp-cta-title">Book Free Consultation</div>
              <p className="pp-cta-sub">Talk to our expert counsellors about your study abroad journey.</p>
              <Link href="/contact" className="pp-cta-btn">Book Now →</Link>
            </div>

            <div className="pp-sidebar-card">
              <div className="pp-sidebar-label">Related</div>
              <Link href="/term" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", color: "#555", fontSize: "0.8rem", fontWeight: 500, padding: "6px 0" }}>
                <svg width="14" height="14" fill="none" stroke="#1a90c8" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>
                Terms & Conditions
              </Link>
            </div>

            <div className="pp-dots-row">
              {["#e8352a","#e8922a","#1a9e5c","#1a90c8"].map((c) => (
                <div key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />
              ))}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}