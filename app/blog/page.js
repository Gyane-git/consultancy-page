
"use client";

import { useState } from "react";
import Link from "next/link";

export const blogs = [
  {
    slug: "affordable-uk-universities",
    title: "Affordable UK Universities with Tuition Fees Below £10,000",
    excerpt: "Discover top UK universities where Nepali students can study without breaking the bank — full list with courses and application tips.",
    category: "UK",
    categoryColor: "#1a90c8",
    readTime: "5 min",
    date: "April 10, 2025",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: null,
    thumbnailBg: "#1a90c8",
    thumbnailLabel: "UNIVERSITIES\nWITH TUITION FEES\nBELOW £10,000",
    tags: ["UK", "Tuition", "Affordable"],
  },
  {
    slug: "low-gpa-accepted-uk",
    title: "Is Low GPA Accepted in the UK? A Complete Guide to the Nepalese Students.",
    excerpt: "Everything you need to know about UK university GPA requirements, how to compensate for a low GPA, and alternative pathways.",
    category: "UK",
    categoryColor: "#1a90c8",
    readTime: "5 min",
    date: "April 5, 2025",
    videoUrl: "",
    thumbnail: null,
    thumbnailBg: "#2d3a6b",
    thumbnailLabel: "ACCEPTED\nIN THE UK?\nA COMPLETE GUIDE",
    tags: ["UK", "GPA", "Admission"],
  },
  {
    slug: "study-abroad-without-ielts",
    title: "Can You Study Abroad Without IELTS or PTE? A Complete Guide to English Language Requirements",
    excerpt: "Learn which universities accept students without IELTS/PTE, alternative ways to prove English proficiency, and country-specific requirements.",
    category: "General",
    categoryColor: "#e8352a",
    readTime: "5 min",
    date: "March 28, 2025",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: null,
    thumbnailBg: "#f5f0e8",
    thumbnailLabel: "CAN YOU STUDY\nABROAD WITHOUT\nIELTS OR PTE?",
    tags: ["IELTS", "PTE", "English"],
  },
  {
    slug: "psw-work-opportunities-uk",
    title: "Post Study Work (PSW) Opportunities in the UK: Introduction & Popular Courses",
    excerpt: "Understand the UK Graduate Route visa, popular courses for PSW, and how to maximize your chances of staying and working after graduation.",
    category: "UK",
    categoryColor: "#1a90c8",
    readTime: "5 min",
    date: "March 20, 2025",
    videoUrl: "",
    thumbnail: null,
    thumbnailBg: "#1e3a5f",
    thumbnailLabel: "WORK (PSW)\nOPPORTUNITIES\nINTRODUCTION",
    tags: ["PSW", "Work", "UK Visa"],
  },
  {
    slug: "student-life-australia",
    title: "Student Life in Australia: What Nepali Students Should Know",
    excerpt: "From accommodation to part-time work, cultural experiences, and making the most of your time studying Down Under.",
    category: "Australia",
    categoryColor: "#1a9e5c",
    readTime: "5 min",
    date: "March 15, 2025",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: null,
    thumbnailBg: "#1a9e5c",
    thumbnailLabel: "STUDENT LIFE\nIN AUSTRALIA",
    tags: ["Australia", "Student Life"],
  },
  {
    slug: "canada-study-permit-guide",
    title: "Canada Study Permit: Complete Application Guide for 2025",
    excerpt: "Step-by-step guide to applying for a Canadian study permit, required documents, processing times, and common reasons for rejection.",
    category: "Canada",
    categoryColor: "#e8922a",
    readTime: "5 min",
    date: "March 8, 2025",
    videoUrl: "",
    thumbnail: null,
    thumbnailBg: "#e8922a",
    thumbnailLabel: "CANADA\nSTUDY PERMIT\nGUIDE 2025",
    tags: ["Canada", "Visa", "Study Permit"],
  },
];

const categories = ["All", "UK", "Australia", "Canada", "General"];

