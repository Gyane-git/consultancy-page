import React from "react";
import Hero from "../../../components/Hero";
import Card from "../../../components/Card";

const BENEFITS = [
  { title: "World-class Universities", desc: "Top-ranked institutions across research and professional fields.", icon: "star" },
  { title: "Post-study Work Visas", desc: "Opportunities for extended work rights and regional pathways.", icon: "map" },
  { title: "Scholarships & Aid", desc: "Wide scholarship options for international students.", icon: "book" },
];

export default function Australia() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Hero
        title="Study in Australia"
        subtitle="Explore top universities, regional opportunities and tailored visa guidance."
        icon="map"
      />

      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BENEFITS.map((b) => (
            <Card key={b.title} title={b.title} desc={b.desc} icon={b.icon} />
          ))}
        </div>

        <div className="mt-10 bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-semibold">Popular universities</h3>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-700">
            <div>University of Melbourne</div>
            <div>University of Sydney</div>
            <div>ANU</div>
            <div>University of Queensland</div>
            <div>Monash University</div>
            <div>University of Western Australia</div>
            <div>University of Adelaide</div>
            <div>University of Newcastle</div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h4 className="font-semibold">Visa Pathways</h4>
            <p className="text-sm text-gray-600 mt-2">Student visas, Temporary Graduate visas and regional skilled pathways available depending on your course and location.</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h4 className="font-semibold">Living & Work</h4>
            <p className="text-sm text-gray-600 mt-2">Cost of living varies by city; regional locations often offer lower costs and easier post-study work routes.</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a href="/contact" className="inline-block bg-[#c0392b] text-white px-6 py-3 rounded-full font-semibold shadow">Talk to an Australia Expert</a>
        </div>
      </section>
    </main>
  );
}
