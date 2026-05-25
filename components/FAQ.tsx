"use client";

import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";

type FAQ = { id: number; question: string; answer: string };

const faqs: FAQ[] = [
  {
    id: 1,
    question: "What countries can I apply to through StudySync?",
    answer:
      "We assist students in applying to universities across the UK, USA, Canada, Australia, New Zealand, Ireland, Germany, and many more. Our counsellors are specialists in each destination and stay updated on the latest admission requirements.",
  },
  {
    id: 2,
    question: "Do I need IELTS/PTE/Duolingo to apply for a student visa?",
    answer:
      "It depends on the university you choose, but the good news is—you have options. Whether it's IELTS, PTE, or Duolingo, we'll help you choose the best path to meet your university and visa requirements.",
  },
  {
    id: 3,
    question: "Can I apply with a gap in my academic history?",
    answer:
      "Yes! A gap year is not necessarily a barrier. Many universities accept students with academic gaps, especially when accompanied by a strong personal statement or evidence of productive activities during that period.",
  },
  {
    id: 4,
    question: "How do I choose the right course and university?",
    answer:
      "Our experienced counsellors conduct a thorough profile evaluation considering your academics, interests, budget, and career goals to recommend the best-fit courses and universities for you.",
  },
  {
    id: 5,
    question: "How much does it cost to study in the UK/USA/America?",
    answer:
      "Costs vary widely by country, institution, and program. We provide detailed cost breakdowns including tuition, living expenses, and available scholarships to help you plan your finances effectively.",
  },
  {
    id: 6,
    question: "Can StudySync help me with student accommodation?",
    answer:
      "Absolutely. We guide students through university-managed halls and private accommodation options, helping you find safe and affordable housing close to your campus.",
  },
  {
    id: 7,
    question: "How do I book a one-on-one counselling session?",
    answer:
      "Simply fill out the contact form on this page or call our office. Our team will reach out within 24 hours to schedule your free consultation at a time that suits you.",
  },
];

