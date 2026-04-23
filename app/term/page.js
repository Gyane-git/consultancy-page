"use client";

import React from "react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-10">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Terms & Conditions
        </h1>

        <p className="mb-6 text-gray-600">
          By using our website or services, you agree to these terms.
        </p>

        <Section title="1. Using Our Website">
          You agree to provide accurate information and use the website responsibly.
        </Section>

        <Section title="2. Our Services">
          <ul className="list-disc pl-5 space-y-2">
            <li>Study abroad counselling</li>
            <li>University applications</li>
            <li>Visa support</li>
            <li>Career guidance</li>
          </ul>
          <p className="mt-2 text-sm text-gray-500">
            We do not guarantee admission or visa approval.
          </p>
        </Section>

        <Section title="3. Disclaimer">
          All content is provided “as is”. We are not responsible for losses or inaccuracies.
        </Section>

        <Section title="4. Intellectual Property">
          All website content belongs to Study Sync. You cannot copy or reuse without permission.
        </Section>

        <Section title="5. External Links">
          We are not responsible for third-party websites.
        </Section>

        <Section title="6. Privacy">
          Your data is handled according to our Privacy Policy.
        </Section>

        <Section title="7. Limitation of Liability">
          We are not liable for decisions made by universities or immigration authorities.
        </Section>

        <Section title="8. Changes to Terms">
          We may update these terms anytime without notice.
        </Section>

        <Section title="9. Governing Law">
          Governed by the laws of Nepal. Jurisdiction: Kathmandu courts.
        </Section>

        <Section title="10. Contact">
          Study Sync Private Limited <br />
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