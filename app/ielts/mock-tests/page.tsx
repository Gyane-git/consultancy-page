import React from "react";
import Hero from "../../../components/Hero";
import Card from "../../../components/Card";

const TESTS = [
  { title: "Full Mock Test (Academic)", desc: "Complete 4-skills mock under timed conditions with automated scoring.", icon: "clock" },
  { title: "Writing Focus Test", desc: "Submit essays for expert correction and band prediction.", icon: "file-text" },
  { title: "Speaking Clinic (1:1)", desc: "Live speaking assessment with recorded feedback and improvement plan.", icon: "mic" },
  { title: "Listening & Reading Drill", desc: "Targeted practice sets with answer explanations and strategies.", icon: "headphones" },
];

export default function IELTSMockTests() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Hero
        title="IELTS Mock Tests"
        subtitle="Timed, realistic practice with detailed feedback to identify weaknesses and boost confidence."
        icon="clock"
      />

      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTS.map((t) => (
            <Card key={t.title} title={t.title} desc={t.desc} icon={t.icon} />
          ))}
        </div>

        <div className="mt-10 bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-[#1a1a1a]">What you get</h3>
          <ul className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <li className="text-sm text-gray-600">Detailed section-wise score breakdown</li>
            <li className="text-sm text-gray-600">Personalised improvement plan</li>
            <li className="text-sm text-gray-600">Sample answers and model responses</li>
          </ul>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow p-5">
            <h4 className="font-semibold">Turnaround</h4>
            <p className="text-sm text-gray-600 mt-2">Writing: 48 hours. Speaking: 24 hours. Full mocks: instant + expert review.</p>
          </div>
          <div className="bg-white rounded-xl shadow p-5">
            <h4 className="font-semibold">Reporting</h4>
            <p className="text-sm text-gray-600 mt-2">Receive a downloadable PDF report with band estimates and task-level insights.</p>
          </div>
          <div className="bg-white rounded-xl shadow p-5">
            <h4 className="font-semibold">Packages</h4>
            <p className="text-sm text-gray-600 mt-2">Single test, 5-test pack, and monthly unlimited options available.</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a href="/ielts/courses" className="inline-block bg-[#c0392b] text-white px-6 py-3 rounded-full font-semibold shadow hover:opacity-95">Book a Mock Test</a>
        </div>
      </section>
    </main>
  );
}
