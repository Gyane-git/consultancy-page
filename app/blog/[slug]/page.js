"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { blogs } from "../page";

// Full article content per slug
const articleContent = {
  "affordable-uk-universities": {
    intro: "The United Kingdom remains one of the top destinations for Nepali students. But the cost of tuition can be a barrier. The good news? There are numerous reputable UK universities offering quality education with tuition fees below £10,000 per year.",
    sections: [
      {
        heading: "Why Choose an Affordable UK University?",
        body: "Choosing an affordable university doesn't mean compromising on quality. Many institutions outside of London offer world-class programs, excellent graduate employment rates, and vibrant campus life — all at a fraction of the cost of top-ranked schools.",
      },
      {
        heading: "Top Universities with Fees Below £10,000",
        body: "Universities such as the University of Sunderland, Teesside University, University of Central Lancashire (UCLan), University of Bedfordshire, and Staffordshire University consistently offer undergraduate and postgraduate programs under the £10,000 threshold for international students.",
      },
      {
        heading: "Popular Courses",
        body: "Business & Management, Computer Science, Nursing & Health Sciences, Engineering, and Hospitality Management are among the most popular and affordable programs. Many of these lead directly to Post-Study Work visa eligibility.",
      },
      {
        heading: "How to Apply",
        body: "Applications to most UK universities are made through UCAS for undergraduate programs. For postgraduate, apply directly to the university. Our counsellors can help you shortlist, prepare documents, and submit a strong application.",
      },
    ],
  },
  "low-gpa-accepted-uk": {
    intro: "A low GPA should not be the end of your dream to study in the UK. Many UK universities have flexible entry requirements, and there are proven strategies to strengthen your application despite a lower academic score.",
    sections: [
      {
        heading: "UK GPA Requirements Explained",
        body: "UK universities typically use the British grading system, but they readily accept international GPAs. A 2.0–2.5 GPA (US scale) or 50–60% aggregate (Nepal) is the general minimum for many universities, while top institutions may require higher scores.",
      },
      {
        heading: "How to Compensate for a Low GPA",
        body: "A strong personal statement, excellent references, relevant work experience, and a compelling motivation letter can significantly offset a lower GPA. Some universities also offer pathway or foundation programs as an alternative entry route.",
      },
      {
        heading: "Universities That Accept Low GPAs",
        body: "Institutions like University of East London, London Metropolitan University, and several others have flexible entry policies. They evaluate applications holistically rather than solely on academic grades.",
      },
    ],
  },
  "study-abroad-without-ielts": {
    intro: "IELTS and PTE are not always mandatory. Many universities worldwide — including in the UK, Australia, Canada, and USA — accept alternative English proficiency proofs, especially for students from English-medium schools.",
    sections: [
      {
        heading: "Universities That Accept Without IELTS/PTE",
        body: "A growing number of universities accept MOI (Medium of Instruction) letters from your previous institution, internal English tests, or Duolingo English Test scores as proof of language proficiency.",
      },
      {
        heading: "Alternative Ways to Prove English Proficiency",
        body: "Options include Duolingo English Test (DET), Cambridge English exams, TOEFL iBT, in-house university tests, or a letter from your previous institution confirming English-medium education.",
      },
      {
        heading: "Country-Specific Requirements",
        body: "UK universities generally require IELTS 5.5–6.5. Australia requires IELTS 6.0+. Canada varies by institution. However, exceptions exist across all countries for specific programs and student backgrounds.",
      },
    ],
  },
  "psw-work-opportunities-uk": {
    intro: "The UK's Graduate Route (Post Study Work visa) allows international students to stay and work in the UK for up to 2 years after completing their degree (3 years for PhD graduates). This makes the UK one of the most attractive destinations for career-focused students.",
    sections: [
      {
        heading: "What is the PSW Visa?",
        body: "The Graduate Route visa lets you work or look for work at any skill level after you finish your degree. It is valid for 2 years (or 3 years for doctoral graduates) and can be converted to other work visas.",
      },
      {
        heading: "Popular Courses for PSW",
        body: "Business & Management, Engineering & Technology, Medicine & Health Sciences, Computer Science, and Data Analytics are among the most in-demand fields that lead to strong PSW employment opportunities.",
      },
      {
        heading: "How to Maximize Your PSW Chances",
        body: "Choose programs with industry placements, join professional networks while studying, gain UK work experience through part-time jobs, and start job hunting 6 months before graduation.",
      },
    ],
  },
  "student-life-australia": {
    intro: "Australia is consistently ranked among the top destinations for international students, offering a high quality of life, world-class education, and multicultural communities that make Nepali students feel right at home.",
    sections: [
      {
        heading: "Accommodation Options",
        body: "Students can choose from on-campus dormitories, private rentals, homestay programs, or student accommodation providers. Cities like Melbourne, Sydney, and Brisbane have strong Nepali communities.",
      },
      {
        heading: "Part-Time Work Rights",
        body: "International students in Australia can work up to 48 hours per fortnight during semester and unlimited hours during holidays. Minimum wage is approximately AUD $23/hour, making part-time work a viable supplement.",
      },
      {
        heading: "Cultural Experience",
        body: "Australia's multicultural environment means Nepali students can find familiar food, festivals, and communities while also experiencing new cultures. Universities run orientation programs and international student support services.",
      },
    ],
  },
  "canada-study-permit-guide": {
    intro: "Canada is one of the most welcoming countries for international students. A study permit is required for any program longer than 6 months, and the application process has become more streamlined in recent years.",
    sections: [
      {
        heading: "Required Documents",
        body: "You will need an acceptance letter from a Designated Learning Institution (DLI), proof of financial support, a valid passport, passport-size photographs, and language test scores (if applicable).",
      },
      {
        heading: "Processing Times",
        body: "Processing times vary but typically range from 4 to 12 weeks. It is advisable to apply at least 3–4 months before your program start date. Online applications through IRCC are now the standard.",
      },
      {
        heading: "Common Reasons for Rejection",
        body: "Insufficient financial proof, incomplete documents, unclear ties to home country, and poor study plan are the most common reasons. Our counsellors help you address each of these before submission.",
      },
    ],
  },
};

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params?.slug;

  const blog = blogs.find((b) => b.slug === slug);
  const content = articleContent[slug];

  if (!blog) {
    return (
      <div style={{ fontFamily: "Plus Jakarta Sans, sans-serif", textAlign: "center", padding: "120px 24px" }}>
        <div style={{ fontSize: "3rem", marginBottom: 16 }}>404</div>
        <div style={{ fontSize: "1.1rem", color: "#999", marginBottom: 24 }}>Article not found.</div>
        <Link href="/blog" style={{ color: "#1a90c8", fontWeight: 600, textDecoration: "none" }}>← Back to Blog</Link>
      </div>
    );
  }

  const related = blogs.filter((b) => b.slug !== slug && b.category === blog.category).slice(0, 3);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f7f8fa; }

        .bd-root { font-family: 'Plus Jakarta Sans', sans-serif; background: #f7f8fa; min-height: 100vh; }

        /* TOPBAR */
        .bd-topbar {
          background: #fff; border-bottom: 1px solid #ebebeb;
          padding: 0 48px; height: 56px;
          display: flex; align-items: center; gap: 8px;
        }
        .bd-dot { width: 8px; height: 8px; border-radius: 50%; }
        .bd-topbar-name { font-size: 0.88rem; font-weight: 700; color: #111; margin-left: 4px; }
        .bd-sep { width: 1px; height: 14px; background: #e5e5e5; margin: 0 8px; }
        .bd-topbar-back {
          font-size: 0.78rem; color: #1a90c8; font-weight: 600;
          text-decoration: none; display: flex; align-items: center; gap: 4px;
          transition: color 0.15s;
        }
        .bd-topbar-back:hover { color: #1270a8; }

        /* HERO */
        .bd-hero {
          background: #fff; border-bottom: 1px solid #ebebeb;
          padding: 48px 48px 0;
        }
        .bd-hero-inner { max-width: 840px; margin: 0 auto; }
        .bd-hero-meta {
          display: flex; align-items: center; gap: 12px; margin-bottom: 16px; flex-wrap: wrap;
        }
        .bd-cat {
          font-size: 0.65rem; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 4px 12px; border-radius: 4px;
        }
        .bd-date { font-size: 0.75rem; color: #bbb; }
        .bd-read { font-size: 0.75rem; color: #bbb; }
        .bd-video-badge {
          display: inline-flex; align-items: center; gap: 5px;
          background: #fff0ef; border: 1px solid #fad4d1;
          border-radius: 100px; padding: 3px 12px;
          font-size: 0.68rem; font-weight: 700; color: #e8352a;
        }
        .bd-hero h1 {
          font-family: 'Fraunces', serif;
          font-size: clamp(1.7rem, 4vw, 2.6rem);
          font-weight: 700; color: #111;
          line-height: 1.2; letter-spacing: -0.02em;
          margin-bottom: 16px;
        }
        .bd-hero-excerpt {
          font-size: 0.95rem; color: #777;
          line-height: 1.75; margin-bottom: 32px;
          max-width: 680px;
        }
        .bd-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 36px; }
        .bd-tag {
          font-size: 0.7rem; font-weight: 600;
          background: #f7f8fa; border: 1px solid #e8e8e8;
          color: #888; padding: 4px 12px; border-radius: 6px;
        }

        /* THUMBNAIL HERO IMAGE */
        .bd-thumb-hero {
          width: 100%; max-height: 320px;
          object-fit: cover; display: block;
          border-radius: 0;
          overflow: hidden;
        }
        .bd-thumb-placeholder {
          width: 100%; height: 300px;
          display: flex; align-items: center; justify-content: center;
          position: relative; overflow: hidden;
        }

        /* CONTENT AREA */
        .bd-content-wrap {
          max-width: 840px; margin: 0 auto;
          padding: 0 48px;
          display: grid;
          grid-template-columns: 1fr 240px;
          gap: 40px;
          align-items: start;
        }

        .bd-article { padding: 48px 0 80px; }

        .bd-intro {
          font-size: 1rem; color: #444;
          line-height: 1.85; font-weight: 400;
          margin-bottom: 40px;
          padding-bottom: 32px;
          border-bottom: 1px solid #f0f0f0;
        }

        .bd-section { margin-bottom: 36px; }
        .bd-section-heading {
          font-family: 'Fraunces', serif;
          font-size: 1.25rem; font-weight: 700;
          color: #111; margin-bottom: 12px;
          display: flex; align-items: center; gap: 10px;
        }
        .bd-section-heading::before {
          content: '';
          display: inline-block;
          width: 4px; height: 20px;
          border-radius: 2px; flex-shrink: 0;
        }
        .bd-section-body {
          font-size: 0.92rem; color: #666;
          line-height: 1.85; font-weight: 400;
        }

        /* VIDEO */
        .bd-video-wrap {
          margin: 40px 0;
          border-radius: 14px; overflow: hidden;
          box-shadow: 0 4px 24px rgba(0,0,0,0.1);
          background: #111;
        }
        .bd-video-label {
          padding: 14px 20px;
          font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          display: flex; align-items: center; gap: 8px;
        }
        .bd-video-dot { width: 8px; height: 8px; border-radius: 50%; background: #e8352a; }
        .bd-video-iframe {
          width: 100%; aspect-ratio: 16/9;
          border: none; display: block;
        }

        /* SIDEBAR */
        .bd-sidebar { padding: 48px 0 80px; }
        .bd-sidebar-card {
          background: #fff; border: 1px solid #ebebeb;
          border-radius: 12px; padding: 20px;
          margin-bottom: 16px;
        }
        .bd-sidebar-title {
          font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: #aaa; margin-bottom: 14px;
        }
        .bd-cta-card {
          background: #111; border-radius: 12px;
          padding: 24px 20px; text-align: center;
          margin-bottom: 16px; position: relative; overflow: hidden;
        }
        .bd-cta-card::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 70% 60% at 50% 0%, rgba(232,53,42,0.2), transparent);
          pointer-events: none;
        }
        .bd-cta-card-title {
          font-family: 'Fraunces', serif;
          font-size: 1.1rem; font-weight: 700;
          color: #fff; margin-bottom: 8px; position: relative;
        }
        .bd-cta-card-sub {
          font-size: 0.75rem; color: rgba(255,255,255,0.5);
          line-height: 1.6; margin-bottom: 16px; position: relative;
        }
        .bd-cta-btn {
          display: block; width: 100%;
          background: #e8352a; color: #fff;
          border: none; border-radius: 7px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.78rem; font-weight: 700;
          padding: 11px 16px; cursor: pointer;
          text-decoration: none; text-align: center;
          transition: background 0.18s; position: relative;
        }
        .bd-cta-btn:hover { background: #c8281e; }

        .bd-related-link {
          display: flex; gap: 10px; align-items: flex-start;
          padding: 10px 0; border-bottom: 1px solid #f5f5f5;
          text-decoration: none; color: inherit;
          transition: opacity 0.15s;
        }
        .bd-related-link:last-child { border-bottom: none; }
        .bd-related-link:hover { opacity: 0.7; }
        .bd-related-thumb {
          width: 48px; height: 40px;
          border-radius: 6px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
        }
        .bd-related-title {
          font-size: 0.78rem; font-weight: 600;
          color: #333; line-height: 1.4;
        }
        .bd-related-cat {
          font-size: 0.64rem; color: #bbb;
          margin-top: 2px;
        }

        /* BACK BUTTON */
        .bd-back-bottom {
          max-width: 840px; margin: 0 auto;
          padding: 0 48px 60px;
        }
        .bd-back-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: #fff; border: 1.5px solid #e8e8e8;
          border-radius: 8px; padding: 11px 20px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.82rem; font-weight: 600; color: #444;
          text-decoration: none; transition: border-color 0.18s, color 0.18s;
        }
        .bd-back-btn:hover { border-color: #1a90c8; color: #1a90c8; }

        @media (max-width: 820px) {
          .bd-topbar, .bd-hero, .bd-back-bottom { padding-left: 20px; padding-right: 20px; }
          .bd-content-wrap { grid-template-columns: 1fr; padding: 0 20px; }
          .bd-sidebar { padding-top: 0; }
        }
      `}</style>

      <div className="bd-root">
        {/* TOPBAR */}
        <div className="bd-topbar">
          <div className="bd-dot" style={{ background: "#e8352a" }} />
          <div className="bd-dot" style={{ background: "#e8922a" }} />
          <div className="bd-dot" style={{ background: "#1a9e5c" }} />
          <div className="bd-dot" style={{ background: "#1a90c8" }} />
          <span className="bd-topbar-name">Study Abroad Nepal</span>
          <div className="bd-sep" />
          <Link href="/blog" className="bd-topbar-back">← Back to Blog</Link>
        </div>

        {/* HERO */}
        <div className="bd-hero">
          <div className="bd-hero-inner">
            <div className="bd-hero-meta">
              <span className="bd-cat" style={{ background: blog.categoryColor + "15", color: blog.categoryColor }}>
                {blog.category}
              </span>
              <span className="bd-date">{blog.date}</span>
              <span className="bd-read">· {blog.readTime} read</span>
              {blog.videoUrl && (
                <span className="bd-video-badge">▶ Includes Video</span>
              )}
            </div>
            <h1>{blog.title}</h1>
            <p className="bd-hero-excerpt">{blog.excerpt}</p>
            <div className="bd-tags">
              {blog.tags.map((t) => <span key={t} className="bd-tag">{t}</span>)}
            </div>
          </div>

          {/* THUMBNAIL / HERO IMAGE */}
          <div className="bd-hero-inner" style={{ padding: "0", maxWidth: "840px" }}>
            <div className="bd-thumb-placeholder" style={{ background: blog.thumbnailBg }}>
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.28)" }} />
              <div style={{
                position: "relative", zIndex: 1,
                color: "#fff", textAlign: "center",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800, fontSize: "1.4rem",
                lineHeight: 1.3, padding: "0 40px",
                textTransform: "uppercase", letterSpacing: "0.02em",
                whiteSpace: "pre-line",
              }}>
                {blog.thumbnailLabel}
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT + SIDEBAR */}
        <div style={{ maxWidth: "840px", margin: "0 auto", padding: "0 48px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 240px", gap: "40px", alignItems: "start" }}>

            {/* ARTICLE */}
            <article className="bd-article">
              {content && (
                <>
                  <p className="bd-intro">{content.intro}</p>

                  {/* VIDEO — only if videoUrl exists */}
                  {blog.videoUrl && (
                    <div className="bd-video-wrap">
                      <div className="bd-video-label" style={{ background: "#1a1a1a", color: "rgba(255,255,255,0.6)" }}>
                        <div className="bd-video-dot" />
                        <span>Watch: {blog.title}</span>
                      </div>
                      <iframe
                        className="bd-video-iframe"
                        src={blog.videoUrl}
                        title={blog.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  )}

                  {content.sections.map((sec, i) => {
                    const colors = ["#e8352a", "#1a90c8", "#1a9e5c", "#e8922a"];
                    const color = colors[i % colors.length];
                    return (
                      <div className="bd-section" key={i}>
                        <h2 className="bd-section-heading">
                          <span style={{
                            display: "inline-block",
                            width: 4, height: 22,
                            background: color,
                            borderRadius: 2, flexShrink: 0,
                          }} />
                          {sec.heading}
                        </h2>
                        <p className="bd-section-body">{sec.body}</p>
                      </div>
                    );
                  })}
                </>
              )}
            </article>

            {/* SIDEBAR */}
            <aside className="bd-sidebar">
              {/* CTA */}
              <div className="bd-cta-card">
                <div className="bd-cta-card-title">Free Consultation</div>
                <p className="bd-cta-card-sub">Talk to our expert counsellors about your study abroad journey.</p>
                <Link href="/contact" className="bd-cta-btn">Book Now →</Link>
              </div>

              {/* RELATED */}
              {related.length > 0 && (
                <div className="bd-sidebar-card">
                  <div className="bd-sidebar-title">Related Articles</div>
                  {related.map((r) => (
                    <Link href={`/blog/${r.slug}`} key={r.slug} className="bd-related-link">
                      <div className="bd-related-thumb" style={{ background: r.thumbnailBg + "22" }}>
                        <span style={{ fontSize: "1.2rem" }}>📄</span>
                      </div>
                      <div>
                        <div className="bd-related-title">{r.title}</div>
                        <div className="bd-related-cat">{r.category} · {r.readTime}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* COLOR DOTS */}
              <div className="bd-sidebar-card" style={{ display: "flex", justifyContent: "center", gap: 8 }}>
                {["#e8352a","#e8922a","#1a9e5c","#1a90c8"].map((c) => (
                  <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
                ))}
              </div>
            </aside>
          </div>
        </div>

        {/* BACK BUTTON */}
        <div style={{ maxWidth: "840px", margin: "0 auto", padding: "0 48px 60px" }}>
          <Link href="/blog" className="bd-back-btn">← Back to all articles</Link>
        </div>
      </div>
    </>
  );
}