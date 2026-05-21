"use client";

import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const emptyForm = {
  id: null,
  testType: "ielts",
  courseTime: "",
  title: "",
  target: "",
  price: "",
  description: "",
  breakdownText: "",
  displayOrder: 0,
  isActive: true,
};

export default function AdminEngCoursesPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [search, setSearch] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    setLoading(true);
    try {
      const res = await fetch("/api/eng-courses?all=1", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok || !data?.success) throw new Error(data?.error || "Failed to fetch programs");
      setItems(Array.isArray(data.courses) ? data.courses : []);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to fetch programs");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadData(); }, []);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return items;
    return items.filter((x) => [x.testType, x.title, x.target].some((v) => String(v || "").toLowerCase().includes(term)));
  }, [items, search]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const method = form.id ? "PUT" : "POST";
      const payload = {
        ...form,
        breakdown: String(form.breakdownText || "").split("\n").map((x) => x.trim()).filter(Boolean),
      };
      const res = await fetch("/api/eng-courses", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data?.success) throw new Error(data?.error || "Failed to save program");
      toast.success(form.id ? "Program updated" : "Program created");
      setForm(emptyForm);
      await loadData();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save program");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this course program?")) return;
    try {
      const res = await fetch(`/api/eng-courses?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data?.success) throw new Error(data?.error || "Failed to delete program");
      toast.success("Program deleted");
      await loadData();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete program");
    }
  }

  function startEdit(item) {
    setForm({
      id: item.id,
      testType: item.testType || "ielts",
      courseTime: item.courseTime || "",
      title: item.title || "",
      target: item.target || "",
      price: item.price || "",
      description: item.description || "",
      breakdownText: Array.isArray(item.breakdown) ? item.breakdown.join("\n") : "",
      displayOrder: Number(item.displayOrder || 0),
      isActive: item.isActive !== false,
    });
  }

  return (
    <div className="p-6 grid grid-cols-1 xl:grid-cols-2 gap-6 text-gray-700">
      <section className="bg-white border rounded-xl p-5">
        <h1 className="text-2xl font-semibold mb-1">English Test Course Programs</h1>
        <p className="text-sm text-gray-600 mb-5">Dynamic cards for IELTS, PTE and Duolingo pages.</p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <select className="w-full border rounded-lg px-3 py-2" value={form.testType} onChange={(e) => setForm((p) => ({ ...p, testType: e.target.value }))}>
            <option value="ielts">IELTS</option>
            <option value="pte">PTE</option>
            <option value="duolingo">Duolingo</option>
          </select>
          <input className="w-full border rounded-lg px-3 py-2" placeholder="Course Time (e.g. 8 Weeks)" value={form.courseTime} onChange={(e) => setForm((p) => ({ ...p, courseTime: e.target.value }))} />
          <input className="w-full border rounded-lg px-3 py-2" placeholder="Course Title" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} required />
          <input className="w-full border rounded-lg px-3 py-2" placeholder="Target (e.g. Beginner / 90-110)" value={form.target} onChange={(e) => setForm((p) => ({ ...p, target: e.target.value }))} />
          <input className="w-full border rounded-lg px-3 py-2" placeholder="Price" value={form.price} onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))} />
          <textarea className="w-full border rounded-lg px-3 py-2 min-h-20" placeholder="Course Description" value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} />
          <textarea className="w-full border rounded-lg px-3 py-2 min-h-28" placeholder="Course Breakdown (one point per line)" value={form.breakdownText} onChange={(e) => setForm((p) => ({ ...p, breakdownText: e.target.value }))} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input className="w-full border rounded-lg px-3 py-2" type="number" placeholder="Display Order" value={form.displayOrder} onChange={(e) => setForm((p) => ({ ...p, displayOrder: Number(e.target.value) || 0 }))} />
            <label className="flex items-center gap-2 border rounded-lg px-3 py-2 text-sm"><input type="checkbox" checked={form.isActive} onChange={(e) => setForm((p) => ({ ...p, isActive: e.target.checked }))} />Active</label>
          </div>
          <div className="flex gap-2">
            <button type="submit" disabled={saving} className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium disabled:opacity-50">{saving ? "Saving..." : form.id ? "Update Program" : "Add Program"}</button>
            <button type="button" className="px-4 py-2 rounded-lg border" onClick={() => setForm(emptyForm)}>Reset</button>
          </div>
        </form>
      </section>

      <section className="bg-white border rounded-xl p-5">
        <div className="flex items-center justify-between mb-3 gap-3">
          <h2 className="text-lg font-semibold">Programs ({filtered.length})</h2>
          <input className="border rounded-lg px-3 py-2 text-sm w-full max-w-64" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        {loading ? <p className="text-sm text-gray-600">Loading programs...</p> : (
          <div className="space-y-3 max-h-[72vh] overflow-auto pr-1">
            {filtered.map((item) => (
              <article key={item.id} className="border rounded-lg p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.testType?.toUpperCase()} · {item.courseTime || "-"}</p>
                    <p className="text-xs text-gray-500">Target: {item.target || "-"} · Price: {item.price || "-"}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button className="text-sm text-blue-600" onClick={() => startEdit(item)}>Edit</button>
                    <button className="text-sm text-red-600" onClick={() => handleDelete(item.id)}>Delete</button>
                  </div>
                </div>
              </article>
            ))}
            {!filtered.length ? <p className="text-sm text-gray-500">No programs yet.</p> : null}
          </div>
        )}
      </section>
    </div>
  );
}
