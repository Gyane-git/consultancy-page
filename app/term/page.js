"use client";

import Link from "next/link";

const sections = [
  {
    number: "1",
    title: "Using Our Website",
    color: "#e8352a",
    content: (
      <p>You agree to provide accurate information and use the website responsibly. Any misuse or unauthorized use of our platform may result in termination of access.</p>
    ),
  },
  {
    number: "2",
    title: "Our Services",
    color: "#e8922a",
    content: (
      <>
        <ul>
          <li>Study abroad counselling</li>
          <li>University applications assistance</li>
          <li>Visa support and documentation guidance</li>
          <li>Career guidance and mentorship</li>
        </ul>
        <p style={{ marginTop: 12, padding: "12px 14px", background: "#fff7ee", borderLeft: "3px solid #e8922a", borderRadius: "0 8px 8px 0", fontSize: "0.84rem", color: "#a06010" }}>
          ⚠️ We do <strong>not</strong> guarantee admission or visa approval. Decisions rest with universities and immigration authorities.
        </p>
      </>
    ),
  },
  {
    number: "3",
    title: "Disclaimer",
    color: "#1a9e5c",
    content: (
      <p>All content on our platform is provided <strong>"as is"</strong> without warranties of any kind. We are not responsible for losses, damages, or inaccuracies arising from reliance on our content.</p>
    ),
  },
  {
    number: "4",
    title: "Intellectual Property",
    color: "#1a90c8",
    content: (
      <p>All website content — including text, images, logos, and design — belongs to <strong>Study Sync Private Limited</strong>. You may not copy, reproduce, or reuse any content without prior written permission.</p>
    ),
  },
  {
    number: "5",
    title: "External Links",
    color: "#e8352a",
    content: (
      <p>Our platform may contain links to third-party websites for reference. We are not responsible for the content, accuracy, or practices of those external websites.</p>
    ),
  },
  {
    number: "6",
    title: "Privacy",
    color: "#e8922a",
    content: (
      <p>
        Your personal data is handled in accordance with our{" "}
        <Link href="/privacy-policy" style={{ color: "#e8922a", fontWeight: 600, textDecoration: "none" }}>
          Privacy Policy
        </Link>
        . By using our services, you consent to our data practices as described therein.
      </p>
    ),
  },
  {
    number: "7",
    title: "Limitation of Liability",
    color: "#1a9e5c",
    content: (
      <p>Study Sync Private Limited is not liable for decisions made by universities, immigration authorities, or other third parties. We provide guidance and support, but final outcomes depend on independent decisions beyond our control.</p>
    ),
  },
  {
    number: "8",
    title: "Changes to Terms",
    color: "#1a90c8",
    content: (
      <p>We reserve the right to update or modify these Terms & Conditions at any time without prior notice. Continued use of our website after changes constitutes acceptance of the new terms.</p>
    ),
  },
  {
    number: "9",
    title: "Governing Law",
    color: "#e8352a",
    content: (
      <p>These terms are governed by and construed in accordance with the <strong>laws of Nepal</strong>. Any disputes shall be subject to the exclusive jurisdiction of the courts in <strong>Kathmandu</strong>.</p>
    ),
  },
  {
    number: "10",
    title: "Contact",
    color: "#e8922a",
    content: (
      <div>
        <p style={{ marginBottom: 12 }}>For any questions regarding these Terms & Conditions, please reach out to us:</p>
        <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#111", marginBottom: 10 }}>Study Sync Private Limited</div>
        <div className="tc-contact-block">
          <a href="tel:015924164" className="tc-contact-item">
            <span>📞</span><span>015924164</span>
          </a>
          <a href="mailto:admin@studysync.com.np" className="tc-contact-item">
            <span>📧</span><span>admin@studysync.com.np</span>
          </a>
        </div>
      </div>
    ),
  },
];

