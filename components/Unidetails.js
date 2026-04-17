"use client";

import { useState } from "react";

const tabs = [
  { id: "universities", label: "Top universities" },
  { id: "campus", label: "Campus and community" },
  { id: "life", label: "Life in Australia" },
];

const tabContent = {
  universities: {
    heading: "Top universities",
    paragraphs: [
      "Australia is home to 43 universities and over 170 higher education institutions, offering more than 22,000 programmes to international students. From prestigious research-intensive universities to dynamic young institutions with a strong vocational focus, Australian universities consistently rank among the best globally for student satisfaction, research excellence, and sustainability efforts.",
      "A testament to Australia's academic calibre, its universities have produced 15 Nobel laureates and continue to drive global innovation through extensive research collaborations, international partnerships, and student exchange programmes. Whether pursuing a globally recognised undergraduate degree, a dual qualification, or an applied research programme, studying in Australia equips you with the skills and knowledge needed for success in the global job market.",
    ],
    image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&q=80",
    imageAlt: "International student standing in front of a university building",
  },
  campus: {
    heading: "Campus and community",
    paragraphs: [
      "Australian campuses are vibrant, inclusive environments designed to support students from every corner of the globe. With world-class facilities, dedicated student support services, and a strong culture of collaboration, you'll find everything you need to thrive — both academically and socially.",
      "Student associations, clubs, sports teams, and cultural organisations make it easy to build lasting friendships and create a home away from home. Many universities also offer dedicated international student support centres, housing assistance, and mentorship programmes to ensure a smooth transition.",
    ],
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80",
    imageAlt: "Students enjoying campus life outdoors",
  },
  life: {
    heading: "Life in Australia",
    paragraphs: [
      "Australia consistently ranks among the world's most liveable countries, offering a unique blend of stunning natural landscapes, vibrant cities, and a laid-back yet dynamic culture. From the iconic Sydney Opera House to the Great Barrier Reef, there's always something extraordinary to explore.",
      "With a strong economy, excellent healthcare system, and a welcoming multicultural society, Australia provides an unparalleled quality of life. International students benefit from generous work rights, allowing up to 48 hours of work per fortnight during term — helping you gain real-world experience while you study.",
    ],
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80",
    imageAlt: "Aerial view of Sydney Harbour with Opera House",
  },
};

export default function UniDetails() {
  const [activeTab, setActiveTab] = useState("universities");
  const content = tabContent[activeTab];

  return (
    <section className="uni-details">
      {/* Decorative background shapes */}
      <div className="bg-shape bg-shape--left" aria-hidden="true">
        <svg viewBox="0 0 200 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text
            x="-60"
            y="300"
            fontSize="320"
            fontWeight="900"
            fill="none"
            stroke="#e8265a"
            strokeWidth="2"
            opacity="0.18"
            fontFamily="serif"
          >
            S
          </text>
        </svg>
      </div>
      <div className="bg-shape bg-shape--right" aria-hidden="true">
        <svg viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 160 20 A 120 120 0 0 1 160 260"
            stroke="#1a1464"
            strokeWidth="2.5"
            fill="none"
            opacity="0.15"
          />
          <path
            d="M 200 20 A 160 160 0 0 1 200 280"
            stroke="#1a1464"
            strokeWidth="2.5"
            fill="none"
            opacity="0.1"
          />
        </svg>
      </div>

      {/* Heading */}
      <div className="uni-details__header">
        <h2 className="uni-details__title">
          Why choose Australia
          <br />
          for your studies?
        </h2>
      </div>

      {/* Tab Navigation */}
      <nav className="uni-details__tabs" role="tablist" aria-label="Study in Australia sections">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={`uni-details__tab${activeTab === tab.id ? " uni-details__tab--active" : ""}`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Content Card */}
      <div
        className="uni-details__card"
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        key={activeTab}
      >
        {/* Image */}
        <div className="uni-details__image-wrap">
          <img
            src={content.image}
            alt={content.imageAlt}
            className="uni-details__image"
          />
        </div>

        {/* Text Content */}
        <div className="uni-details__text">
          <h3 className="uni-details__card-heading">{content.heading}</h3>
          {content.paragraphs.map((para, i) => (
            <p key={i} className="uni-details__paragraph">
              {para}
            </p>
          ))}
        </div>
      </div>

      <style jsx>{`
        .uni-details {
          position: relative;
          overflow: hidden;
          background-color: #f5f4f2;
          padding: 60px 24px 80px;
          font-family: "Georgia", serif;
        }

        /* Background decorative shapes */
        .bg-shape {
          position: absolute;
          top: 0;
          pointer-events: none;
          z-index: 0;
        }
        .bg-shape--left {
          left: -20px;
          width: 180px;
          top: -20px;
        }
        .bg-shape--right {
          right: -10px;
          width: 160px;
          top: 30%;
        }

        /* Header */
        .uni-details__header {
          position: relative;
          z-index: 1;
          text-align: center;
          margin-bottom: 36px;
        }

        .uni-details__title {
          font-family: "Georgia", serif;
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 700;
          color: #1a1464;
          line-height: 1.25;
          margin: 0;
          letter-spacing: -0.02em;
        }

        /* Tabs */
        .uni-details__tabs {
          position: relative;
          z-index: 1;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          margin-bottom: 40px;
        }

        .uni-details__tab {
          padding: 10px 22px;
          border-radius: 9999px;
          border: 2px solid #1a1464;
          background: transparent;
          color: #1a1464;
          font-size: 15px;
          font-weight: 500;
          font-family: "Helvetica Neue", Arial, sans-serif;
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease;
          white-space: nowrap;
        }

        .uni-details__tab:hover {
          background: rgba(26, 20, 100, 0.06);
        }

        .uni-details__tab--active {
          background: #1a1464;
          color: #ffffff;
        }

        .uni-details__tab--active:hover {
          background: #1a1464;
        }

        /* Card */
        .uni-details__card {
          position: relative;
          z-index: 1;
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid rgba(26, 20, 100, 0.08);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          overflow: hidden;
          max-width: 1100px;
          margin: 0 auto;
          animation: fadeIn 0.35s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Image */
        .uni-details__image-wrap {
          overflow: hidden;
          max-height: 460px;
          min-height: 280px;
        }

        .uni-details__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }

        .uni-details__image:hover {
          transform: scale(1.03);
        }

        /* Text */
        .uni-details__text {
          padding: 40px 44px 40px 44px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .uni-details__card-heading {
          font-family: "Georgia", serif;
          font-size: clamp(24px, 2.5vw, 34px);
          font-weight: 700;
          color: #1a1464;
          margin: 0 0 20px 0;
          line-height: 1.2;
          letter-spacing: -0.02em;
        }

        .uni-details__paragraph {
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 15px;
          line-height: 1.75;
          color: #3a3a4a;
          margin: 0 0 16px 0;
        }

        .uni-details__paragraph:last-child {
          margin-bottom: 0;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .uni-details {
            padding: 40px 16px 60px;
          }

          .uni-details__card {
            grid-template-columns: 1fr;
          }

          .uni-details__image-wrap {
            max-height: 260px;
            min-height: 200px;
          }

          .uni-details__text {
            padding: 28px 24px;
          }

          .uni-details__tabs {
            gap: 8px;
          }

          .uni-details__tab {
            font-size: 13px;
            padding: 8px 16px;
          }
        }
      `}</style>
    </section>
  );
}