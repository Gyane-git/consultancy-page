"use client";

import { useEffect, useState } from "react";

export default function AdminConsultationsPage() {
  const [consultations, setConsultations] = useState([]);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    async function loadData() {
      const [consultRes, contactRes] = await Promise.all([
        fetch("/api/consultations", { cache: "no-store" }),
        fetch("/api/inquiries", { cache: "no-store" }),
      ]);
      const consultData = await consultRes.json();
      const contactData = await contactRes.json();
      if (consultData?.success) setConsultations(Array.isArray(consultData.consultations) ? consultData.consultations : []);
      if (contactData?.success) setContacts(Array.isArray(contactData.inquiries) ? contactData.inquiries : []);
    }

    loadData();
  }, []);

  return (
    <div className="p-6 space-y-6 text-gray-600">
      <div>
        <h1 className="text-2xl font-semibold mb-1">Consultation & Contact Requests</h1>
        <p className="text-sm text-gray-600">Stored form submissions from free consultation and contact pages.</p>
      </div>

      <section className="bg-white border rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-3">Free Consultation Requests ({consultations.length})</h2>
        <div className="space-y-3">
          {consultations.map((item) => (
            <div key={item.id} className="border rounded-lg p-3">
              <p className="font-semibold">{item.name} ({item.email})</p>
              <p className="text-sm text-gray-600">Phone: {item.phone || "-"} | Destination: {item.studyDestination || "-"} | Type: {item.consultationType || "-"}</p>
              <p className="text-sm text-gray-600">Preferred: {item.preferredDate || "-"} {item.preferredTime || ""}</p>
            </div>
          ))}
          {!consultations.length ? <p className="text-sm text-gray-500">No consultation requests yet.</p> : null}
        </div>
      </section>

      <section className="bg-white border rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-3">Contact Requests ({contacts.length})</h2>
        <div className="space-y-3">
          {contacts.map((item) => (
            <div key={item.id} className="border rounded-lg p-3">
              <p className="font-semibold">{item.name} ({item.email})</p>
              <p className="text-sm text-gray-600">Phone: {item.phone || "-"} | Subject: {item.subject || "-"}</p>
              <p className="text-sm text-gray-600">Message: {item.message || "-"}</p>
            </div>
          ))}
          {!contacts.length ? <p className="text-sm text-gray-500">No contact requests yet.</p> : null}
        </div>
      </section>
    </div>
  );
}
