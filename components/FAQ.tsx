"use client";
import React, { useState } from 'react';
import { ChevronDown, HelpCircle, BookOpen, GraduationCap, Globe, Calendar, FileText } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      icon: <GraduationCap className="w-6 h-6" />,
      question: "What services do you offer for international students?",
      answer:
        "We provide comprehensive support including university selection, application assistance, visa guidance, scholarship consultation, accommodation help, and pre-departure orientation.",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      question: "Which countries do you specialize in?",
      answer:
        "We specialize in placing students in top universities across the UK, USA, Canada, Australia, New Zealand, Ireland, and several European countries.",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      question: "How long does the application process take?",
      answer:
        "Generally, the complete process from initial consultation to visa approval takes 3-6 months. Starting early provides better options.",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      question: "Do you help with scholarship applications?",
      answer:
        "Yes! We guide you to relevant scholarships and help prepare strong applications, increasing your chances of approval.",
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      question: "What are the intake periods for international programs?",
      answer:
        "Most universities have Fall (September/October) and Spring (January/February) intakes, with some offering Summer intakes.",
    },
    {
      icon: <HelpCircle className="w-6 h-6" />,
      question: "Is your consultation service free?",
      answer:
        "Yes, our initial consultation is completely free. We evaluate your profile and suggest the best options without any cost.",
    },
  ];

  return (
    <section className="relative py-28 bg-gradient-to-b from-blue-50 via-white to-purple-50 overflow-hidden">

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-20 w-96 h-96 bg-blue-300 rounded-full blur-[130px] opacity-40 animate-pulse"></div>
        <div className="absolute bottom-10 left-20 w-96 h-96 bg-purple-300 rounded-full blur-[130px] opacity-40 animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-6">

        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-white shadow-sm border text-blue-700 px-7 py-2 rounded-full text-sm font-semibold tracking-wide mb-5">
            <HelpCircle className="w-4 h-4" />
            FAQs
          </div>
          <h2 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-600 bg-clip-text text-transparent leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Clear answers to help you understand your study abroad journey
          </p>
        </div>

        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-7 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-5 flex-1">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-md">
                    {faq.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {faq.question}
                  </h3>
                </div>

                <ChevronDown
                  className={`w-7 h-7 text-blue-600 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`transition-all duration-300 ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                } overflow-hidden`}
              >
                <div className="px-8 pb-8 pl-24 text-gray-600 text-lg leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4 text-lg">Still need help?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Get in Touch
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