export default function TermsPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .tc-root {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: #f7f8fa;
          min-height: 100vh;
          color: #1a1a1a;
        }

        /* TOPBAR */
        .tc-topbar {
          background: #fff; border-bottom: 1px solid #ebebeb;
          padding: 0 48px; height: 58px;
          display: flex; align-items: center; gap: 8px;
        }
        .tc-dot { width: 9px; height: 9px; border-radius: 50%; }
        .tc-brand { font-size: 0.9rem; font-weight: 700; color: #111; margin-left: 4px; }
        .tc-sep { width: 1px; height: 15px; background: #e5e5e5; margin: 0 10px; }
        .tc-page-label { font-size: 0.78rem; color: #aaa; }

        /* HERO */
        .tc-hero {
          background: #fff; border-bottom: 1px solid #ebebeb;
          padding: 52px 48px 44px;
        }
        .tc-hero-inner { max-width: 860px; margin: 0 auto; }
        .tc-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          background: #edf6fb; border: 1px solid #c5e2f5;
          border-radius: 100px; padding: 5px 14px 5px 8px; margin-bottom: 16px;
        }
        .tc-eyebrow-dot { width: 7px; height: 7px; border-radius: 50%; background: #1a90c8; }
        .tc-eyebrow-text { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #1a90c8; }
        .tc-hero h1 {
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          font-weight: 800; color: #111;
          letter-spacing: -0.025em; line-height: 1.15; margin-bottom: 10px;
        }
        .tc-hero-sub { font-size: 0.875rem; color: #999; line-height: 1.7; max-width: 520px; }
        .tc-hero-meta {
          display: flex; align-items: center; gap: 20px;
          margin-top: 20px; flex-wrap: wrap;
        }
        .tc-meta-chip {
          display: flex; align-items: center; gap: 6px;
          background: #f7f8fa; border: 1px solid #ebebeb;
          border-radius: 8px; padding: 6px 14px;
          font-size: 0.75rem; font-weight: 500; color: #777;
        }

        /* LAYOUT */
        .tc-layout {
          max-width: 860px; margin: 40px auto 80px;
          padding: 0 48px;
          display: grid;
          grid-template-columns: 1fr 220px;
          gap: 32px;
          align-items: start;
        }

        /* SECTIONS */
        .tc-sections { display: flex; flex-direction: column; gap: 0; }
        .tc-section {
          background: #fff; border: 1px solid #ebebeb;
          border-radius: 14px; margin-bottom: 14px;
          overflow: hidden; transition: box-shadow 0.2s;
        }
        .tc-section:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.07); }
        .tc-section-header {
          display: flex; align-items: center; gap: 16px;
          padding: 18px 24px; border-bottom: 1px solid #f5f5f5;
        }
        .tc-section-num {
          width: 34px; height: 34px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.82rem; font-weight: 800; flex-shrink: 0; color: #fff;
        }
        .tc-section-title { font-size: 1rem; font-weight: 700; color: #111; letter-spacing: -0.01em; }
        .tc-section-body {
          padding: 18px 24px 22px;
          font-size: 0.875rem; color: #666; line-height: 1.78;
        }
        .tc-section-body ul {
          list-style: none; padding: 0; margin: 0;
          display: flex; flex-direction: column; gap: 8px;
        }
        .tc-section-body ul li {
          display: flex; align-items: flex-start; gap: 10px;
        }
        .tc-section-body ul li::before {
          content: ''; display: inline-block;
          width: 6px; height: 6px; border-radius: 50%;
          background: #ccc; flex-shrink: 0; margin-top: 7px;
        }
        .tc-section-body p { margin: 0; }
        .tc-section-body strong { color: #333; font-weight: 600; }

        /* CONTACT */
        .tc-contact-block { display: flex; flex-direction: column; gap: 10px; }
        .tc-contact-item {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 0.875rem; color: #444;
          text-decoration: none; font-weight: 500;
          transition: color 0.15s;
        }
        .tc-contact-item:hover { color: #1a90c8; }

        /* SIDEBAR */
        .tc-sidebar-card {
          background: #fff; border: 1px solid #ebebeb;
          border-radius: 12px; padding: 20px; margin-bottom: 16px;
        }
        .tc-sidebar-label {
          font-size: 0.65rem; font-weight: 700;
          letter-spacing: 0.15em; text-transform: uppercase;
          color: #bbb; margin-bottom: 14px;
        }
        .tc-toc-item {
          display: flex; align-items: center; gap: 10px;
          padding: 7px 0; border-bottom: 1px solid #f5f5f5;
          text-decoration: none; transition: color 0.15s;
        }
        .tc-toc-item:last-child { border-bottom: none; }
        .tc-toc-num {
          width: 20px; height: 20px; border-radius: 5px;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.6rem; font-weight: 800; flex-shrink: 0; color: #fff;
        }
        .tc-toc-text { font-size: 0.75rem; color: #555; font-weight: 500; line-height: 1.3; }
        .tc-toc-item:hover .tc-toc-text { color: #111; }

        /* AGREEMENT BOX */
        .tc-agree-box {
          background: #f7f8fa; border: 1.5px solid #e8e8e8;
          border-radius: 12px; padding: 20px;
          margin-bottom: 16px; text-align: center;
        }
        .tc-agree-icon { font-size: 1.6rem; margin-bottom: 8px; }
        .tc-agree-text { font-size: 0.78rem; color: #999; line-height: 1.6; margin-bottom: 14px; }
        .tc-agree-highlight { color: #1a90c8; font-weight: 600; }

        .tc-cta-card {
          background: #111; border-radius: 12px;
          padding: 24px 20px; text-align: center; margin-bottom: 16px;
        }
        .tc-cta-title { font-size: 1rem; font-weight: 800; color: #fff; margin-bottom: 6px; }
        .tc-cta-sub { font-size: 0.75rem; color: rgba(255,255,255,0.45); line-height: 1.6; margin-bottom: 14px; }
        .tc-cta-btn {
          display: block; width: 100%;
          background: #1a90c8; color: #fff; border: none;
          border-radius: 7px; font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.78rem; font-weight: 700;
          padding: 11px 16px; cursor: pointer;
          text-decoration: none; text-align: center;
          transition: background 0.18s;
        }
        .tc-cta-btn:hover { background: #1270a8; }

        .tc-dots-row {
          display: flex; justify-content: center; gap: 8px; padding: 12px 0;
        }

        @media (max-width: 760px) {
          .tc-layout { grid-template-columns: 1fr; padding: 0 20px; }
          .tc-hero, .tc-topbar { padding-left: 20px; padding-right: 20px; }
          .tc-sidebar { display: none; }
        }
      `}</style>

      <div className="tc-root">

        {/* TOPBAR */}
        <div className="tc-topbar">
          <div className="tc-dot" style={{ background: "#e8352a" }} />
          <div className="tc-dot" style={{ background: "#e8922a" }} />
          <div className="tc-dot" style={{ background: "#1a9e5c" }} />
          <div className="tc-dot" style={{ background: "#1a90c8" }} />
          <span className="tc-brand">Study Sync</span>
          <div className="tc-sep" />
          <span className="tc-page-label">Terms & Conditions</span>
        </div>

        {/* HERO */}
        <div className="tc-hero">
          <div className="tc-hero-inner">
            <div className="tc-eyebrow">
              <div className="tc-eyebrow-dot" />
              <span className="tc-eyebrow-text">Legal</span>
            </div>
            <h1>Terms & Conditions</h1>
            <p className="tc-hero-sub">
              By using our website or services, you agree to these terms. Please read them carefully before proceeding.
            </p>
            <div className="tc-hero-meta">
              <div className="tc-meta-chip">
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>
                Last updated: April 2025
              </div>
              <div className="tc-meta-chip">
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253" /></svg>
                Governed by Nepal Law
              </div>
              <Link href="/PrivacyPolicy" style={{ fontSize: "0.78rem", color: "#e8352a", fontWeight: 600, textDecoration: "none" }}>
                View Privacy Policy →
              </Link>
            </div>
          </div>
        </div>

        {/* LAYOUT */}
        <div className="tc-layout">

          {/* SECTIONS */}
          <div className="tc-sections">
            {sections.map((sec) => (
              <div className="tc-section" key={sec.number} id={`tc-section-${sec.number}`}>
                <div className="tc-section-header">
                  <div className="tc-section-num" style={{ background: sec.color }}>
                    {sec.number}
                  </div>
                  <div className="tc-section-title">{sec.title}</div>
                </div>
                <div className="tc-section-body">{sec.content}</div>
              </div>
            ))}
          </div>

          {/* SIDEBAR */}
          <aside className="tc-sidebar">
            {/* AGREEMENT */}
            <div className="tc-agree-box">
              <div className="tc-agree-icon">📋</div>
              <p className="tc-agree-text">
                By using Study Sync services, you <span className="tc-agree-highlight">automatically agree</span> to these terms.
              </p>
            </div>

            {/* TOC */}
            <div className="tc-sidebar-card">
              <div className="tc-sidebar-label">Contents</div>
              {sections.map((sec) => (
                <a key={sec.number} href={`#tc-section-${sec.number}`} className="tc-toc-item">
                  <div className="tc-toc-num" style={{ background: sec.color }}>{sec.number}</div>
                  <span className="tc-toc-text">{sec.title}</span>
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="tc-cta-card">
              <div className="tc-cta-title">Book Free Consultation</div>
              <p className="tc-cta-sub">Start your study abroad journey with expert guidance.</p>
              <Link href="/free-consultant" className="tc-cta-btn">Book Now →</Link>
            </div>

            {/* Privacy link */}
            <div className="tc-sidebar-card">
              <div className="tc-sidebar-label">Related</div>
              <Link href="/PrivacyPolicy" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", color: "#555", fontSize: "0.8rem", fontWeight: 500, padding: "6px 0" }}>
                <svg width="14" height="14" fill="none" stroke="#e8352a" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>
                Privacy Policy
              </Link>
            </div>

            <div className="tc-dots-row">
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