"use client";

import { useState } from "react";

const diplomaScope = [
  "eLearning Manager",
  "Software Manager",
  "eBusiness Project Manager",
  "ICT Project Manager",
  "IT Business Manager",
  "IT Manager",
  "IT Procurement Manager",
  "IT Program Manager",
  "Quality Assurance Manager – IT projects",
];

const universitiesIELTS = [
  { name: "University of Melbourne", score: "7.0" },
  { name: "University of Sydney", score: "6.5" },
  { name: "University of Adelaide", score: "5.5" },
];

const whyReasons = [
  {
    icon: "📈",
    title: "Largest Recruiter",
    desc: "IT Industry in Australia is predicted to be the largest recruiter in terms of vacancy and industry growth.",
  },
  {
    icon: "💰",
    title: "Higher Salary Potential",
    desc: "IT has a potential for higher salary and revenue for graduates in Australia and around the world due to its global standard certification.",
  },
  {
    icon: "🎯",
    title: "Choose Your Path",
    desc: "You can choose your own career path according to your interests and career aspirations, specializing in a subfield.",
  },
  {
    icon: "🤝",
    title: "Learn While Working",
    desc: "Work integrated learning provides a skill set that can be used directly in the work environment.",
  },
  {
    icon: "👥",
    title: "415,100 Employed",
    desc: "In 2017, 415,100 people were reported to be employed in an IT-related position in Australia.",
  },
  {
    icon: "🚀",
    title: "151,200 New Jobs",
    desc: "Between now and 2022, 151,200 new IT-related jobs are predicted to be created for IT graduates.",
  },
];