function FAQItem({ faq, index }: { faq: FAQ; index: number }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState<string>("0px");

  useEffect(() => {
    if (!contentRef.current) return;
    const el = contentRef.current;
    // measure after next paint to ensure accurate height
    requestAnimationFrame(() => {
      setHeight(open ? `${el.scrollHeight}px` : "0px");
    });
  }, [open]);

  return (
    <div
      className={`faq-item ${open ? "open" : ""}`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <button
        className="faq-trigger"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="faq-num">{String(index + 1).padStart(2, "0")}</span>
        <span className="faq-q">{faq.question}</span>
        <span className="faq-icon">{open ? "−" : "+"}</span>
      </button>
      <div
        className="faq-body"
        ref={contentRef}
        style={{
          maxHeight: height,
          transition: "max-height 320ms ease",
        }}
      >
        <p className="faq-answer">{faq.answer}</p>
      </div>
    </div>
  );
}

export default function ContactFAQPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [activeField, setActiveField] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok || !data?.success) {
        throw new Error(data?.error || "Failed to submit inquiry");
      }

      toast.success("Your message has been sent.");
      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
        setForm({ name: "", phone: "", email: "", subject: "", message: "" });
      }, 3000);
    } catch (error) {
      console.error(error);
      toast.error("Could not send message. Please try again.");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2500);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --red: #C8102E;
          --red-deep: #9B0C22;
          --red-glow: #e8203e;
          --cream: #FDF8F3;
          --charcoal: #1A1A2E;
          --muted: #8a8a9a;
          --border: rgba(200,16,46,0.18);
          --glass: rgba(255,255,255,0.06);
          --radius: 18px;
        }

        body {
          font-family: 'DM Sans', sans-serif;
          background: var(--charcoal);
          color: #fff;
          min-height: 100vh;
        }

        .page-wrap {
          min-height: 100vh;
          background:
            radial-gradient(ellipse 80% 50% at 10% 0%, rgba(200,16,46,0.22) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 90% 100%, rgba(200,16,46,0.15) 0%, transparent 55%),
            var(--charcoal);
          padding: 48px 24px 80px;
        }

        /* ── HERO HEADER ── */
        .hero {
          text-align: center;
          margin-bottom: 64px;
        }
        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--red-glow);
          background: rgba(200,16,46,0.12);
          border: 1px solid rgba(200,16,46,0.3);
          border-radius: 50px;
          padding: 6px 18px;
          margin-bottom: 20px;
        }
        .hero-eyebrow::before {
          content: '';
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--red-glow);
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:0.4; transform:scale(1.4); }
        }
        .hero h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.4rem, 5vw, 4rem);
          font-weight: 900;
          line-height: 1.12;
          letter-spacing: -0.02em;
          color: #fff;
        }
        .hero h1 em {
          font-style: italic;
          color: var(--red-glow);
        }
        .hero-sub {
          margin-top: 16px;
          font-size: 1rem;
          color: var(--muted);
          font-weight: 300;
          max-width: 480px;
          margin-inline: auto;
          line-height: 1.7;
        }

        /* ── LAYOUT ── */
        .layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          max-width: 1200px;
          margin: 0 auto;
          align-items: start;
        }
        @media (max-width: 860px) {
          .layout { grid-template-columns: 1fr; }
        }

        /* ── CARD BASE ── */
        .card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: var(--radius);
          backdrop-filter: blur(20px);
          overflow: hidden;
          position: relative;
        }
        .card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(135deg, rgba(200,16,46,0.08) 0%, transparent 60%);
          pointer-events: none;
        }

        /* ── CONTACT CARD ── */
        .contact-card { padding: 40px 36px 44px; }

        .card-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--red-glow);
          margin-bottom: 8px;
        }
        .card-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.9rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 32px;
          line-height: 1.2;
        }

        /* ── FORM ── */
        .form { display: flex; flex-direction: column; gap: 16px; }

        .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        @media (max-width: 560px) { .field-row { grid-template-columns: 1fr; } }

        .field {
          position: relative;
        }
        .field label {
          display: block;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 7px;
          transition: color 0.2s;
        }
        .field.active label { color: var(--red-glow); }

        .field input,
        .field textarea,
        .field select {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.92rem;
          padding: 13px 16px;
          outline: none;
          transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
        }
        .field input::placeholder,
        .field textarea::placeholder {
          color: rgba(255,255,255,0.22);
        }
        .field input:focus,
        .field textarea:focus,
        .field select:focus {
          border-color: var(--red);
          background: rgba(200,16,46,0.07);
          box-shadow: 0 0 0 3px rgba(200,16,46,0.15);
        }
        .field textarea { resize: vertical; min-height: 110px; }

        .field select option { background: #1A1A2E; color: #fff; }

        /* character counter */
        .char-count {
          position: absolute;
          bottom: 10px;
          right: 14px;
          font-size: 10px;
          color: var(--muted);
          pointer-events: none;
        }

        /* ── SUBMIT BUTTON ── */
        .submit-btn {
          position: relative;
          width: 100%;
          padding: 15px 24px;
          border: none;
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          cursor: pointer;
          overflow: hidden;
          transition: transform 0.15s, box-shadow 0.2s;
          background: linear-gradient(135deg, var(--red) 0%, var(--red-deep) 100%);
          color: #fff;
          box-shadow: 0 4px 24px rgba(200,16,46,0.45);
        }
        .submit-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 32px rgba(200,16,46,0.55);
        }
        .submit-btn:active { transform: translateY(0); }
        .submit-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
          pointer-events: none;
        }
        .submit-btn.sending { opacity: 0.7; cursor: not-allowed; }
        .submit-btn.success {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          box-shadow: 0 4px 24px rgba(16,185,129,0.4);
        }
        .submit-btn.error {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          box-shadow: 0 4px 24px rgba(239,68,68,0.35);
        }

        .btn-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        .spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* social strip */
        .social-strip {
          display: flex;
          gap: 12px;
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.07);
        }
        .social-pill {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 8px 14px;
          border-radius: 50px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04);
          font-size: 12px;
          font-weight: 500;
          color: var(--muted);
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
          cursor: pointer;
        }
        .social-pill:hover {
          border-color: var(--red);
          color: #fff;
          background: rgba(200,16,46,0.1);
        }
        .social-icon { font-size: 14px; }

        /* ── FAQ CARD ── */
        .faq-card { padding: 40px 36px 44px; }

        .faq-search-wrap {
          position: relative;
          margin-bottom: 28px;
        }
        .faq-search-wrap svg {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--muted);
          width: 16px; height: 16px;
          pointer-events: none;
        }
        .faq-search {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem;
          padding: 12px 16px 12px 42px;
          outline: none;
          transition: border-color 0.25s, box-shadow 0.25s;
        }
        .faq-search::placeholder { color: rgba(255,255,255,0.25); }
        .faq-search:focus {
          border-color: var(--red);
          box-shadow: 0 0 0 3px rgba(200,16,46,0.15);
        }

        .faq-list { display: flex; flex-direction: column; gap: 2px; }

        .faq-item {
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid transparent;
          transition: border-color 0.25s, background 0.25s;
          animation: fadeUp 0.4s both;
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(12px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .faq-item:hover { border-color: rgba(200,16,46,0.2); }
        .faq-item.open {
          border-color: rgba(200,16,46,0.35);
          background: rgba(200,16,46,0.06);
        }

        .faq-trigger {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 18px;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          color: #fff;
        }

        .faq-num {
          flex-shrink: 0;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--red-glow);
          width: 24px;
        }

        .faq-q {
          flex: 1;
          font-size: 0.9rem;
          font-weight: 500;
          line-height: 1.4;
        }

        .faq-icon {
          flex-shrink: 0;
          width: 26px; height: 26px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.14);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 300;
          color: var(--muted);
          transition: border-color 0.2s, background 0.2s, color 0.2s, transform 0.3s;
        }
        .faq-item.open .faq-icon {
          background: var(--red);
          border-color: var(--red);
          color: #fff;
          transform: rotate(45deg);
        }

        .faq-body {
          overflow: hidden;
          transition: max-height 0.35s cubic-bezier(0.4,0,0.2,1);
        }
        .faq-answer {
          padding: 0 18px 18px 56px;
          font-size: 0.875rem;
          line-height: 1.75;
          color: rgba(255,255,255,0.6);
        }

        .faq-empty {
          text-align: center;
          padding: 40px 20px;
          color: var(--muted);
          font-size: 0.9rem;
        }

        /* stats bar */
        .stats-bar {
          display: flex;
          gap: 24px;
          margin-top: 28px;
          padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.07);
        }
        .stat { flex: 1; text-align: center; }
        .stat-val {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--red-glow);
        }
        .stat-label {
          font-size: 10px;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-top: 2px;
        }

        @media (max-width: 640px) {
          .page-wrap { padding: 30px 14px 44px; }
          .hero { margin-bottom: 30px; }
          .hero-eyebrow { font-size: 9px; letter-spacing: 0.12em; padding: 5px 10px; margin-bottom: 10px; }
          .hero h1 { font-size: clamp(1.75rem, 8vw, 2.2rem); line-height: 1.15; }
          .hero-sub { font-size: 0.9rem; line-height: 1.55; margin-top: 10px; }
          .layout { gap: 16px; }
          .contact-card, .faq-card { padding: 22px 16px 20px; }
          .card-title { font-size: 1.4rem; margin-bottom: 18px; }
          .field input, .field textarea, .field select { font-size: 0.88rem; padding: 11px 12px; }
          .field label { font-size: 10px; margin-bottom: 5px; }
          .submit-btn { padding: 12px 16px; font-size: 0.88rem; }
          .social-strip { display: none; }
          .faq-search-wrap { margin-bottom: 16px; }
          .faq-trigger { padding: 12px; gap: 10px; }
          .faq-num { display: none; }
          .faq-q { font-size: 0.84rem; line-height: 1.35; }
          .faq-icon { width: 22px; height: 22px; font-size: 14px; }
          .faq-answer { padding: 0 12px 12px 12px; font-size: 0.81rem; line-height: 1.6; }
          .stats-bar { display: none; }
        }
      `}</style>

      <div className="page-wrap">
        {/* Hero */}
        <div className="hero">
          <div className="hero-eyebrow">StudySync · Study Abroad</div>
          <h1>
            Your journey <em>abroad</em>
            <br />starts with a question.
          </h1>
          <p className="hero-sub">
            Reach out and our expert counsellors will guide you from dream to departure.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="layout">
          {/* ── CONTACT FORM ── */}
          <div className="card contact-card">
            <p className="card-label">Contact Us</p>
            <h2 className="card-title">Get in Touch</h2>

            <form className="form" onSubmit={handleSubmit}>
              <div className="field-row">
                <div className={`field ${activeField === "name" ? "active" : ""}`}>
                  <label htmlFor="name">Full Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Jane Smith"
                    value={form.name}
                    onChange={handleChange}
                    onFocus={() => setActiveField("name")}
                    onBlur={() => setActiveField(null)}
                    required
                  />
                </div>
                <div className={`field ${activeField === "phone" ? "active" : ""}`}>
                  <label htmlFor="phone">Phone</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+977 98XXXXXXXX"
                    value={form.phone}
                    onChange={handleChange}
                    onFocus={() => setActiveField("phone")}
                    onBlur={() => setActiveField(null)}
                  />
                </div>
              </div>

              <div className={`field ${activeField === "email" ? "active" : ""}`}>
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="jane@example.com"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => setActiveField("email")}
                  onBlur={() => setActiveField(null)}
                  required
                />
              </div>

              <div className={`field ${activeField === "subject" ? "active" : ""}`}>
                <label htmlFor="subject">I&apos;m interested in</label>
                <select
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  onFocus={() => setActiveField("subject")}
                  onBlur={() => setActiveField(null)}
                >
                  <option value="">Select a topic…</option>
                  <option>University Application</option>
                  <option>Visa Guidance</option>
                  <option>Scholarship Advice</option>
                  <option>Test Preparation (IELTS/PTE)</option>
                  <option>Accommodation Help</option>
                  <option>Other</option>
                </select>
              </div>

              <div className={`field ${activeField === "message" ? "active" : ""}`} style={{ position: "relative" }}>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your study abroad goals…"
                  value={form.message}
                  onChange={handleChange}
                  onFocus={() => setActiveField("message")}
                  onBlur={() => setActiveField(null)}
                  maxLength={500}
                />
                <span className="char-count">{form.message.length}/500</span>
              </div>

              <button
                type="submit"
                className={`submit-btn ${status}`}
                disabled={status === "sending" || status === "success"}
              >
                <span className="btn-inner">
                  {status === "sending" && <span className="spinner" />}
                  {status === "idle" && "Send Message →"}
                  {status === "sending" && "Sending…"}
                  {status === "success" && "✓ Message Sent!"}
                  {status === "error" && "Could not send. Try again."}
                </span>
              </button>
            </form>

            <div className="social-strip">
              {[
                { icon: "📞", label: "Call Us" },
                { icon: "💬", label: "WhatsApp" },
                { icon: "📍", label: "Visit Us" },
              ].map((s) => (
                <a key={s.label} className="social-pill" href="#">
                  <span className="social-icon">{s.icon}</span>
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* ── FAQ ── */}
          <div className="card faq-card">
            <p className="card-label">Quick Answers</p>
            <h2 className="card-title">FAQ</h2>

            <div className="faq-search-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                className="faq-search"
                type="text"
                placeholder="Search questions…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="faq-list">
              {filtered.length === 0 ? (
                <div className="faq-empty">No questions match &quot;{search}&quot;</div>
              ) : (
                filtered.map((faq, i) => (
                  <FAQItem key={faq.id} faq={faq} index={i} />
                ))
              )}
            </div>

            <div className="stats-bar">
              {[
                { val: "10K+", label: "Students Placed" },
                { val: "50+", label: "Partner Unis" },
                { val: "98%", label: "Visa Success" },
              ].map((s) => (
                <div key={s.label} className="stat">
                  <div className="stat-val">{s.val}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