function ThumbnailCard({ blog }) {
  return (
    <div style={{
      width: "100%", aspectRatio: "16/9",
      background: blog.thumbnailBg,
      display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "rgba(0,0,0,0.25)",
      }} />
      <div style={{
        position: "relative", zIndex: 1,
        color: "#fff", textAlign: "center",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontWeight: 800, fontSize: "1.1rem",
        lineHeight: 1.3, padding: "0 20px",
        textTransform: "uppercase", letterSpacing: "0.02em",
        whiteSpace: "pre-line",
      }}>
        {blog.thumbnailLabel}
      </div>
      <div style={{
        position: "absolute", top: 12, right: 12,
        background: "rgba(255,255,255,0.95)",
        borderRadius: "100px", padding: "4px 12px",
        fontSize: "0.72rem", fontWeight: 700,
        color: "#333", zIndex: 2,
      }}>
        {blog.readTime}
      </div>
    </div>
  );
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = blogs.filter((b) => {
    const matchCat = activeCategory === "All" || b.category === activeCategory;
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f7f8fa; }
        .bl-root { font-family: 'Plus Jakarta Sans', sans-serif; background: #f7f8fa; min-height: 100vh; }

        .bl-hero {
          background: #fff; border-bottom: 1px solid #ebebeb;
          padding: 56px 48px 48px;
        }
        .bl-hero-inner { max-width: 1080px; margin: 0 auto; }
        .bl-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          background: #fff0ef; border: 1px solid #fad4d1;
          border-radius: 100px; padding: 5px 14px 5px 8px; margin-bottom: 16px;
        }
        .bl-eyebrow-dot { width: 8px; height: 8px; border-radius: 50%; background: #e8352a; }
        .bl-eyebrow-text { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #e8352a; }
        .bl-hero h1 {
          font-family: 'Fraunces', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700; color: #111;
          letter-spacing: -0.025em; line-height: 1.15; margin-bottom: 12px;
        }
        .bl-hero-sub { font-size: 0.9rem; color: #999; max-width: 480px; line-height: 1.7; }

        /* SEARCH + FILTER */
        .bl-controls {
          max-width: 1080px; margin: 32px auto 0;
          display: flex; gap: 16px; align-items: center; flex-wrap: wrap;
        }
        .bl-search {
          flex: 1; min-width: 220px;
          background: #f7f8fa; border: 1.5px solid #e8e8e8;
          border-radius: 8px; padding: 11px 16px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.875rem; color: #1a1a1a; outline: none;
          transition: border-color 0.2s;
        }
        .bl-search:focus { border-color: #1a90c8; background: #fff; }
        .bl-search::placeholder { color: #ccc; }
        .bl-cats { display: flex; gap: 8px; flex-wrap: wrap; }
        .bl-cat {
          padding: 8px 18px; border-radius: 100px;
          border: 1.5px solid #e8e8e8; background: #fff;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.78rem; font-weight: 600; color: #888;
          cursor: pointer; transition: all 0.15s;
        }
        .bl-cat:hover { border-color: #ccc; color: #333; }
        .bl-cat.active { background: #111; border-color: #111; color: #fff; }

        /* GRID */
        .bl-main { max-width: 1080px; margin: 40px auto; padding: 0 48px 80px; }
        .bl-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        /* CARD */
        .bl-card {
          background: #fff; border: 1px solid #ebebeb;
          border-radius: 14px; overflow: hidden;
          transition: box-shadow 0.22s, transform 0.22s;
          display: flex; flex-direction: column;
          text-decoration: none; color: inherit;
        }
        .bl-card:hover { box-shadow: 0 10px 36px rgba(0,0,0,0.1); transform: translateY(-4px); }
        .bl-card-thumb { display: block; width: 100%; overflow: hidden; }
        .bl-card-body { padding: 22px 22px 24px; flex: 1; display: flex; flex-direction: column; }
        .bl-card-meta {
          display: flex; align-items: center; gap: 10px; margin-bottom: 12px;
        }
        .bl-card-cat {
          font-size: 0.65rem; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 3px 10px; border-radius: 4px;
        }
        .bl-card-date { font-size: 0.72rem; color: #bbb; font-weight: 400; }
        .bl-card-title {
          font-family: 'Fraunces', serif;
          font-size: 1.05rem; font-weight: 700;
          color: #111; line-height: 1.35;
          margin-bottom: 10px;
          transition: color 0.15s;
        }
        .bl-card:hover .bl-card-title { color: #1a90c8; }
        .bl-card-excerpt {
          font-size: 0.8rem; color: #999;
          line-height: 1.7; flex: 1;
        }
        .bl-card-footer {
          display: flex; align-items: center;
          justify-content: space-between;
          margin-top: 18px; padding-top: 14px;
          border-top: 1px solid #f5f5f5;
        }
        .bl-card-tags { display: flex; gap: 6px; flex-wrap: wrap; }
        .bl-card-tag {
          font-size: 0.65rem; font-weight: 600;
          color: #bbb; background: #f7f8fa;
          padding: 3px 8px; border-radius: 4px;
        }
        .bl-card-read {
          font-size: 0.72rem; font-weight: 600;
          color: #1a90c8; white-space: nowrap;
          display: flex; align-items: center; gap: 4px;
        }
        .bl-has-video {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: 0.65rem; font-weight: 600;
          color: #e8352a; background: #fff0ef;
          padding: 2px 8px; border-radius: 4px; margin-left: 4px;
        }

        /* EMPTY */
        .bl-empty {
          grid-column: 1/-1; text-align: center;
          padding: 80px 0; color: #bbb;
          font-size: 0.9rem;
        }

        @media (max-width: 900px) {
          .bl-grid { grid-template-columns: repeat(2, 1fr); }
          .bl-hero, .bl-main { padding-left: 20px; padding-right: 20px; }
        }
        @media (max-width: 600px) {
          .bl-grid { grid-template-columns: 1fr; }
          .bl-controls { flex-direction: column; align-items: stretch; }
        }
      `}</style>

      <div className="bl-root">
        <div className="bl-hero">
          <div className="bl-hero-inner">
            <div className="bl-eyebrow">
              <div className="bl-eyebrow-dot" />
              <span className="bl-eyebrow-text">Blog & Resources</span>
            </div>
            <h1>Study Abroad Guides<br />& Insights</h1>
            <p className="bl-hero-sub">Expert articles, visa guides, and country-specific resources to help Nepali students make informed decisions.</p>

            <div className="bl-controls">
              <input
                className="bl-search"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="bl-cats">
                {categories.map((c) => (
                  <button key={c} className={`bl-cat${activeCategory === c ? " active" : ""}`} onClick={() => setActiveCategory(c)}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bl-main">
          <div className="bl-grid">
            {filtered.length === 0 ? (
              <div className="bl-empty">No articles found. Try a different search or category.</div>
            ) : filtered.map((blog) => (
              <Link href={`/blog/${blog.slug}`} key={blog.slug} className="bl-card">
                <span className="bl-card-thumb">
                  <ThumbnailCard blog={blog} />
                </span>
                <div className="bl-card-body">
                  <div className="bl-card-meta">
                    <span className="bl-card-cat" style={{ background: blog.categoryColor + "15", color: blog.categoryColor }}>
                      {blog.category}
                    </span>
                    <span className="bl-card-date">{blog.date}</span>
                    {blog.videoUrl && <span className="bl-has-video">▶ Video</span>}
                  </div>
                  <div className="bl-card-title">{blog.title}</div>
                  <p className="bl-card-excerpt">{blog.excerpt}</p>
                  <div className="bl-card-footer">
                    <div className="bl-card-tags">
                      {blog.tags.slice(0, 2).map((t) => (
                        <span key={t} className="bl-card-tag">{t}</span>
                      ))}
                    </div>
                    <span className="bl-card-read">Read {blog.readTime} →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}