export default function StudyITAustralia() {
  const [activeTab, setActiveTab] = useState("diploma");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Source+Sans+3:wght@300;400;600&display=swap');

        :root {
          --cream: #faf7f2;
          --ink: #1a1410;
          --rust: #c0392b;
          --rust-light: #e8574a;
          --gold: #b8860b;
          --warm-gray: #8a7f74;
          --border: #ddd5c8;
          --card-bg: #fff;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'Source Sans 3', sans-serif;
          background: var(--cream);
          color: var(--ink);
          line-height: 1.7;
        }

        .page-wrapper {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 24px 80px;
        }

        /* HERO */
        .hero {
          background: var(--ink);
          color: var(--cream);
          padding: 64px 48px 56px;
          margin-bottom: 64px;
          position: relative;
          overflow: hidden;
        }
        .hero::before {
          content: '';
          position: absolute;
          top: -60px; right: -60px;
          width: 280px; height: 280px;
          border: 2px solid rgba(192,57,43,0.4);
          border-radius: 50%;
          pointer-events: none;
        }
        .hero::after {
          content: '';
          position: absolute;
          bottom: -40px; left: 40px;
          width: 160px; height: 160px;
          border: 1px solid rgba(184,134,11,0.3);
          border-radius: 50%;
          pointer-events: none;
        }
        .breadcrumb {
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--warm-gray);
          margin-bottom: 20px;
          font-family: 'Source Sans 3', sans-serif;
          font-weight: 600;
        }
        .breadcrumb span { color: var(--rust-light); }
        .hero h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-weight: 900;
          line-height: 1.15;
          max-width: 580px;
        }
        .hero-accent {
          display: inline-block;
          width: 48px;
          height: 3px;
          background: var(--rust);
          margin-top: 24px;
        }

        /* SECTION HEADINGS */
        .section {
          margin-bottom: 56px;
        }
        .section-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 700;
          color: var(--ink);
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 2px solid var(--border);
          position: relative;
        }
        .section-heading::after {
          content: '';
          position: absolute;
          left: 0; bottom: -2px;
          width: 48px; height: 2px;
          background: var(--rust);
        }
        .sub-heading {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--rust);
          margin: 28px 0 10px;
        }
        p {
          color: #3d3530;
          font-size: 0.97rem;
          margin-bottom: 10px;
          font-weight: 300;
        }

        /* WHY GRID */
        .why-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 20px;
          margin-top: 24px;
        }
        .why-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          padding: 24px 20px;
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .why-card:hover {
          box-shadow: 0 8px 24px rgba(26,20,16,0.09);
          transform: translateY(-2px);
        }
        .why-icon {
          font-size: 1.6rem;
          margin-bottom: 10px;
        }
        .why-title {
          font-family: 'Playfair Display', serif;
          font-size: 1rem;
          font-weight: 700;
          color: var(--ink);
          margin-bottom: 6px;
        }
        .why-desc {
          font-size: 0.875rem;
          color: var(--warm-gray);
          line-height: 1.6;
          margin: 0;
        }

        /* IELTS TABLE */
        .ielts-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 16px;
          font-size: 0.9rem;
        }
        .ielts-table th {
          background: var(--ink);
          color: var(--cream);
          text-align: left;
          padding: 12px 16px;
          font-family: 'Source Sans 3', sans-serif;
          font-weight: 600;
          font-size: 0.8rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .ielts-table td {
          padding: 12px 16px;
          border-bottom: 1px solid var(--border);
          color: #3d3530;
        }
        .ielts-table tr:last-child td { border-bottom: none; }
        .ielts-table tr:nth-child(even) td { background: #f5f0ea; }
        .score-badge {
          display: inline-block;
          background: var(--rust);
          color: white;
          font-weight: 700;
          padding: 2px 10px;
          font-size: 0.85rem;
          border-radius: 2px;
        }
        .note-box {
          background: #f5f0ea;
          border-left: 3px solid var(--rust);
          padding: 14px 18px;
          margin: 16px 0;
          font-size: 0.88rem;
          color: var(--warm-gray);
        }

        /* TABS */
        .tabs {
          display: flex;
          gap: 0;
          border-bottom: 2px solid var(--border);
          margin-bottom: 32px;
        }
        .tab-btn {
          background: none;
          border: none;
          padding: 12px 28px;
          font-family: 'Source Sans 3', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          cursor: pointer;
          color: var(--warm-gray);
          border-bottom: 2px solid transparent;
          margin-bottom: -2px;
          transition: color 0.2s, border-color 0.2s;
        }
        .tab-btn.active {
          color: var(--rust);
          border-bottom-color: var(--rust);
        }
        .tab-btn:hover:not(.active) {
          color: var(--ink);
        }

        /* COURSE DETAIL CARDS */
        .detail-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 16px;
          margin: 24px 0;
        }
        .detail-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          padding: 20px 18px;
        }
        .detail-label {
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--warm-gray);
          font-weight: 600;
          margin-bottom: 6px;
        }
        .detail-value {
          font-family: 'Playfair Display', serif;
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--ink);
        }
        .detail-value.highlight { color: var(--rust); }

        /* SCOPE LIST */
        .scope-list {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 16px;
        }
        .scope-tag {
          background: var(--ink);
          color: var(--cream);
          padding: 6px 14px;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.03em;
          transition: background 0.2s;
        }
        .scope-tag:hover { background: var(--rust); }

        /* LINK STYLE */
        a {
          color: var(--rust);
          text-decoration: none;
          font-weight: 600;
          border-bottom: 1px solid transparent;
          transition: border-color 0.2s;
        }
        a:hover { border-bottom-color: var(--rust); }

        /* SOURCE */
        .source-note {
          font-size: 0.8rem;
          color: var(--warm-gray);
          margin-top: 12px;
        }

        @media (max-width: 600px) {
          .hero { padding: 40px 24px 36px; }
          .tabs { overflow-x: auto; }
          .tab-btn { padding: 10px 16px; font-size: 0.78rem; }
        }
      `}</style>

      <div className="hero">
        <div className="page-wrapper" style={{ padding: "0 24px" }}>
          <p className="breadcrumb">
            Home › <span>Study Information Technology (IT) in Australia</span>
          </p>
          <h1>Study Information Technology (IT) in Australia</h1>
          <div className="hero-accent" />
        </div>
      </div>

      <div className="page-wrapper">

        {/* INTRO */}
        <section className="section">
          <h2 className="section-heading">Study Information Technology (IT) in Australia</h2>
          <p>Information Technology is a field of study that includes computers and other electronic devices for communication and other purposes.</p>
          <p>With the growing use of technology like cell phones, smart watches, laptops, gaming consoles, etc., IT is an industry that recruits more personnel than any other industry*.</p>
          <p>A lot of Nepali students go abroad (specifically in Australia) to study Information Technology.</p>
          <p>Even in a developing country like Nepal, IT has boomed and hence created a large number of vacancies for IT graduates.</p>
        </section>

        {/* WHY */}
        <section className="section">
          <h2 className="section-heading">Why study Information Technology in Australia?</h2>
          <p>The following are some reasons why studying Information Technology can be a good idea or why pursue a career in information technology:</p>
          <div className="why-grid">
            {whyReasons.map((r, i) => (
              <div className="why-card" key={i}>
                <div className="why-icon">{r.icon}</div>
                <div className="why-title">{r.title}</div>
                <p className="why-desc">{r.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ENTRY REQUIREMENTS */}
        <section className="section">
          <h2 className="section-heading">Entry Requirements to Study IT in Australia</h2>

          <h3 className="sub-heading">How much IELTS score is required to study IT in Australia?</h3>
          <div className="note-box">
            Generally, the IELTS score required is an overall score of <strong>6.0 or more</strong> (no band less than 5.5). The IELTS score obviously varies per institution.
          </div>

          <table className="ielts-table">
            <thead>
              <tr>
                <th>University</th>
                <th>IELTS Score Required</th>
              </tr>
            </thead>
            <tbody>
              {universitiesIELTS.map((u, i) => (
                <tr key={i}>
                  <td>{u.name}</td>
                  <td><span className="score-badge">{u.score}</span></td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="source-note">
            Source: <a href="https://www.ieltsasia.org" target="_blank" rel="noreferrer">IELTSASIA</a>
            {" · "}
            If you want to know more about IELTS, <a href="#">here</a>'s an ultimate guide to IELTS.
          </p>
        </section>

        {/* TABS: DIPLOMA / UG */}
        <section className="section">
          <h2 className="section-heading">Course Options</h2>
          <div className="tabs">
            <button
              className={`tab-btn ${activeTab === "diploma" ? "active" : ""}`}
              onClick={() => setActiveTab("diploma")}
            >
              Diploma / Advanced Diploma
            </button>
            <button
              className={`tab-btn ${activeTab === "ug" ? "active" : ""}`}
              onClick={() => setActiveTab("ug")}
            >
              Undergraduate Study
            </button>
          </div>

          {activeTab === "diploma" && (
            <div>
              <h3 className="sub-heading">Course Description</h3>
              <p>An advanced diploma is a certification that a student has successfully completed a specific course.</p>
              <p>Diploma requires less time to complete (52 weeks) and is a cheaper alternative to get polish your skills.</p>

              <div className="detail-grid">
                <div className="detail-card">
                  <div className="detail-label">Entry Requirement</div>
                  <div className="detail-value">Year 12 or Equivalent</div>
                </div>
                <div className="detail-card">
                  <div className="detail-label">Course Duration</div>
                  <div className="detail-value highlight">52 Weeks</div>
                </div>
                <div className="detail-card">
                  <div className="detail-label">Avg. Salary</div>
                  <div className="detail-value highlight">US$40k / yr</div>
                </div>
              </div>

              <h3 className="sub-heading">Scope of Diploma / Advanced Diploma in IT in Australia</h3>
              <div className="scope-list">
                {diplomaScope.map((role, i) => (
                  <span className="scope-tag" key={i}>{role}</span>
                ))}
              </div>
            </div>
          )}

          {activeTab === "ug" && (
            <div>
              <h3 className="sub-heading">Course Description</h3>
              <p>An undergraduate degree in Information Technology in Australia is a comprehensive program that covers the full breadth of computing and digital technology.</p>
              <p>It is a globally recognized qualification that opens doors to professional careers worldwide.</p>

              <div className="detail-grid">
                <div className="detail-card">
                  <div className="detail-label">Entry Requirement</div>
                  <div className="detail-value">Year 12 or Equivalent</div>
                </div>
                <div className="detail-card">
                  <div className="detail-label">Course Duration</div>
                  <div className="detail-value highlight">3 Years</div>
                </div>
                <div className="detail-card">
                  <div className="detail-label">IELTS Required</div>
                  <div className="detail-value highlight">6.0+</div>
                </div>
              </div>
            </div>
          )}
        </section>

      </div>
    </>
  );
}