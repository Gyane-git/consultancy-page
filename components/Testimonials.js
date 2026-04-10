"use client";
import { useState, useRef, useEffect } from "react";

const videoTestimonials = [
  {
    id: 1,
    name: "Dipesh's Father",
    role: "Parents Testimonial",
    caption: "Watch what Dipesh's father has to say",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    videoUrl: "#",
    tag: "Parent",
  },
  {
    id: 2,
    name: "Dipesh Rijal",
    role: "Student",
    caption: "Watch what Dipesh Rijal has to say",
    thumbnail: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=500&fit=crop",
    videoUrl: "#",
    tag: "Student",
  },
  {
    id: 3,
    name: "Prasis Kandel",
    role: "Student",
    caption: "Watch what Prasis Kandel has to say",
    thumbnail: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop",
    videoUrl: "#",
    tag: "Student",
  },
  {
    id: 4,
    name: "Sita Sharma",
    role: "Parent",
    caption: "Watch what Sita Sharma has to say",
    thumbnail: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
    videoUrl: "#",
    tag: "Parent",
  },
];

const reviewTestimonials = [
  {
    id: 1,
    name: "Manisha Majhi",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop",
    rating: 4,
    review:
      "The teaching approach here completely transformed how my daughter approaches her studies. Her confidence has soared and she's genuinely excited about learning every single day.",
    course: "Science & Math",
    date: "March 2025",
  },
  {
    id: 2,
    name: "Kanchan Surkheti",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
    rating: 5,
    review:
      "I cracked my entrance exam on the first attempt after joining. The mentors here don't just teach — they invest in your success like it's their own.",
    course: "Medical Entrance",
    date: "February 2025",
  },
  {
    id: 3,
    name: "Bikesh Tamang",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&h=80&fit=crop",
    rating: 4,
    review:
      "Outstanding faculty who genuinely care. The study environment is world-class and the peer community keeps you constantly motivated to push further.",
    course: "Engineering Prep",
    date: "January 2025",
  },
  {
    id: 4,
    name: "Priya Shrestha",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop",
    rating: 5,
    review:
      "Best decision I made for my academic career. The structured curriculum and personalized attention helped me score way beyond what I thought was possible.",
    course: "Commerce Stream",
    date: "April 2025",
  },
  {
    id: 5,
    name: "Rajan Karki",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop",
    rating: 5,
    review:
      "The online resources combined with live classes create a perfect learning ecosystem. I could study at my own pace without missing out on guidance.",
    course: "Science Stream",
    date: "March 2025",
  },
  {
    id: 6,
    name: "Aarti Bhandari",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop",
    rating: 4,
    review:
      "My son improved dramatically in mathematics within three months. The teachers identify weak spots early and work on them with incredible patience.",
    course: "Parent Review",
    date: "February 2025",
  },
];

