"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const emptyForm = {
  id: null,
  slug: "",
  name: "",
  shortText: "",
  bannerTitle: "",
  bodyImage: "",
  whyStudy: "",
  topUniversities: "",
  eligibilityProcess: "",
  costScholarships: "",
  applicationProcess: "",
  afterReaching: "",
  isActive: true,
};

export default function AdminDestinationsPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [notice, setNotice] = useState("");

  async function loadData() {
    const res = await fetch("/api/destination", { cache: "no-store" });
    const data = await res.json();
    if (data?.success) setItems(Array.isArray(data.destinations) ? data.destinations : []);
  }

  useEffect(() => {
    Promise.resolve().then(loadData);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setNotice("");
    const method = form.id ? "PUT" : "POST";
    const res = await fetch("/api/destination", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok || !data?.success) {
      setNotice(data?.error || "Failed to save destination");
      toast.error(data?.error || "Failed to save destination");
      return;
    }
    setNotice("Destination saved.");
    toast.success("Destination saved.");
    setForm(emptyForm);
    loadData();
  }

  async function handleDelete(id) {
    if (!confirm("Delete this destination?")) return;
    const res = await fetch(`/api/destination?id=${id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok || !data?.success) {
      setNotice(data?.error || "Failed to delete destination");
      toast.error(data?.error || "Failed to delete destination");
      return;
    }
    setNotice("Destination deleted.");
    toast.success("Destination deleted.");
    loadData();
  }

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 text-gray-600">
      <div>
        <h1 className="text-2xl font-semibold mb-1 text-[#c0392b]">Destination Content</h1>
        <p className="text-sm text-gray-600 mb-4">Manage dynamic destination details with banner, body image, and section-wise content.</p>

        <form onSubmit={handleSubmit} className="space-y-3 bg-white border rounded-xl p-4 text-gray-600">
          <input className="w-full border rounded-lg px-3 py-2" placeholder="Slug (example: australia)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
          <input className="w-full border rounded-lg px-3 py-2" placeholder="Destination Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <textarea className="w-full border rounded-lg px-3 py-2 min-h-20" placeholder="Short Text" value={form.shortText} onChange={(e) => setForm({ ...form, shortText: e.target.value })} />
          <input className="w-full border rounded-lg px-3 py-2" placeholder="Banner Title (e.g. Study in UK)" value={form.bannerTitle} onChange={(e) => setForm({ ...form, bannerTitle: e.target.value })} />
          <textarea className="w-full border rounded-lg px-3 py-2 min-h-20" placeholder="Body Image URL or base64 from gallery" value={form.bodyImage} onChange={(e) => setForm({ ...form, bodyImage: e.target.value })} />
          <textarea className="w-full border rounded-lg px-3 py-2 min-h-28" placeholder="1. Why Study in Country" value={form.whyStudy} onChange={(e) => setForm({ ...form, whyStudy: e.target.value })} />
          <textarea className="w-full border rounded-lg px-3 py-2 min-h-28" placeholder="2. Top Universities and Courses" value={form.topUniversities} onChange={(e) => setForm({ ...form, topUniversities: e.target.value })} />
          <textarea className="w-full border rounded-lg px-3 py-2 min-h-28" placeholder="3. Eligibility & Process" value={form.eligibilityProcess} onChange={(e) => setForm({ ...form, eligibilityProcess: e.target.value })} />
          <textarea className="w-full border rounded-lg px-3 py-2 min-h-28" placeholder="4. Cost & Scholarships" value={form.costScholarships} onChange={(e) => setForm({ ...form, costScholarships: e.target.value })} />
          <textarea className="w-full border rounded-lg px-3 py-2 min-h-28" placeholder="5. Application Process" value={form.applicationProcess} onChange={(e) => setForm({ ...form, applicationProcess: e.target.value })} />
          <textarea className="w-full border rounded-lg px-3 py-2 min-h-28" placeholder="6. After Reaching Country" value={form.afterReaching} onChange={(e) => setForm({ ...form, afterReaching: e.target.value })} />

          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
            Active
          </label>

          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium">{form.id ? "Update" : "Add"} Destination</button>
            {form.id ? <button type="button" className="px-4 py-2 rounded-lg border" onClick={() => setForm(emptyForm)}>Cancel Edit</button> : null}
          </div>
        </form>

        {notice ? <p className="mt-3 text-sm text-gray-700">{notice}</p> : null}
      </div>

      <div className="bg-white border rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-3">Destination List</h2>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="border rounded-lg p-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  <p className="text-xs text-gray-500">/{item.slug}</p>
                  <p className="text-sm text-gray-600 mt-1">{item.shortText || "No short text"}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.bannerTitle || `Study in ${item.name}`}</p>
                </div>
                <div className="flex gap-2">
                  <button className="text-sm text-blue-600" onClick={() => setForm({ ...item })}>Edit</button>
                  <button className="text-sm text-red-600" onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
          {!items.length ? <p className="text-sm text-gray-500">No destinations yet.</p> : null}
        </div>
      </div>
    </div>
  );
}
