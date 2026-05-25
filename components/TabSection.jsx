"use client";

import { useState } from "react";

const tabs = [
  {
    id: 1,
    label: "Why Study in UK",
    badge: { icon: "🌍", text: "#1 destination" },
    title: "Why Study in UK",
    stats: [
      { val: "600K+", label: "International students" },
      { val: "Top 10", label: "Global university rankings" },
      { val: "3 yrs", label: "Average bachelor's duration" },
    ],
    content: (
      <>
        <p className="text-sm text-gray-500 leading-relaxed mb-4">
          The UK hosts over 600,000 international students yearly. With globally
          ranked universities, shorter degree durations, multicultural campuses,
          and strong career pathways, it delivers a world-class education
          experience.
        </p>
        <p className="text-sm font-medium text-gray-700 mb-3">
          UK universities focus on:
        </p>
        <ul className="grid grid-cols-2 gap-x-5 gap-y-2 mb-5">
          {[
            "Practical learning & real-world skills",
            "Research and innovation",
            "Critical thinking & career readiness",
            "International networking",
            "Globally recognised qualifications",
            "Modern teaching methods",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-gray-500">
              <span className="mt-1.5 w-2 h-2 rounded-full bg-[#2b2d8e] flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: 2,
    label: "Top Universities and Courses",
    badge: { icon: "🎓", text: "World-ranked" },
    title: "Top Universities and Courses",
    stats: [
      { val: "150+", label: "Universities" },
      { val: "50K+", label: "Courses available" },
      { val: "4", label: "Top-10 world unis" },
    ],
    content: (
      <>
        <p className="text-sm text-gray-500 leading-relaxed mb-4">
          The UK is home to some of the world's most prestigious universities
          consistently ranking in global top lists across every discipline.
        </p>
        <div className="flex flex-wrap gap-2 mb-5">
          {[
            "University of Oxford",
            "University of Cambridge",
            "Imperial College London",
            "UCL",
            "LSE",
            "University of Edinburgh",
            "King's College London",
            "University of Manchester",
          ].map((uni) => (
            <span
              key={uni}
              className="text-xs border border-gray-200 rounded-full px-3 py-1 text-gray-500"
            >
              {uni}
            </span>
          ))}
        </div>
        <p className="text-sm font-medium text-gray-700 mb-3">Popular fields:</p>
        <ul className="grid grid-cols-2 gap-x-5 gap-y-2">
          {[
            "Business & Management",
            "Engineering & Technology",
            "Law & Social Sciences",
            "Medicine & Health",
            "Arts & Humanities",
            "Computer Science & AI",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-gray-500">
              <span className="mt-1.5 w-2 h-2 rounded-full bg-[#2b2d8e] flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: 3,
    label: "Eligibility & Process",
    badge: { icon: "📋", text: "Requirements" },
    title: "Eligibility & Process",
    stats: null,
    content: (
      <>
        <p className="text-sm text-gray-500 leading-relaxed mb-5">
          International students must meet academic and language requirements set
          by their chosen institution and obtain a valid UK Student Visa.
        </p>
        <div className="flex flex-col gap-4">
          {[
            {
              n: 1,
              title: "Academic qualification",
              desc: "Strong results at A-level equivalent or above for UG; bachelor's degree for PG programmes.",
            },
            {
              n: 2,
              title: "English proficiency",
              desc: "IELTS (typically 6.0–7.5) or TOEFL/PTE accepted by most universities.",
            },
            {
              n: 3,
              title: "Financial proof",
              desc: "Show sufficient funds to cover tuition + living costs for the first year.",
            },
            {
              n: 4,
              title: "Student Visa (Student Route)",
              desc: "Apply after receiving a CAS number from your university; biometric appointment required.",
            },
          ].map((step) => (
            <div key={step.n} className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-[#2b2d8e] text-white flex items-center justify-center text-xs font-medium flex-shrink-0">
                {step.n}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">{step.title}</p>
                <p className="text-sm text-gray-500 mt-0.5">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: 4,
    label: "Cost & Scholarships",
    badge: { icon: "💷", text: "Funding options" },
    title: "Cost & Scholarships",
    stats: [
      { val: "£10K", label: "Min. tuition / year" },
      { val: "£38K", label: "Max. tuition / year" },
      { val: "£12K", label: "Avg. living costs / year" },
    ],
    content: (
      <>
        <p className="text-sm text-gray-500 leading-relaxed mb-4">
          Studying in the UK is a significant investment, but numerous scholarship
          programmes help international students manage costs effectively.
        </p>
        <p className="text-sm font-medium text-gray-700 mb-3">Key scholarships:</p>
        <ul className="grid grid-cols-2 gap-x-5 gap-y-2">
          {[
            "Chevening Scholarship (full funding)",
            "Commonwealth Scholarship",
            "GREAT Scholarships",
            "University-specific awards",
            "British Council grants",
            "Erasmus+ (select countries)",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-gray-500">
              <span className="mt-1.5 w-2 h-2 rounded-full bg-[#2b2d8e] flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: 5,
    label: "Application Process",
    badge: { icon: "📤", text: "Step by step" },
    title: "Application Process",
    stats: null,
    content: (
      <>
        <p className="text-sm text-gray-500 leading-relaxed mb-5">
          Undergraduate applicants go through UCAS; postgraduate students apply
          directly to universities. Plan at least 6–9 months ahead.
        </p>
        <div className="flex flex-col gap-4">
          {[
            { n: 1, title: "Choose course & university", desc: "Research programmes, entry requirements, and campus life." },
            { n: 2, title: "Prepare documents", desc: "Transcripts, SOP, 2–3 recommendation letters, CV, and English scores." },
            { n: 3, title: "Submit application", desc: "Via UCAS (UG) by 31 Jan deadline or directly to university (PG)." },
            { n: 4, title: "Receive offer & CAS", desc: "Accept the offer and receive your Confirmation of Acceptance for Studies number." },
            { n: 5, title: "Apply for Student Visa", desc: "Submit online, pay the IHS surcharge, and attend a biometric appointment." },
          ].map((step) => (
            <div key={step.n} className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-[#2b2d8e] text-white flex items-center justify-center text-xs font-medium flex-shrink-0">
                {step.n}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">{step.title}</p>
                <p className="text-sm text-gray-500 mt-0.5">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: 6,
    label: "After Reaching UK",
    badge: { icon: "✈️", text: "Arrival guide" },
    title: "After Reaching UK",
    stats: [
      { val: "2 yrs", label: "Graduate Route (UG/PG)" },
      { val: "3 yrs", label: "Graduate Route (PhD)" },
      { val: "10 days", label: "BRP collection window" },
    ],
    content: (
      <>
        <p className="text-sm text-gray-500 leading-relaxed mb-5">
          Once you land in the UK, a few important steps must be completed before
          settling into student life.
        </p>
        <div className="flex flex-col gap-4">
          {[
            { n: 1, title: "Collect BRP card", desc: "Biometric Residence Permit must be picked up within 10 days of arrival." },
            { n: 2, title: "University enrolment", desc: "Register in person, get your student ID and activate university systems." },
            { n: 3, title: "Open a bank account", desc: "Monzo, Starling, or HSBC student accounts — you'll need your enrolment letter." },
            { n: 4, title: "Graduate Route visa", desc: "After graduating, stay and work in the UK for up to 2 years (3 for PhD)." },
          ].map((step) => (
            <div key={step.n} className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-[#2b2d8e] text-white flex items-center justify-center text-xs font-medium flex-shrink-0">
                {step.n}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">{step.title}</p>
                <p className="text-sm text-gray-500 mt-0.5">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </>
    ),
  },
];

export default function TabSection() {
  const [activeTab, setActiveTab] = useState(1);
  const current = tabs.find((t) => t.id === activeTab);

  return (
    <section className=" bg-white py-14 px-4">
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-[#2b2d8e]">Study in UK</h2>
        <div className="mx-auto mt-3 w-12 h-1 bg-red-600 rounded-full" />
      </div>

      {/* 7xl container */}
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex border border-gray-200 rounded-2xl overflow-hidden shadow-sm bg-white">

          {/* Sidebar */}
          <aside className="w-72 flex-shrink-0 bg-gray-50 border-r border-gray-200">
            {tabs.map((tab) => {
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-5 py-5 text-left border-b border-gray-200 last:border-b-0 transition-all duration-200 group ${
                    isActive
                      ? "bg-red-600"
                      : "bg-transparent hover:bg-white"
                  }`}
                >
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-white text-red-600"
                        : "bg-[#2b2d8e] text-white group-hover:bg-red-600"
                    }`}
                  >
                    {tab.id}
                  </span>
                  <span
                    className={`text-sm font-medium leading-tight ${
                      isActive ? "text-white" : "text-gray-700"
                    }`}
                  >
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </aside>

          {/* Content panel */}
          {current && (
            <div className="flex-1 min-w-0 p-8">
              {/* Panel header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-red-600">
                  {current.title}
                </h3>
                <span className="flex items-center gap-1.5 bg-[#eef0f8] text-[#2b2d8e] text-xs font-medium px-3 py-1.5 rounded-full">
                  {current.badge.icon} {current.badge.text}
                </span>
              </div>

              {/* Main content */}
              <div>{current.content}</div>

              {/* Stat cards */}
              {current.stats && (
                <div className="grid grid-cols-3 gap-4 mt-6">
                  {current.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-gray-50 border border-gray-200 rounded-xl p-4"
                    >
                      <p className="text-2xl font-semibold text-[#2b2d8e]">
                        {stat.val}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}