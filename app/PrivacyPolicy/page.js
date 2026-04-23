"use client";

import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-10">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Privacy Policy
        </h1>

        <p className="mb-6 text-gray-600">
          Welcome to <strong>Study Sync Private Limited</strong>. Your privacy is important to us.
          This policy explains how we collect, use, and protect your personal information.
        </p>

        {/* SECTION */}
        <Section title="1. Who We Are">
          Study Sync Private Limited is an educational consultancy based in Kathmandu, Nepal,
          helping students apply to universities abroad with admissions, visa support,
          and career counselling.
        </Section>

        <Section title="2. Information We Collect">
          <ul className="list-disc pl-5 space-y-2">
            <li>Personal info: Name, email, phone, DOB, passport, address</li>
            <li>Educational docs: Transcripts, IELTS/PTE, SOP, recommendations</li>
            <li>Financial info: Bank statements, sponsor details</li>
            <li>Usage data: Cookies, analytics, browsing behavior</li>
          </ul>
        </Section>

        <Section title="3. How We Use Your Information">
          <ul className="list-disc pl-5 space-y-2">
            <li>Assess eligibility for study abroad</li>
            <li>Support admission & visa processes</li>
            <li>Communicate with institutions</li>
            <li>Improve services & website</li>
          </ul>
        </Section>

        <Section title="4. Data Sharing">
          We may share data with universities, visa authorities, and trusted service providers.
          We never sell your personal data.
        </Section>

        <Section title="5. Data Security">
          We use appropriate measures to protect your data, but no system is 100% secure.
        </Section>

        <Section title="6. Your Rights">
          <ul className="list-disc pl-5 space-y-2">
            <li>Access your data</li>
            <li>Request corrections</li>
            <li>Withdraw consent</li>
            <li>Request deletion</li>
          </ul>
        </Section>

        <Section title="7. Cookies & Analytics">
          We use cookies and tools like Google Analytics. You can disable cookies in your browser.
        </Section>

        <Section title="8. External Links">
          We are not responsible for third-party websites linked from our platform.
        </Section>

        <Section title="9. Contact Us">
          📞 015924164 <br />
          📧 admin@studysync.com.np
        </Section>

      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2 text-blue-600">{title}</h2>
      <div className="text-gray-700 leading-relaxed">{children}</div>
    </div>
  );
}