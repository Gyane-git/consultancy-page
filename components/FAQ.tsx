
"use client";
import React, { useState } from 'react';
import { ChevronDown, HelpCircle, BookOpen, GraduationCap, Globe, Calendar, FileText } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      icon: <GraduationCap className="w-5 h-5" />,
      question: "What services do you offer for international students?",
      answer: "We provide comprehensive support including university selection, application assistance, visa guidance, scholarship consultation, accommodation help, and pre-departure orientation. Our expert counselors guide you through every step of your study abroad journey."
    },
    {
      icon: <Globe className="w-5 h-5" />,
      question: "Which countries do you specialize in?",
      answer: "We specialize in placing students in top universities across the UK, USA, Canada, Australia, New Zealand, Ireland, and several European countries. Our partnerships with 250+ universities worldwide ensure you have diverse options."
    },
    {
      icon: <FileText className="w-5 h-5" />,
      question: "How long does the application process take?",
      answer: "The timeline varies by country and program. Generally, the complete process from initial consultation to visa approval takes 3-6 months. We recommend starting at least 6-8 months before your intended start date for the best university options."
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      question: "Do you help with scholarship applications?",
      answer: "Yes! We actively search for scholarship opportunities that match your profile and assist with applications. Many of our students receive merit-based scholarships, reducing their overall education costs significantly."
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      question: "What are the intake periods for international programs?",
      answer: "Most universities have two main intakes: Fall (September/October) and Spring (January/February). Some institutions also offer Summer intakes. We help you identify the best intake based on your timeline and course availability."
    },
    {
      icon: <HelpCircle className="w-5 h-5" />,
      question: "Is your consultation service free?",
      answer: "Yes, our initial consultation is completely free. We assess your profile, discuss your goals, and recommend suitable universities at no cost. Our mission is to make quality education accessible to everyone."
    }
  ];

  return (
    <section className="relative py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="relative max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-6">
            <HelpCircle className="w-4 h-4" />
            FAQs
          </div>
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about studying abroad and our services
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
                    {faq.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-800">
                    {faq.question}
                  </h3>
                </div>
                <ChevronDown
                  className={`w-6 h-6 text-blue-600 transition-transform duration-300 flex-shrink-0 ml-4 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-8 pb-6 pl-24">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Get in Touch
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
};

export default FAQ;