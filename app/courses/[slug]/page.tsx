"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

type DetailItem = { label: string; value: string };
type IeltsItem = { name: string; score: string };
type Course = {
  heroTitle: string;
  name: string;
  introText: string;
  whyTitle: string;
  whyDescription: string;
  whyPoints: string[];
  ieltsNote: string;
  ieltsRows: IeltsItem[];
  tabOneTitle: string;
  tabOneDescription: string;
  tabOneDetails: DetailItem[];
  tabOneScope: string[];
  tabTwoTitle: string;
  tabTwoDescription: string;
  tabTwoDetails: DetailItem[];
};

export default function DynamicCoursePage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug || "";
  const [activeTab, setActiveTab] = useState("diploma");
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    let ignore = false;
    async function loadCourse() {
      try {
        const res = await fetch(`/api/popular-courses?slug=${encodeURIComponent(slug)}`, { cache: "no-store" });
        const data = await res.json();
        if (!ignore && data?.success) {
          setCourse(data.course || null);
        }
      } catch (error) {
        console.error("Failed to load course", error);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    loadCourse();
    return () => {
      ignore = true;
    };
  }, [slug]);

  const displayTitle = useMemo(() => {
    if (course?.heroTitle) return course.heroTitle;
    return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  }, [course, slug]);

  if (loading) return <main className="max-w-4xl mx-auto py-16 px-4 text-gray-600">Loading course...</main>;
  if (!course) return <main className="max-w-4xl mx-auto py-16 px-4 text-gray-600">Course not found.</main>;

  const introLines = String(course.introText || "").split("\n").map((x) => x.trim()).filter(Boolean);
  const diplomaDetails = Array.isArray(course.tabOneDetails) ? course.tabOneDetails : [];
  const ugDetails = Array.isArray(course.tabTwoDetails) ? course.tabTwoDetails : [];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Source+Sans+3:wght@300;400;600&display=swap');
        :root {
          --cream: #faf7f2; --ink: #1a1410; --rust: #c0392b; --rust-light: #e8574a;
          --gold: #b8860b; --warm-gray: #8a7f74; --border: #ddd5c8; --card-bg: #fff;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Source Sans 3', sans-serif; background: var(--cream); color: var(--ink); line-height: 1.7; }
        .page-wrapper { max-width: 900px; margin: 0 auto; padding: 0 24px 80px; }
        .hero { background: var(--ink); color: var(--cream); padding: 64px 48px 56px; margin-bottom: 64px; position: relative; overflow: hidden; }
        .hero::before { content:''; position:absolute; top:-60px; right:-60px; width:280px; height:280px; border:2px solid rgba(192,57,43,0.4); border-radius:50%; pointer-events:none; }
        .hero::after { content:''; position:absolute; bottom:-40px; left:40px; width:160px; height:160px; border:1px solid rgba(184,134,11,0.3); border-radius:50%; pointer-events:none; }
        .breadcrumb { font-size:11px; letter-spacing:0.12em; text-transform:uppercase; color:var(--warm-gray); margin-bottom:20px; font-weight:600; }
        .breadcrumb span { color: var(--rust-light); }
        .hero h1 { font-family:'Playfair Display', serif; font-size:clamp(2rem, 5vw, 3.2rem); font-weight:900; line-height:1.15; max-width:580px; }
        .hero-accent { display:inline-block; width:48px; height:3px; background:var(--rust); margin-top:24px; }
        .section { margin-bottom: 56px; }
        .section-heading { font-family:'Playfair Display', serif; font-size:clamp(1.5rem, 3vw, 2rem); font-weight:700; color:var(--ink); margin-bottom:20px; padding-bottom:12px; border-bottom:2px solid var(--border); position:relative; }
        .section-heading::after { content:''; position:absolute; left:0; bottom:-2px; width:48px; height:2px; background:var(--rust); }
        .sub-heading { font-family:'Playfair Display', serif; font-size:1.1rem; font-weight:700; color:var(--rust); margin:28px 0 10px; }
        p { color:#3d3530; font-size:0.97rem; margin-bottom:10px; font-weight:300; }
        .why-grid { display:grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap:20px; margin-top:24px; }
        .why-card { background:var(--card-bg); border:1px solid var(--border); padding:24px 20px; transition:box-shadow 0.2s, transform 0.2s; }
        .why-card:hover { box-shadow:0 8px 24px rgba(26,20,16,0.09); transform:translateY(-2px); }
        .why-icon { font-size:1.6rem; margin-bottom:10px; }
        .why-title { font-family:'Playfair Display', serif; font-size:1rem; font-weight:700; color:var(--ink); margin-bottom:6px; }
        .why-desc { font-size:0.875rem; color:var(--warm-gray); line-height:1.6; margin:0; }
        .ielts-table { width:100%; border-collapse:collapse; margin-top:16px; font-size:0.9rem; }
        .ielts-table th { background:var(--ink); color:var(--cream); text-align:left; padding:12px 16px; font-weight:600; font-size:0.8rem; letter-spacing:0.08em; text-transform:uppercase; }
        .ielts-table td { padding:12px 16px; border-bottom:1px solid var(--border); color:#3d3530; }
        .ielts-table tr:last-child td { border-bottom:none; }
        .ielts-table tr:nth-child(even) td { background:#f5f0ea; }
        .score-badge { display:inline-block; background:var(--rust); color:white; font-weight:700; padding:2px 10px; font-size:0.85rem; border-radius:2px; }
        .note-box { background:#f5f0ea; border-left:3px solid var(--rust); padding:14px 18px; margin:16px 0; font-size:0.88rem; color:var(--warm-gray); }
        .tabs { display:flex; gap:0; border-bottom:2px solid var(--border); margin-bottom:32px; }
        .tab-btn { background:none; border:none; padding:12px 28px; font-size:0.9rem; font-weight:600; letter-spacing:0.05em; text-transform:uppercase; cursor:pointer; color:var(--warm-gray); border-bottom:2px solid transparent; margin-bottom:-2px; transition:color 0.2s, border-color 0.2s; }
        .tab-btn.active { color:var(--rust); border-bottom-color:var(--rust); }
        .tab-btn:hover:not(.active) { color:var(--ink); }
        .detail-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(200px, 1fr)); gap:16px; margin:24px 0; }
        .detail-card { background:var(--card-bg); border:1px solid var(--border); padding:20px 18px; }
        .detail-label { font-size:0.72rem; letter-spacing:0.12em; text-transform:uppercase; color:var(--warm-gray); font-weight:600; margin-bottom:6px; }
        .detail-value { font-family:'Playfair Display', serif; font-size:1.2rem; font-weight:700; color:var(--ink); }
        .detail-value.highlight { color:var(--rust); }
        .scope-list { display:flex; flex-wrap:wrap; gap:10px; margin-top:16px; }
        .scope-tag { background:var(--ink); color:var(--cream); padding:6px 14px; font-size:0.8rem; font-weight:600; letter-spacing:0.03em; transition:background 0.2s; }
        .scope-tag:hover { background:var(--rust); }
        a { color:var(--rust); text-decoration:none; font-weight:600; border-bottom:1px solid transparent; transition:border-color 0.2s; }
        a:hover { border-bottom-color:var(--rust); }
        .source-note { font-size:0.8rem; color:var(--warm-gray); margin-top:12px; }
        @media (max-width: 600px) {
          .hero { padding: 40px 24px 36px; }
          .tabs { overflow-x: auto; }
          .tab-btn { padding: 10px 16px; font-size: 0.78rem; }
        }
      `}</style>

      <div className="hero">
        <div className="page-wrapper" style={{ padding: "0 24px" }}>
          <p className="breadcrumb">Home › <span>{displayTitle}</span></p>
          <h1>{displayTitle}</h1>
          <div className="hero-accent" />
        </div>
      </div>

      <div className="page-wrapper">
        <section className="section">
          <h2 className="section-heading">{course.name || displayTitle}</h2>
          {introLines.map((line, i) => <p key={`${line}-${i}`}>{line}</p>)}
        </section>

        <section className="section">
          <h2 className="section-heading">{course.whyTitle}</h2>
          {course.whyDescription ? <p>{course.whyDescription}</p> : null}
          <div className="why-grid">
            {course.whyPoints.map((r, i) => (
              <div className="why-card" key={`${r}-${i}`}>
                <div className="why-icon">📌</div>
                <div className="why-title">Reason {i + 1}</div>
                <p className="why-desc">{r}</p>
              </div>
            ))}
          </div>
        </section>

        {course.ieltsRows.length ? (
          <section className="section">
            <h2 className="section-heading">Entry Requirements</h2>
            <h3 className="sub-heading">Language Requirement Snapshot</h3>
            {course.ieltsNote ? <div className="note-box">{course.ieltsNote}</div> : null}
            <table className="ielts-table">
              <thead>
                <tr>
                  <th>University</th>
                  <th>Required Score</th>
                </tr>
              </thead>
              <tbody>
                {course.ieltsRows.map((u, i) => (
                  <tr key={`${u.name}-${i}`}>
                    <td>{u.name}</td>
                    <td><span className="score-badge">{u.score}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ) : null}

        <section className="section">
          <h2 className="section-heading">Course Options</h2>
          <div className="tabs">
            <button className={`tab-btn ${activeTab === "diploma" ? "active" : ""}`} onClick={() => setActiveTab("diploma")}>
              {course.tabOneTitle || "Diploma / Advanced Diploma"}
            </button>
            <button className={`tab-btn ${activeTab === "ug" ? "active" : ""}`} onClick={() => setActiveTab("ug")}>
              {course.tabTwoTitle || "Undergraduate Study"}
            </button>
          </div>

          {activeTab === "diploma" ? (
            <div>
              <h3 className="sub-heading">Course Description</h3>
              {String(course.tabOneDescription || "").split("\n").map((line, i) => line.trim() ? <p key={`${line}-${i}`}>{line}</p> : null)}
              <div className="detail-grid">
                {diplomaDetails.map((item, i) => (
                  <div className="detail-card" key={`${item.label}-${i}`}>
                    <div className="detail-label">{item.label}</div>
                    <div className="detail-value highlight">{item.value}</div>
                  </div>
                ))}
              </div>
              {course.tabOneScope.length ? (
                <>
                  <h3 className="sub-heading">Career Scope</h3>
                  <div className="scope-list">
                    {course.tabOneScope.map((role, i) => <span className="scope-tag" key={`${role}-${i}`}>{role}</span>)}
                  </div>
                </>
              ) : null}
            </div>
          ) : (
            <div>
              <h3 className="sub-heading">Course Description</h3>
              {String(course.tabTwoDescription || "").split("\n").map((line, i) => line.trim() ? <p key={`${line}-${i}`}>{line}</p> : null)}
              <div className="detail-grid">
                {ugDetails.map((item, i) => (
                  <div className="detail-card" key={`${item.label}-${i}`}>
                    <div className="detail-label">{item.label}</div>
                    <div className="detail-value highlight">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
