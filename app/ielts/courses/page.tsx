"use client";

import React from "react";
import { motion } from "framer-motion";
import Hero from "../../../components/Hero";
import Card from "../../../components/Card";
import { CheckCircle, Star, Award, BookOpen } from "lucide-react";

const COURSES = [
  {
    title: "Foundations (Beginner)",
    desc: "4-week starter program focused on fundamentals: listening, reading basics, grammar and vocabulary.",
    icon: <BookOpen className="w-5 h-5" />,
    color: "bg-blue-50",
  },
  {
    title: "Target Band 6–7",
    desc: "8-week structured course with technique drills, timed tests and weekly mock exams.",
    icon: <Star className="w-5 h-5" />,
    color: "bg-yellow-50",
  },
  {
    title: "Advanced Band 7+",
    desc: "12-week intensive with 1:1 coaching, essay feedback and speaking clinics.",
    icon: <Award className="w-5 h-5" />,
    color: "bg-red-50",
  },
];

type Scores = { listening: string; reading: string; writing: string; speaking: string };

export default function IELTSCourses() {
  const [scores, setScores] = React.useState<Scores>({ listening: "", reading: "", writing: "", speaking: "" });

  const calculateBand = (): string | number => {
    const keys: Array<keyof Scores> = ["listening", "reading", "writing", "speaking"];
    const vals = keys.map((k) => Number(scores[k]));
    if (vals.some((v) => isNaN(v))) return "-";
    const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
    return Math.round(avg * 2) / 2; // round to nearest 0.5
  };
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Hero
        title="IELTS Courses & Coaching"
        subtitle="Master the test, not just the language. Real practice, real results, real confidence."
        icon="book"
      />

      {/* Courses */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold text-center mb-10">Choose Your Path</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COURSES.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className={`rounded-2xl p-6 shadow hover:shadow-lg transition ${c.color}`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-white rounded-lg shadow">{c.icon}</div>
                <h3 className="font-semibold text-lg">{c.title}</h3>
              </div>
              <p className="text-gray-600 text-sm">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-14 border-t">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10">Why Choose Us?</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Real exam simulation",
              "Personal mentorship",
              "Flexible class schedule",
              "Weekly mock tests",
              "AI-based performance tracking",
              "Speaking confidence training",
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 p-4 rounded-lg bg-gray-50"
              >
                <CheckCircle className="text-green-500" />
                <span className="text-sm">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-14 bg-gradient-to-r from-red-50 to-white">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6 text-center">
          <div>
            <h3 className="text-3xl font-bold text-[#c0392b]">500+</h3>
            <p className="text-sm text-gray-600">Students Trained</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-[#c0392b]">90%</h3>
            <p className="text-sm text-gray-600">Success Rate</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-[#c0392b]">7.5+</h3>
            <p className="text-sm text-gray-600">Average Band Score</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold text-center mb-10">Pricing Plans</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Foundation", price: "$99" },
            { name: "Target 6–7", price: "$249" },
            { name: "Advanced 7+", price: "$449" },
          ].map((plan, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="border rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition"
            >
              <h4 className="font-semibold text-lg">{plan.name}</h4>
              <p className="text-3xl font-bold mt-3 text-[#c0392b]">{plan.price}</p>
              <ul className="mt-4 text-sm text-gray-600 space-y-2">
                <li>✔ Full course access</li>
                <li>✔ Mock exams</li>
                <li>✔ Feedback sessions</li>
              </ul>
              <button className="mt-6 w-full bg-[#c0392b] text-white py-2 rounded-lg">
                Enroll Now
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Band Score Calculator */}
      <section className="max-w-4xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold text-center mb-8">IELTS Band Score Calculator</h2>

        <div className="bg-white shadow-lg rounded-2xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {(["listening", "reading", "writing", "speaking"] as Array<keyof Scores>).map((key) => (
              <label key={key} className="flex flex-col">
                <span className="text-xs text-gray-500 mb-1">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                <input
                  aria-label={`${key} score`}
                  inputMode="decimal"
                  type="number"
                  step={0.5}
                  min={0}
                  max={9}
                  placeholder={key}
                  value={scores[key]}
                  onChange={(e) => setScores((prev) => ({ ...prev, [key]: e.target.value }))}
                  className="border rounded-lg px-3 py-2 w-full"
                />
              </label>
            ))}
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">Your Estimated Overall Band</p>
            <div className="text-4xl font-bold text-[#c0392b] mt-2">
              {calculateBand()}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-16 bg-[#c0392b] text-white">
        <h2 className="text-2xl font-bold">Ready to Boost Your IELTS Score?</h2>
        <p className="mt-2 text-sm opacity-90">
          Start your journey today with a free trial class.
        </p>
        <a
          href="/contact"
          className="inline-block mt-6 bg-white text-[#c0392b] px-6 py-3 rounded-full font-semibold"
        >
          Book Free Trial
        </a>
      </section>
    </main>
  );
}
