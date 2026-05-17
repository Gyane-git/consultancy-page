"use client";

import { useState } from "react";

const subjects = [
  "Study in Australia",
  "Visa Assistance",
  "IELTS Preparation",
  "Scholarship Guidance",
  "Course Selection",
  "Other",
];

const contactInfo = [
  {
    color: "#e8352a",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    ),
    label: "Our Office",
    value: "Kathmandu, Bagmati Province, Nepal",
  },
  {
    color: "#e8922a",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
      </svg>
    ),
    label: "Email Us",
    value: "info@studysync.com.np",
  },
  {
    color: "#1a9e5c",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
      </svg>
    ),
    label: "Call Us",
    value: "015924164",
  },
  {
    color: "#1a90c8",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    label: "Working Hours",
    value: "Sun – Fri: 9:00 AM – 6:00 PM",
  },
];

const subjectColors = ["active-red", "active-orange", "active-green", "active-blue", "active-red", "active-orange"];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", time: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
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
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("Unable to submit your message right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .cp-root {
          min-height: 100vh;
          background: #f7f8fa;
          font-family: 'Plus Jakarta Sans', sans-serif;
          color: #1a1a1a;
        }

        .cp-topbar {
          background: #fff;
          border-bottom: 1px solid #ebebeb;
          padding: 0 48px;
          height: 60px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .cp-dot { width: 9px; height: 9px; border-radius: 50%; }
        .cp-topbar-name {
          font-size: 0.92rem; font-weight: 700;
          color: #1a1a1a; margin-left: 4px;
        }
        .cp-sep { width: 1px; height: 16px; background: #e5e5e5; margin: 0 10px; }
        .cp-topbar-page { font-size: 0.8rem; color: #aaa; }

        .cp-hero {
          background: #fff;
          border-bottom: 1px solid #ebebeb;
          padding: 52px 48px 44px;
        }
        .cp-hero-inner {
          max-width: 1040px; margin: 0 auto;
          display: flex; align-items: flex-end;
          justify-content: space-between; gap: 32px; flex-wrap: wrap;
        }
        .cp-pill {
          display: inline-flex; align-items: center; gap: 7px;
          background: #fff0ef; border: 1px solid #fad4d1;
          border-radius: 100px; padding: 5px 14px 5px 8px;
          margin-bottom: 14px;
        }
        .cp-pill-dot { width: 8px; height: 8px; border-radius: 50%; background: #e8352a; }
        .cp-pill-text { font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #e8352a; }
        .cp-hero h1 {
          font-size: clamp(1.9rem, 4vw, 2.8rem);
          font-weight: 700; color: #111;
          line-height: 1.18; letter-spacing: -0.02em;
        }
        .cp-hero h1 span { color: #e8352a; }
        .cp-hero-sub {
          font-size: 0.88rem; color: #999;
          font-weight: 400; line-height: 1.7; max-width: 340px;
        }

        .cp-main {
          max-width: 1040px; margin: 40px auto;
          padding: 0 48px;
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 24px; align-items: start;
        }

        /* INFO CARDS */
        .cp-info-stack { display: flex; flex-direction: column; gap: 12px; }
        .cp-info-card {
          background: #fff; border: 1px solid #ebebeb;
          border-radius: 12px; padding: 18px 20px;
          display: flex; align-items: center; gap: 14px;
          transition: box-shadow 0.18s, transform 0.18s;
        }
        .cp-info-card:hover { box-shadow: 0 4px 18px rgba(0,0,0,0.07); transform: translateY(-2px); }
        .cp-info-icon {
          width: 42px; height: 42px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .cp-info-label {
          font-size: 0.68rem; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase; color: #bbb; margin-bottom: 2px;
        }
        .cp-info-value { font-size: 0.855rem; font-weight: 500; color: #222; line-height: 1.45; }

        .cp-map {
          background: #fff; border: 1px solid #ebebeb;
          border-radius: 12px; overflow: hidden;
          height: 130px; display: flex;
          align-items: center; justify-content: center;
          position: relative; margin-top: 12px;
        }
        .cp-map-grid {
          position: absolute; inset: 0;
          background-image: linear-gradient(#f0f0f0 1px, transparent 1px), linear-gradient(90deg, #f0f0f0 1px, transparent 1px);
          background-size: 26px 26px;
        }
        .cp-map-pin { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; gap: 5px; }
        .cp-map-pin-dot { width: 13px; height: 13px; background: #e8352a; border-radius: 50%; box-shadow: 0 0 0 5px rgba(232,53,42,0.18); }
        .cp-map-pin-label { background: #111; color: #fff; font-size: 0.68rem; font-weight: 600; padding: 4px 10px; border-radius: 5px; white-space: nowrap; }

        /* FORM */
        .cp-form-card {
          background: #fff; border: 1px solid #ebebeb;
          border-radius: 16px; padding: 40px 40px;
        }
        .cp-form-heading { font-size: 1.15rem; font-weight: 700; color: #111; margin-bottom: 4px; letter-spacing: -0.01em; }
        .cp-form-sub { font-size: 0.82rem; color: #aaa; margin-bottom: 28px; }

        .cp-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .cp-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
        .cp-field label {
          font-size: 0.7rem; font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase; color: #666;
        }
        .cp-field input, .cp-field select, .cp-field textarea {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.875rem; font-weight: 400; color: #1a1a1a;
          background: #f7f8fa; border: 1.5px solid #e8e8e8;
          border-radius: 8px; padding: 11px 14px; outline: none;
          transition: border-color 0.2s, background 0.2s;
          width: 100%; appearance: none; -webkit-appearance: none;
        }
        .cp-field input::placeholder, .cp-field textarea::placeholder { color: #ccc; }
        .cp-field input:focus, .cp-field select:focus, .cp-field textarea:focus {
          border-color: #1a90c8; background: #fff;
        }
        .cp-field select {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23aaa' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 14px center;
          background-color: #f7f8fa; padding-right: 38px; cursor: pointer;
        }
        .cp-field select option { background: #fff; }
        .cp-field textarea { resize: vertical; min-height: 100px; line-height: 1.6; }

        /* SUBJECT TAGS */
        .cp-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 2px; }
        .cp-tag {
          padding: 6px 14px; border-radius: 6px;
          border: 1.5px solid #e8e8e8; background: #f7f8fa;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.78rem; font-weight: 500; color: #888;
          cursor: pointer; transition: all 0.15s;
        }
        .cp-tag:hover:not(.t-red):not(.t-orange):not(.t-green):not(.t-blue) {
          border-color: #ccc; background: #fff; color: #333;
        }
        .cp-tag.t-red    { border-color: #e8352a; background: #fff0ef; color: #e8352a; }
        .cp-tag.t-orange { border-color: #e8922a; background: #fff7ee; color: #e8922a; }
        .cp-tag.t-green  { border-color: #1a9e5c; background: #edf9f3; color: #1a9e5c; }
        .cp-tag.t-blue   { border-color: #1a90c8; background: #edf6fb; color: #1a90c8; }

        /* SUBMIT ROW */
        .cp-submit-row {
          display: flex; align-items: center;
          justify-content: space-between; gap: 16px;
          margin-top: 8px; flex-wrap: wrap;
        }
        .cp-submit-note { font-size: 0.75rem; color: #ccc; }
        .cp-submit-btn {
          background: #1a1a1a; color: #fff; border: none;
          border-radius: 8px; font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.83rem; font-weight: 600;
          padding: 13px 28px; cursor: pointer;
          display: flex; align-items: center; gap: 8px;
          transition: background 0.18s, transform 0.15s;
        }
        .cp-submit-btn:hover { background: #e8352a; transform: translateY(-1px); }
        .cp-submit-btn:active { transform: none; }

        /* SUCCESS */
        .cp-success {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          min-height: 340px; text-align: center; gap: 10px;
          animation: cpFade 0.5s ease both;
        }
        .cp-success-ring {
          width: 64px; height: 64px; border-radius: 50%;
          border: 2px solid #1a9e5c;
          display: flex; align-items: center; justify-content: center;
          color: #1a9e5c; margin-bottom: 6px;
        }
        .cp-success-title { font-size: 1.35rem; font-weight: 700; color: #111; }
        .cp-success-sub { font-size: 0.83rem; color: #aaa; max-width: 270px; line-height: 1.7; }
        .cp-success-again {
          margin-top: 14px; background: none;
          border: 1.5px solid #e8e8e8; border-radius: 8px;
          padding: 9px 22px; font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.78rem; font-weight: 600; color: #666;
          cursor: pointer; transition: border-color 0.2s, color 0.2s;
        }
        .cp-success-again:hover { border-color: #1a1a1a; color: #1a1a1a; }

        @keyframes cpFade {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 820px) {
          .cp-main { grid-template-columns: 1fr; padding: 0 20px; }
          .cp-hero  { padding: 36px 20px 32px; }
          .cp-topbar { padding: 0 20px; }
          .cp-form-card { padding: 28px 20px; }
          .cp-row { grid-template-columns: 1fr; }
          .cp-submit-row { flex-direction: column; align-items: stretch; }
          .cp-submit-btn { justify-content: center; }
        }
      `}</style>

      <div className="cp-root">

        {/* TOPBAR */}
        <div className="cp-topbar">
          <div className="cp-dot" style={{ background: "#e8352a" }} />
          <div className="cp-dot" style={{ background: "#e8922a" }} />
          <div className="cp-dot" style={{ background: "#1a9e5c" }} />
          <div className="cp-dot" style={{ background: "#1a90c8" }} />
          <span className="cp-topbar-name">Study Abroad Nepal</span>
          <div className="cp-sep" />
          <span className="cp-topbar-page">Contact Us</span>
        </div>

        {/* HERO */}
        <div className="cp-hero">
          <div className="cp-hero-inner">
            <div>
              <div className="cp-pill">
                <div className="cp-pill-dot" />
                <span className="cp-pill-text">Contact Us</span>
              </div>
              <h1>Get in Touch<br />With <span>Our Team</span></h1>
            </div>
            <p className="cp-hero-sub">
              Have questions about studying abroad? Our counsellors are ready to guide you every step of the way.
            </p>
          </div>
        </div>

        {/* CONTENT */}
        <div className="cp-main">

          {/* LEFT */}
          <div>
            <div className="cp-info-stack">
              {contactInfo.map((item, i) => (
                <div className="cp-info-card" key={i}>
                  <div className="cp-info-icon" style={{ background: item.color + "15", color: item.color }}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="cp-info-label">{item.label}</div>
                    <div className="cp-info-value">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="cp-map">
              <div className="cp-map-grid" />
              <div className="cp-map-pin">
                <div className="cp-map-pin-dot" />
                <div className="cp-map-pin-label">Kathmandu, Nepal</div>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="cp-form-card">
            {submitted ? (
              <div className="cp-success">
                <div className="cp-success-ring">
                  <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <div className="cp-success-title">Message Sent!</div>
                <p className="cp-success-sub">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                <button className="cp-success-again" onClick={() => { setForm({ name: "", email: "", phone: "", time: "", subject: "", message: "" }); setSubmitted(false); }}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <div className="cp-form-heading">Send us a message</div>
                <p className="cp-form-sub">We typically respond within one business day.</p>
                <form onSubmit={handleSubmit} noValidate>

                  <div className="cp-row">
                    <div className="cp-field">
                      <label>Full Name</label>
                      <input name="name" type="text" placeholder="Your full name" value={form.name} onChange={handleChange} required />
                    </div>
                    <div className="cp-field">
                      <label>Email Address</label>
                      <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
                    </div>
                  </div>

                  <div className="cp-row">
                    <div className="cp-field">
                      <label>Phone Number</label>
                      <input name="phone" type="tel" placeholder="+977 " value={form.phone} onChange={handleChange} />
                    </div>
                    <div className="cp-field">
                      <label>Best Time to Call</label>
                      <select name="time" value={form.time} onChange={handleChange}>
                        <option value="">Select time</option>
                        <option>Morning (9AM – 12PM)</option>
                        <option>Afternoon (12PM – 3PM)</option>
                        <option>Evening (3PM – 6PM)</option>
                      </select>
                    </div>
                  </div>

                  <div className="cp-field">
                    <label>What can we help you with?</label>
                    <div className="cp-tags">
                      {subjects.map((s, i) => {
                        const cls = ["t-red","t-orange","t-green","t-blue","t-red","t-orange"];
                        return (
                          <button type="button" key={s}
                            className={`cp-tag${form.subject === s ? " " + cls[i] : ""}`}
                            onClick={() => setForm({ ...form, subject: s })}>
                            {s}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="cp-field" style={{ marginTop: 4 }}>
                    <label>Message</label>
                    <textarea name="message" placeholder="Tell us about your goals…" value={form.message} onChange={handleChange} required />
                  </div>

                  <div className="cp-submit-row">
                    <span className="cp-submit-note">We respect your privacy.</span>
                    <button type="submit" className="cp-submit-btn" disabled={submitting}>
                      {submitting ? "Sending..." : "Send Message"}
                      <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12h12m0 0-4-4m4 4-4 4" />
                      </svg>
                    </button>
                  </div>
                  {error ? <p style={{ marginTop: 10, color: "#e8352a", fontSize: "0.8rem" }}>{error}</p> : null}

                </form>
              </>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
