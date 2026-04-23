"use client";

export default function HeroSection() {
  return (
    <section className="hero">
      {/* Background Image */}
      <div className="hero__bg" aria-hidden="true" />

      {/* Dark overlay for text readability */}
      <div className="hero__overlay" aria-hidden="true" />

      {/* Content */}
      <div className="hero__content">
        <h1 className="hero__title">
          Unlock a world-class
          <br />
          education in Australia
          <br />
          with expert guidance
        </h1>

        <p className="hero__description">
          Australia provides future-forward education, a comfortable lifestyle,
          and strong employment prospects in a diverse, welcoming environment. At
          StudySync, we'll guide you every step of the way to studying in
          Australia – from choosing the right course to building a standout
          application. You're in good hands.
        </p>

        <a href="/free-consultant" className="hero__cta">
          Book free counselling
          <span className="hero__cta-arrow" aria-hidden="true">›</span>
        </a>
      </div>

      {/* Floating chat button */}
      <div className="hero__chat">
        <span className="hero__chat-icon" aria-hidden="true">💬</span>
        <span className="hero__chat-label">Let's Chat</span>
      </div>

     
      <style jsx>{`
        .hero {
          position: relative;
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          font-family: "Georgia", serif;
        }

        /* Background image */
        .hero__bg {
          position: absolute;
          inset: 0;
          background-image: url("https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=1800&q=85");
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
          z-index: 0;
        }

        /* Gradient overlay — darker on left for text contrast, fades right */
        .hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(0, 0, 0, 0.55) 0%,
            rgba(0, 0, 0, 0.35) 50%,
            rgba(0, 0, 0, 0.08) 100%
          );
          z-index: 1;
        }

        /* Content */
        .hero__content {
          position: relative;
          z-index: 2;
          max-width: 620px;
          padding: 80px 60px;
          animation: fadeUp 0.8s ease both;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Title */
        .hero__title {
          font-family: "Georgia", serif;
          font-size: clamp(32px, 4.5vw, 58px);
          font-weight: 700;
          color: #ffffff;
          line-height: 1.18;
          margin: 0 0 28px 0;
          letter-spacing: -0.02em;
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.25);
        }

        /* Description */
        .hero__description {
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: clamp(14px, 1.4vw, 16px);
          line-height: 1.72;
          color: rgba(255, 255, 255, 0.9);
          margin: 0 0 40px 0;
          max-width: 480px;
          text-shadow: 0 1px 6px rgba(0, 0, 0, 0.3);
        }

        /* CTA Button */
        .hero__cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #e8265a;
          color: #ffffff;
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 15px;
          font-weight: 600;
          padding: 14px 28px;
          border-radius: 9999px;
          text-decoration: none;
          transition: background 0.2s ease, transform 0.15s ease;
          box-shadow: 0 4px 20px rgba(232, 38, 90, 0.45);
          letter-spacing: 0.01em;
        }

        .hero__cta:hover {
          background: #c91e4d;
          transform: translateY(-1px);
        }

        .hero__cta:active {
          transform: translateY(0);
        }

        .hero__cta-arrow {
          font-size: 20px;
          line-height: 1;
        }

        /* Floating chat widget — bottom right */
        .hero__chat {
          position: absolute;
          bottom: 28px;
          right: 28px;
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 8px;
          background: #1a1464;
          color: #ffffff;
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 14px;
          font-weight: 500;
          padding: 10px 18px;
          border-radius: 9999px;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
          transition: background 0.2s ease;
        }

        .hero__chat:hover {
          background: #2a2480;
        }

        .hero__chat-icon {
          font-size: 16px;
        }

        /* Floating phone button — above chat */
        .hero__phone {
          position: absolute;
          bottom: 88px;
          right: 28px;
          z-index: 10;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #1a1464;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
          transition: background 0.2s ease, transform 0.15s ease;
        }

        .hero__phone:hover {
          background: #2a2480;
          transform: scale(1.07);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero {
            min-height: 90vh;
          }

          .hero__content {
            padding: 60px 24px;
          }

          .hero__overlay {
            background: linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0.15) 0%,
              rgba(0, 0, 0, 0.55) 40%,
              rgba(0, 0, 0, 0.65) 100%
            );
          }

          .hero__chat {
            bottom: 20px;
            right: 16px;
            font-size: 13px;
            padding: 9px 14px;
          }

          .hero__phone {
            bottom: 76px;
            right: 16px;
            width: 42px;
            height: 42px;
          }
        }
      `}</style>
    </section>
  );
}