function StarRating({ rating, max = 5 }) {
  return (
    <div className="star-row">
      {Array.from({ length: max }).map((_, i) => (
        <svg
          key={i}
          className={`star ${i < rating ? "filled" : "empty"}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function VideoCard({ testimonial, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="video-card"
      style={{ animationDelay: `${index * 120}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="video-thumb-wrap">
        <img src={testimonial.thumbnail} alt={testimonial.name} className="video-thumb" />
        <div className={`video-overlay ${hovered ? "hovered" : ""}`} />
        <button className={`play-btn ${hovered ? "hovered" : ""}`} aria-label="Play video">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
        <span className="video-tag">{testimonial.tag}</span>
      </div>
      <div className="video-info">
        <p className="video-caption">{testimonial.caption}</p>
        <p className="video-name">{testimonial.name}</p>
      </div>
    </div>
  );
}

function ReviewCard({ review, index }) {
  return (
    <div className="review-card" style={{ animationDelay: `${index * 100}ms` }}>
      <div className="review-top">
        <img src={review.avatar} alt={review.name} className="review-avatar" />
        <div>
          <p className="review-name">{review.name}</p>
          <p className="review-course">{review.course}</p>
          <StarRating rating={review.rating} />
        </div>
        <span className="review-date">{review.date}</span>
      </div>
      <p className="review-text">"{review.review}"</p>
      <div className="review-footer">
        <span className="verified-badge">✓ Verified Student</span>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [reviewPage, setReviewPage] = useState(0);
  const reviewsPerPage = 3;
  const filters = ["All", "Student", "Parent"];

  const filteredVideos =
    activeFilter === "All"
      ? videoTestimonials
      : videoTestimonials.filter((v) => v.tag === activeFilter);

  const totalReviewPages = Math.ceil(reviewTestimonials.length / reviewsPerPage);
  const visibleReviews = reviewTestimonials.slice(
    reviewPage * reviewsPerPage,
    reviewPage * reviewsPerPage + reviewsPerPage
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        :root {
          --ink: #0f0c1d;
          --cream: #faf8f3;
          --gold: #d4a853;
          --gold-light: #f0d48a;
          --violet: #5c3bbd;
          --violet-soft: #e8e2ff;
          --rose: #e8705a;
          --rose-soft: #fce8e4;
          --card-bg: #ffffff;
          --border: rgba(92,59,189,0.12);
          --shadow: 0 8px 40px rgba(15,12,29,0.10);
          --shadow-hover: 0 20px 60px rgba(15,12,29,0.18);
          --radius: 20px;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .tpage {
          background: var(--cream);
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
          color: var(--ink);
          overflow-x: hidden;
        }

        /* ——— HERO HEADER ——— */
        .t-hero {
          position: relative;
          text-align: center;
          padding: 90px 24px 60px;
          overflow: hidden;
        }
        .t-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 70% 55% at 50% 0%, rgba(92,59,189,0.10) 0%, transparent 70%);
          pointer-events: none;
        }
        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--violet-soft);
          color: var(--violet);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 6px 18px;
          border-radius: 999px;
          margin-bottom: 22px;
        }
        .hero-eyebrow span { font-size: 16px; }
        .t-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(40px, 7vw, 80px);
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: -2px;
          background: linear-gradient(135deg, var(--ink) 0%, var(--violet) 60%, var(--rose) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 18px;
        }
        .t-sub {
          font-size: 17px;
          color: #6b6880;
          font-weight: 400;
          max-width: 480px;
          margin: 0 auto 36px;
          line-height: 1.6;
        }
        .stats-row {
          display: flex;
          justify-content: center;
          gap: 48px;
          flex-wrap: wrap;
        }
        .stat-item { text-align: center; }
        .stat-num {
          font-family: 'Playfair Display', serif;
          font-size: 36px;
          font-weight: 800;
          color: var(--violet);
          display: block;
        }
        .stat-label {
          font-size: 13px;
          color: #9490a8;
          font-weight: 500;
          letter-spacing: 0.5px;
        }
        .stat-divider {
          width: 1px;
          height: 40px;
          background: var(--border);
          align-self: center;
        }

        /* ——— SECTION WRAPPER ——— */
        .section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px 80px;
        }
        .section-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 36px;
          flex-wrap: wrap;
          gap: 16px;
        }
        .section-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 6px;
        }
        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(26px, 4vw, 38px);
          font-weight: 700;
          color: var(--ink);
          line-height: 1.2;
        }

        /* ——— FILTERS ——— */
        .filter-pills {
          display: flex;
          gap: 8px;
        }
        .filter-pill {
          border: 1.5px solid var(--border);
          background: transparent;
          color: #6b6880;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          padding: 7px 18px;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.22s ease;
        }
        .filter-pill:hover { border-color: var(--violet); color: var(--violet); }
        .filter-pill.active {
          background: var(--violet);
          border-color: var(--violet);
          color: #fff;
        }

        /* ——— VIDEO GRID ——— */
        .video-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 24px;
        }
        .video-card {
          border-radius: var(--radius);
          overflow: hidden;
          background: var(--card-bg);
          border: 1px solid var(--border);
          box-shadow: var(--shadow);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          animation: fadeUp 0.55s ease both;
          cursor: pointer;
        }
        .video-card:hover {
          transform: translateY(-8px) scale(1.015);
          box-shadow: var(--shadow-hover);
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .video-thumb-wrap {
          position: relative;
          aspect-ratio: 3/4;
          overflow: hidden;
        }
        .video-thumb {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .video-card:hover .video-thumb { transform: scale(1.06); }
        .video-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(15,12,29,0.75) 0%, transparent 60%);
          transition: opacity 0.3s;
        }
        .video-overlay.hovered { opacity: 0.85; }
        .play-btn {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0.85);
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(255,255,255,0.92);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--violet);
          box-shadow: 0 4px 24px rgba(92,59,189,0.35);
          transition: transform 0.3s ease, box-shadow 0.3s;
        }
        .play-btn svg { width: 26px; height: 26px; margin-left: 3px; }
        .play-btn.hovered {
          transform: translate(-50%, -50%) scale(1);
          box-shadow: 0 8px 32px rgba(92,59,189,0.5);
        }
        .video-tag {
          position: absolute;
          top: 14px;
          left: 14px;
          background: var(--gold);
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 4px 12px;
          border-radius: 999px;
        }
        .video-info {
          padding: 18px 20px 20px;
        }
        .video-caption {
          font-size: 13px;
          color: var(--violet);
          font-weight: 500;
          margin-bottom: 6px;
          line-height: 1.4;
        }
        .video-name {
          font-family: 'Playfair Display', serif;
          font-size: 18px;
          font-weight: 700;
          color: var(--ink);
        }

        /* ——— DIVIDER ——— */
        .fancy-divider {
          display: flex;
          align-items: center;
          gap: 16px;
          max-width: 1200px;
          margin: 0 auto 64px;
          padding: 0 24px;
        }
        .divider-line { flex: 1; height: 1px; background: var(--border); }
        .divider-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--gold);
        }

        /* ——— REVIEW GRID ——— */
        .review-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
        }
        .review-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 28px;
          box-shadow: var(--shadow);
          transition: transform 0.3s ease, box-shadow 0.3s;
          animation: fadeUp 0.5s ease both;
          position: relative;
          overflow: hidden;
        }
        .review-card::before {
          content: '"';
          position: absolute;
          top: -10px;
          right: 20px;
          font-family: 'Playfair Display', serif;
          font-size: 120px;
          color: var(--violet-soft);
          line-height: 1;
          pointer-events: none;
        }
        .review-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-hover);
        }
        .review-top {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          margin-bottom: 18px;
          position: relative;
          z-index: 1;
        }
        .review-avatar {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid var(--violet-soft);
          flex-shrink: 0;
        }
        .review-name {
          font-family: 'Playfair Display', serif;
          font-size: 16px;
          font-weight: 700;
          color: var(--ink);
          margin-bottom: 2px;
        }
        .review-course {
          font-size: 12px;
          color: var(--violet);
          font-weight: 500;
          margin-bottom: 6px;
        }
        .star-row { display: flex; gap: 2px; }
        .star { width: 15px; height: 15px; }
        .star.filled { color: #f5a623; }
        .star.empty { color: #ddd; }
        .review-date {
          margin-left: auto;
          font-size: 11px;
          color: #aaa;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .review-text {
          font-size: 14.5px;
          line-height: 1.7;
          color: #4a4760;
          position: relative;
          z-index: 1;
          margin-bottom: 18px;
        }
        .review-footer { display: flex; justify-content: flex-end; }
        .verified-badge {
          font-size: 11px;
          font-weight: 600;
          color: #22a95e;
          background: #e8f8ef;
          padding: 4px 12px;
          border-radius: 999px;
          letter-spacing: 0.5px;
        }

        /* ——— PAGINATION ——— */
        .pagination {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }
        .page-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1.5px solid var(--border);
          background: transparent;
          color: var(--ink);
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .page-btn:hover:not(:disabled) {
          background: var(--violet);
          border-color: var(--violet);
          color: #fff;
        }
        .page-btn:disabled { opacity: 0.3; cursor: not-allowed; }
        .page-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--border);
          border: none;
          cursor: pointer;
          padding: 0;
          transition: all 0.2s;
        }
        .page-dot.active {
          background: var(--violet);
          width: 24px;
          border-radius: 4px;
        }

        

        @media (max-width: 640px) {
          .stats-row { gap: 24px; }
          .stat-divider { display: none; }
          .section-head { flex-direction: column; align-items: flex-start; }
          .cta-strip { padding: 40px 24px; }
        }
      `}</style>

      <div className="tpage">
        {/* ——— HERO ——— */}
        <div className="t-hero">
          <div className="hero-eyebrow"><span>⭐</span> Student Stories</div>
          <h1 className="t-title">Words That<br />Inspire Us</h1>
          <p className="t-sub">
            Hear directly from the students and guardians whose lives have been shaped by our programs.
          </p>
          <div className="stats-row">
            <div className="stat-item">
              <span className="stat-num">4,200+</span>
              <span className="stat-label">Happy Students</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-num">4.9★</span>
              <span className="stat-label">Average Rating</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-num">98%</span>
              <span className="stat-label">Recommend Us</span>
            </div>
          </div>
        </div>

        {/* ——— VIDEO TESTIMONIALS ——— */}
        <div className="section">
          <div className="section-head">
            <div>
              <p className="section-label">Video Stories</p>
              <h2 className="section-title">Voices from Our Community</h2>
            </div>
            <div className="filter-pills">
              {filters.map((f) => (
                <button
                  key={f}
                  className={`filter-pill ${activeFilter === f ? "active" : ""}`}
                  onClick={() => setActiveFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="video-grid">
            {filteredVideos.map((v, i) => (
              <VideoCard key={v.id} testimonial={v} index={i} />
            ))}
          </div>
        </div>

        {/* ——— DIVIDER ——— */}
        <div className="fancy-divider">
          <div className="divider-line" />
          <div className="divider-dot" />
          <div className="divider-dot" />
          <div className="divider-dot" />
          <div className="divider-line" />
        </div>

        {/* ——— WRITTEN REVIEWS ——— */}
        <div className="section">
          <div className="section-head">
            <div>
              <p className="section-label">Written Reviews</p>
              <h2 className="section-title">What They Write About Us</h2>
            </div>
          </div>
          <div className="review-grid">
            {visibleReviews.map((r, i) => (
              <ReviewCard key={r.id} review={r} index={i} />
            ))}
          </div>
          <div className="pagination">
            <button
              className="page-btn"
              onClick={() => setReviewPage((p) => Math.max(0, p - 1))}
              disabled={reviewPage === 0}
              aria-label="Previous"
            >
              ‹
            </button>
            {Array.from({ length: totalReviewPages }).map((_, i) => (
              <button
                key={i}
                className={`page-dot ${i === reviewPage ? "active" : ""}`}
                onClick={() => setReviewPage(i)}
                aria-label={`Page ${i + 1}`}
              />
            ))}
            <button
              className="page-btn"
              onClick={() => setReviewPage((p) => Math.min(totalReviewPages - 1, p + 1))}
              disabled={reviewPage === totalReviewPages - 1}
              aria-label="Next"
            >
              ›
            </button>
          </div>
        </div>

       
       
      </div>
    </>
  );
}