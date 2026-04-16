import React from "react";
import Hero from "../../../components/Hero";
import Card from "../../../components/Card";

const RESOURCES = [
  { title: "Band 7+ Writing Samples", desc: "Annotated essays and templates to learn question approach.", icon: "file-text" },
  { title: "Speaking Cue Cards", desc: "Practice prompts and model answers for cue card mastery.", icon: "mic" },
  { title: "Listening Tips & Transcripts", desc: "Techniques to catch key information and improve accuracy.", icon: "headphones" },
  { title: "Reading Skimming Techniques", desc: "Speed reading drills and question strategies.", icon: "search" },
];

export default function IELTSResources() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Hero
        title="IELTS Resources"
        subtitle="Curated study materials, model answers and quick tips for every section of the exam."
        icon="book"
      />

      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {RESOURCES.map((r) => (
            <Card key={r.title} title={r.title} desc={r.desc} icon={r.icon} />
          ))}
        </div>

        <div className="mt-10 bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-[#1a1a1a]">Study Plan (8 weeks)</h3>
          <ol className="mt-4 list-decimal list-inside text-sm text-gray-700 space-y-2">
            <li>Week 1–2: Diagnostic tests + fundamentals</li>
            <li>Week 3–4: Section techniques and timed practice</li>
            <li>Week 5–6: Targeted weakness correction + mock tests</li>
            <li>Week 7–8: Polishing, speaking clinics and final mocks</li>
          </ol>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow p-5">
            <h4 className="font-semibold">Downloads</h4>
            <ul className="mt-3 text-sm text-gray-600 space-y-2">
              <li><a href="#" className="text-[#c0392b]">Free practice test (PDF)</a></li>
              <li><a href="#" className="text-[#c0392b]">Speaking checklist</a></li>
              <li><a href="#" className="text-[#c0392b]">Writing templates</a></li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <h4 className="font-semibold">Video Lessons</h4>
            <p className="text-sm text-gray-600 mt-2">Short, focused lessons on tricky question types and common mistakes.</p>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <h4 className="font-semibold">FAQs</h4>
            <p className="text-sm text-gray-600 mt-2">Quick answers about test rules, booking and score validity.</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a href="/ielts/mock-tests" className="inline-block bg-[#c0392b] text-white px-6 py-3 rounded-full font-semibold shadow hover:opacity-95">Try a Free Mock Test</a>
        </div>
      </section>
    </main>
  );
}
