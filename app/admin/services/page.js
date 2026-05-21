"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const emptyCard = {
  id: null,
  sortOrder: 0,
  slug: "",
  title: "",
  tagline: "",
  desc: "",
  featuresText: "",
  stat: "",
  statLabel: "",
  color: "#e8352a",
  bg: "#fff0ef",
  isActive: true,
};

export default function AdminServicesPage() {
  const [section, setSection] = useState({
    subtitle: "Our Services",
    title: "Five Ways We Shape Your Future",
    description: "",
    pointsLabel: "5 Core Services",
  });
  const [cards, setCards] = useState([]);
  const [cardForm, setCardForm] = useState(emptyCard);
  const [notice, setNotice] = useState("");

  async function loadData() {
    const res = await fetch("/api/services-page?all=1", { cache: "no-store" });
    const data = await res.json();
    if (!data?.success) return;
    if (data.section) {
      setSection({
        subtitle: data.section.subtitle || "",
        title: data.section.title || "",
        description: data.section.description || "",
        pointsLabel: data.section.pointsLabel || "",
      });
    }
    setCards(Array.isArray(data.services) ? data.services : []);
  }

  useEffect(() => {
    Promise.resolve().then(loadData);
  }, []);

  async function saveSection(e) {
    e.preventDefault();
    const res = await fetch("/api/services-page", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entity: "section", ...section }),
    });
    const data = await res.json();
    if (!res.ok || !data?.success) {
      toast.error(data?.error || "Failed to update section");
      return;
    }
    toast.success("Services section updated.");
  }

  async function saveCard(e) {
    e.preventDefault();
    const method = cardForm.id ? "PUT" : "POST";
    const payload = {
      entity: "card",
      ...cardForm,
      featuresText: cardForm.featuresText,
    };
    const res = await fetch("/api/services-page", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok || !data?.success) {
      setNotice(data?.error || "Failed to save service card");
      toast.error(data?.error || "Failed to save service card");
      return;
    }
    setNotice("Service card saved.");
    toast.success("Service card saved.");
    setCardForm(emptyCard);
    loadData();
  }

  async function removeCard(id) {
    if (!confirm("Delete this service card?")) return;
    const res = await fetch(`/api/services-page?id=${id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok || !data?.success) {
      toast.error(data?.error || "Failed to delete service card");
      return;
    }
    toast.success("Service card deleted.");
    loadData();
  }

  function editCard(item) {
    setCardForm({
      id: item.rowId,
      sortOrder: item.sortOrder ?? 0,
      slug: item.slug || "",
      title: item.title || "",
      tagline: item.tagline || "",
      desc: item.desc || "",
      featuresText: Array.isArray(item.features) ? item.features.join("\n") : "",
      stat: item.stat || "",
      statLabel: item.statLabel || "",
      color: item.color || "#e8352a",
      bg: item.bg || "#fff0ef",
      isActive: item.isActive !== false,
    });
  }

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 text-gray-600">
      <div className="space-y-6">
        <div className="bg-white border rounded-xl p-4">
          <h1 className="text-2xl font-semibold mb-1 text-[#c0392b]">Services Page Content</h1>
          <p className="text-sm text-gray-600 mb-4">Manage subtitle, title, description and points badge.</p>
          <form onSubmit={saveSection} className="space-y-3">
            <input className="w-full border rounded-lg px-3 py-2" placeholder="Subtitle" value={section.subtitle} onChange={(e) => setSection({ ...section, subtitle: e.target.value })} required />
            <input className="w-full border rounded-lg px-3 py-2" placeholder="Title" value={section.title} onChange={(e) => setSection({ ...section, title: e.target.value })} required />
            <textarea className="w-full border rounded-lg px-3 py-2 min-h-24" placeholder="Description" value={section.description} onChange={(e) => setSection({ ...section, description: e.target.value })} required />
            <input className="w-full border rounded-lg px-3 py-2" placeholder="Points Badge Label" value={section.pointsLabel} onChange={(e) => setSection({ ...section, pointsLabel: e.target.value })} required />
            <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium">Update Section</button>
          </form>
        </div>

        <div className="bg-white border rounded-xl p-4">
          <h2 className="text-lg font-semibold mb-3">{cardForm.id ? "Edit Service Card" : "Add Service Card"}</h2>
          <form onSubmit={saveCard} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <input className="w-full border rounded-lg px-3 py-2" placeholder="Sort Order" type="number" value={cardForm.sortOrder} onChange={(e) => setCardForm({ ...cardForm, sortOrder: Number(e.target.value || 0) })} />
              <input className="w-full border rounded-lg px-3 py-2" placeholder="Slug" value={cardForm.slug} onChange={(e) => setCardForm({ ...cardForm, slug: e.target.value })} required />
            </div>
            <input className="w-full border rounded-lg px-3 py-2" placeholder="Title" value={cardForm.title} onChange={(e) => setCardForm({ ...cardForm, title: e.target.value })} required />
            <input className="w-full border rounded-lg px-3 py-2" placeholder="Tagline" value={cardForm.tagline} onChange={(e) => setCardForm({ ...cardForm, tagline: e.target.value })} required />
            <textarea className="w-full border rounded-lg px-3 py-2 min-h-24" placeholder="Description" value={cardForm.desc} onChange={(e) => setCardForm({ ...cardForm, desc: e.target.value })} required />
            <textarea className="w-full border rounded-lg px-3 py-2 min-h-24" placeholder="Features (one per line)" value={cardForm.featuresText} onChange={(e) => setCardForm({ ...cardForm, featuresText: e.target.value })} />
            <div className="grid grid-cols-2 gap-3">
              <input className="w-full border rounded-lg px-3 py-2" placeholder="Stat value" value={cardForm.stat} onChange={(e) => setCardForm({ ...cardForm, stat: e.target.value })} required />
              <input className="w-full border rounded-lg px-3 py-2" placeholder="Stat label" value={cardForm.statLabel} onChange={(e) => setCardForm({ ...cardForm, statLabel: e.target.value })} required />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input className="w-full border rounded-lg px-3 py-2" placeholder="Color (#hex)" value={cardForm.color} onChange={(e) => setCardForm({ ...cardForm, color: e.target.value })} />
              <input className="w-full border rounded-lg px-3 py-2" placeholder="Background (#hex)" value={cardForm.bg} onChange={(e) => setCardForm({ ...cardForm, bg: e.target.value })} />
            </div>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" checked={cardForm.isActive} onChange={(e) => setCardForm({ ...cardForm, isActive: e.target.checked })} />
              Active
            </label>
            <div className="flex gap-2">
              <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium">{cardForm.id ? "Update" : "Add"} Card</button>
              {cardForm.id ? <button type="button" className="px-4 py-2 rounded-lg border" onClick={() => setCardForm(emptyCard)}>Cancel Edit</button> : null}
            </div>
          </form>
          {notice ? <p className="mt-3 text-sm text-gray-700">{notice}</p> : null}
        </div>
      </div>

      <div className="bg-white border rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-3">Service Cards</h2>
        <div className="space-y-3">
          {cards.map((item) => (
            <div key={item.rowId} className="border rounded-lg p-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-gray-900">{item.title}</p>
                  <p className="text-xs text-gray-500">/{item.slug} • Order: {item.sortOrder}</p>
                  <p className="text-sm text-gray-600 mt-1">{item.tagline}</p>
                  <p className="text-xs mt-1" style={{ color: item.isActive ? "#15803d" : "#b91c1c" }}>
                    {item.isActive ? "Active" : "Inactive"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="text-sm text-blue-600" onClick={() => editCard(item)}>Edit</button>
                  <button className="text-sm text-red-600" onClick={() => removeCard(item.rowId)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
          {!cards.length ? <p className="text-sm text-gray-500">No service cards yet.</p> : null}
        </div>
      </div>
    </div>
  );
}
