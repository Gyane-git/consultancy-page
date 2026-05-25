"use client";

import { useEffect, useMemo, useState } from "react";

type Destination = {
  id: number;
  slug: string;
  name: string;
  shortText?: string | null;
  bannerTitle?: string | null;
  bodyImage?: string | null;
  whyStudy?: string | null;
  topUniversities?: string | null;
  eligibilityProcess?: string | null;
  costScholarships?: string | null;
  applicationProcess?: string | null;
  afterReaching?: string | null;
  faqQuestion?: string | null;
  faqDescription?: string | null;
  faqItems?: Array<{ question?: string; answer?: string }>;
};

export default function DestinationDetailPage({ slug }: { slug: string }) {
  const [destination, setDestination] = useState<Destination | null>(null);
  const [allDestinations, setAllDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    let ignore = false;

    async function loadDestination() {
      try {
        const [destinationRes, allDestinationsRes] = await Promise.all([
          fetch(`/api/destination?slug=${encodeURIComponent(slug)}`, {
            cache: "no-store",
          }),
          fetch("/api/destination", { cache: "no-store" }),
        ]);

        const destinationData = await destinationRes.json();
        const allData = await allDestinationsRes.json();

        if (!ignore && destinationData?.success) {
          setDestination(destinationData.destination ?? null);
        }

        if (!ignore && allData?.success) {
          setAllDestinations(
            Array.isArray(allData.destinations)
              ? allData.destinations
              : []
          );
        }
      } catch (error) {
        console.error("Failed to load destination", error);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadDestination();

    return () => {
      ignore = true;
    };
  }, [slug]);

  const destinationName =
    destination?.name ||
    slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const bannerTitle =
    destination?.bannerTitle?.trim() ||
    `Study in ${destinationName}`;

  const shortText =
    destination?.shortText?.trim() ||
    "Plan your global education journey with complete guidance from our experts.";

  const tabs = useMemo(
    () => [
      {
        id: 1,
        label: "Why Study",
        title: `Why Study in ${destinationName}`,
        body: destination?.whyStudy || "",
      },
      {
        id: 2,
        label: "Top Universities",
        title: "Top Universities and Courses",
        body: destination?.topUniversities || "",
      },
      {
        id: 3,
        label: "Eligibility",
        title: "Eligibility & Process",
        body: destination?.eligibilityProcess || "",
      },
      {
        id: 4,
        label: "Cost",
        title: "Cost & Scholarships",
        body: destination?.costScholarships || "",
      },
      {
        id: 5,
        label: "Application",
        title: "Application Process",
        body: destination?.applicationProcess || "",
      },
      {
        id: 6,
        label: "After Arrival",
        title: `After Reaching ${destinationName}`,
        body: destination?.afterReaching || "",
      },
      {
        id: 7,
        label: "FAQ",
        title: "Frequently Asked Questions",
        
      },
    ],
    [destination, destinationName]
  );

  const current =
    tabs.find((tab) => tab.id === activeTab) || tabs[0];

  return (
    <main className="min-h-screen bg-white text-gray-700">
      <style>{`
        .dest-wrap {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 16px 48px;
        }

        .dest-hero {
          margin: 22px auto 24px;
          border-radius: 22px;
          padding: 28px 20px;
          background: linear-gradient(135deg, #fff4f3, #f8fbff);
          border: 1px solid #f0f0f6;
        }

        .dest-kicker {
          font-size: 12px;
          letter-spacing: .12em;
          color: #e8352a;
          font-weight: 700;
          text-transform: uppercase;
        }

        .dest-title {
          font-size: clamp(30px, 4vw, 48px);
          line-height: 1.12;
          color: #1f2438;
          font-weight: 800;
          margin-top: 6px;
        }

        .dest-sub {
          margin-top: 10px;
          max-width: 760px;
          color: #5d6076;
          line-height: 1.7;
        }

        .dest-body-image {
          width: 100%;
          margin-top: 18px;
          border-radius: 14px;
          border: 1px solid #ececf4;
          max-height: 380px;
          object-fit: cover;
          display: block;
        }

        .dest-shell {
          border: 1px solid #ececf4;
          border-radius: 20px;
          overflow: hidden;
          background: #fff;
          box-shadow: 0 8px 28px rgba(27,29,46,0.06);
        }

        .dest-grid {
          display: flex;
          min-height: 560px;
        }

        .dest-sidebar {
          width: 320px;
          background: #fbfbfe;
          border-right: 1px solid #ececf4;
        }

        .dest-btn {
          width: 100%;
          border: 0;
          background: transparent;
          cursor: pointer;
          text-align: left;
          padding: 16px 18px;
          border-bottom: 1px solid #efeff7;
          display: flex;
          align-items: center;
          gap: 12px;
          color: #4f5268;
          font-weight: 600;
          transition: .2s ease;
        }

        .dest-btn:hover {
          background: #fff;
        }

        .dest-btn.active {
          background: #e8352a;
          color: #fff;
        }

        .dest-num {
          width: 30px;
          height: 30px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          background: #2b2d8e;
          color: #fff;
        }

        .dest-btn.active .dest-num {
          background: #fff;
          color: #e8352a;
        }

        .dest-content {
          flex: 1;
          padding: 26px 28px;
        }

        .dest-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 14px;
        }

        .dest-head h2 {
          color: #e8352a;
          font-size: clamp(22px, 3vw, 30px);
          line-height: 1.2;
        }

        .dest-badge {
          background: #eef1fa;
          color: #2b2d8e;
          border-radius: 999px;
          padding: 6px 12px;
          font-size: 12px;
          font-weight: 700;
        }

        .dest-copy {
          color: #5d6076;
          line-height: 1.9;
          white-space: pre-line;
          font-size: 17px;
        }

        .dest-other {
          margin-top: 24px;
        }

        .dest-other h3 {
          font-size: 14px;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: #7a7c90;
          margin-bottom: 10px;
        }

        .dest-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .dest-chip {
          border: 1px solid #e3e5f2;
          border-radius: 999px;
          padding: 7px 12px;
          color: #4f5268;
          font-size: 13px;
          text-decoration: none;
        }

        .dest-chip:hover {
          border-color: #2b2d8e;
          color: #2b2d8e;
        }

        @media (max-width: 980px) {
          .dest-grid {
            flex-direction: column;
          }

          .dest-sidebar {
            width: 100%;
            border-right: 0;
            border-bottom: 1px solid #ececf4;
          }
        }

        @media (max-width: 720px) {
          .dest-content {
            padding: 18px 16px;
          }

          .dest-head {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>

      <div className="dest-wrap">
        <section className="dest-hero">
          <p className="dest-kicker">Study Destination</p>

          <h1 className="dest-title">{bannerTitle}</h1>

          <p className="dest-sub">{shortText}</p>

          {destination?.bodyImage ? (
            <img
              src={destination.bodyImage}
              alt={`${destinationName} destination`}
              className="dest-body-image"
            />
          ) : null}
        </section>

        {loading ? (
          <div className="rounded-xl border border-gray-200 p-6 text-sm text-gray-500">
            Loading destination details...
          </div>
        ) : !destination ? (
          <div className="rounded-xl border border-gray-200 p-6 text-sm text-gray-500">
            Destination not found.
          </div>
        ) : (
          <section className="dest-shell">
            <div className="dest-grid">
              <aside className="dest-sidebar">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`dest-btn ${
                      activeTab === tab.id ? "active" : ""
                    }`}
                  >
                    <span className="dest-num">{tab.id}</span>
                    <span>{tab.title}</span>
                  </button>
                ))}
              </aside>

              <div className="dest-content">
                <div className="dest-head">
                  <h2>{current.title}</h2>

                  <span className="dest-badge">
                    {current.label}
                  </span>
                </div>

                <div className="dest-copy">
                  {current.body || ""}
                </div>
                {activeTab === 7 ? (
                  <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
                    {(Array.isArray(destination?.faqItems) ? destination.faqItems : [])
                      .filter((item) => (item?.question || item?.answer))
                      .map((item, index) => (
                        <div key={index} style={{ border: "1px solid #ececf4", borderRadius: 12, padding: "14px 16px", background: "#fbfcff" }}>
                          <p style={{ fontSize: 13, fontWeight: 700, color: "#1f2438", marginBottom: 6 }}>
                            {item.question || `FAQ ${index + 1}`}
                          </p>
                          <p style={{ fontSize: 14, color: "#5d6076", lineHeight: 1.7 }}>
                            {item.answer || "Answer will be added soon."}
                          </p>
                        </div>
                      ))}
                  </div>
                ) : null}

                <div className="dest-other">
                  <h3>Other Destinations</h3>

                  <div className="dest-chips">
                    {allDestinations
                      .filter(
                        (item) =>
                          item.slug.toLowerCase() !==
                          slug.toLowerCase()
                      )
                      .slice(0, 10)
                      .map((item) => (
                        <a
                          key={item.id}
                          href={`/destinations/${item.slug}`}
                          className="dest-chip"
                        >
                          {item.name}
                        </a>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
