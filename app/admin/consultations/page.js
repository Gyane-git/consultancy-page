"use client";

import { useEffect, useState } from "react";

export default function AdminConsultationsPage() {
  const [consultations, setConsultations] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [notice, setNotice] = useState("");

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

  useEffect(() => {
    async function init() {
      await loadData();
    }

    init();
  }, []);

  async function updateConsultationStatus(id, status) {
    setNotice("");
    try {
      const res = await fetch("/api/consultations", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const data = await res.json();
      if (!res.ok || !data?.success) throw new Error(data?.error || "Failed to update status");
      setNotice("Consultation status updated.");
      await loadData();
    } catch (error) {
      console.error(error);
      setNotice(error instanceof Error ? error.message : "Failed to update status");
    }
  }

  async function deleteConsultation(id) {
    if (!window.confirm("Delete this consultation request?")) return;
    setNotice("");
    try {
      const res = await fetch(`/api/consultations?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data?.success) throw new Error(data?.error || "Failed to delete consultation");
      setNotice("Consultation request deleted.");
      await loadData();
    } catch (error) {
      console.error(error);
      setNotice(error instanceof Error ? error.message : "Failed to delete consultation");
    }
  }

  return (
    <div className="p-6 space-y-6 text-gray-600">
      <div>
        <h1 className="text-2xl font-semibold mb-1">Consultation & Contact Requests</h1>
        <p className="text-sm text-gray-600">Stored form submissions from free consultation and contact pages.</p>
        {notice ? <p className="mt-2 text-sm text-gray-700">{notice}</p> : null}
      </div>

      <section className="bg-white border rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-3">Free Consultation Requests ({consultations.length})</h2>
        <div className="space-y-3">
          {consultations.map((item) => (
            <div key={item.id} className="border rounded-lg p-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{item.name} ({item.email})</p>
                  <p className="text-sm text-gray-600">Phone: {item.phone || "-"} | Destination: {item.studyDestination || "-"} | Type: {item.consultationType || "-"}</p>
                  <p className="text-sm text-gray-600">Preferred: {item.preferredDate || "-"} {item.preferredTime || ""}</p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    className="border rounded px-2 py-1 text-sm"
                    value={item.status || "new"}
                    onChange={(e) => updateConsultationStatus(item.id, e.target.value)}
                  >
                    <option value="new">new</option>
                    <option value="in_progress">in_progress</option>
                    <option value="completed">completed</option>
                    <option value="cancelled">cancelled</option>
                  </select>
                  <button className="text-sm text-red-600" onClick={() => deleteConsultation(item.id)}>Delete</button>
                </div>
              </div>
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
