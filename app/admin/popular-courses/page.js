"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const emptyForm = {
  id: null,
  slug: "",
  name: "",
  heroTitle: "",
  introText: "",
  whyTitle: "",
  whyDescription: "",
  whyPointsText: "",
  ieltsNote: "",
  ieltsRowsText: "",
  tabOneTitle: "Diploma / Advanced Diploma",
  tabOneDescription: "",
  tabOneDetailsText: "",
  tabOneScopeText: "",
  tabTwoTitle: "Undergraduate Study",
  tabTwoDescription: "",
  tabTwoDetailsText: "",
  tabThreeTitle: "Post Graduation",
  tabThreeDescription: "",
  tabThreeDetailsText: "",
  tabThreeScopeText: "",
  thumbnail: "",
  isActive: true,
  displayOrder: 0,
};

function parseLineItems(text) {
  return String(text || "").split("\n").map((x) => x.trim()).filter(Boolean);
}

function parseKeyValueRows(text) {
  return String(text || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [a, ...rest] = line.split("|");
      return { name: (a || "").trim(), score: rest.join("|").trim() };
    })
    .filter((item) => item.name && item.score);
}

function parseDetailRows(text) {
  return String(text || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [a, ...rest] = line.split("|");
      return { label: (a || "").trim(), value: rest.join("|").trim() };
    })
    .filter((item) => item.label && item.value);
}

export default function AdminPopularCoursesPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    setLoading(true);
    try {
      const res = await fetch("/api/popular-courses?all=1", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok || !data?.success) throw new Error(data?.error || "Failed to fetch courses");
      setItems(Array.isArray(data.courses) ? data.courses : []);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const method = form.id ? "PUT" : "POST";
    const payload = {
      ...form,
      whyPoints: parseLineItems(form.whyPointsText),
      ieltsRows: parseKeyValueRows(form.ieltsRowsText),
      tabOneDetails: parseDetailRows(form.tabOneDetailsText),
      tabOneScope: parseLineItems(form.tabOneScopeText),
      tabTwoDetails: parseDetailRows(form.tabTwoDetailsText),
      tabThreeDetails: parseDetailRows(form.tabThreeDetailsText),
      tabThreeScope: parseLineItems(form.tabThreeScopeText),
    };

    try {
      const res = await fetch("/api/popular-courses", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data?.success) throw new Error(data?.error || "Failed to save course");
      toast.success(form.id ? "Course updated" : "Course created");
      setForm(emptyForm);
      await loadData();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save course");
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this course?")) return;
    try {
      const res = await fetch(`/api/popular-courses?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data?.success) throw new Error(data?.error || "Failed to delete course");
      toast.success("Course deleted");
      await loadData();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete course");
    }
  }

  function editItem(item) {
    setForm({
      id: item.id,
      slug: item.slug || "",
      name: item.name || "",
      heroTitle: item.heroTitle || "",
      introText: item.introText || "",
      whyTitle: item.whyTitle || "",
      whyDescription: item.whyDescription || "",
      whyPointsText: Array.isArray(item.whyPoints) ? item.whyPoints.join("\n") : "",
      ieltsNote: item.ieltsNote || "",
      ieltsRowsText: Array.isArray(item.ieltsRows) ? item.ieltsRows.map((x) => `${x.name} | ${x.score}`).join("\n") : "",
      tabOneTitle: item.tabOneTitle || "",
      tabOneDescription: item.tabOneDescription || "",
      tabOneDetailsText: Array.isArray(item.tabOneDetails) ? item.tabOneDetails.map((x) => `${x.label} | ${x.value}`).join("\n") : "",
      tabOneScopeText: Array.isArray(item.tabOneScope) ? item.tabOneScope.join("\n") : "",
      tabTwoTitle: item.tabTwoTitle || "",
      tabTwoDescription: item.tabTwoDescription || "",
      tabTwoDetailsText: Array.isArray(item.tabTwoDetails) ? item.tabTwoDetails.map((x) => `${x.label} | ${x.value}`).join("\n") : "",
      tabThreeTitle: item.tabThreeTitle || "Post Graduation",
      tabThreeDescription: item.tabThreeDescription || "",
      tabThreeDetailsText: Array.isArray(item.tabThreeDetails) ? item.tabThreeDetails.map((x) => `${x.label} | ${x.value}`).join("\n") : "",
      tabThreeScopeText: Array.isArray(item.tabThreeScope) ? item.tabThreeScope.join("\n") : "",
      thumbnail: item.thumbnail || "",
      isActive: item.isActive !== false,
      displayOrder: Number(item.displayOrder || 0),
    });
  }

  return (
    <div className="p-6 grid grid-cols-1 xl:grid-cols-2 gap-6 text-gray-700">
      <section className="bg-white border rounded-xl p-5">
        <h1 className="text-2xl font-semibold mb-1">Popular Course Content</h1>
        <p className="text-sm text-gray-600 mb-5">Manage dynamic course pages and header dropdown.</p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input className="w-full border rounded-lg px-3 py-2" placeholder="Slug" value={form.slug} onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))} required />
            <input className="w-full border rounded-lg px-3 py-2" placeholder="Course Name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} required />
          </div>
          <input className="w-full border rounded-lg px-3 py-2" placeholder="Hero Title" value={form.heroTitle} onChange={(e) => setForm((p) => ({ ...p, heroTitle: e.target.value }))} required />
          <textarea className="w-full border rounded-lg px-3 py-2 min-h-24" placeholder="Intro Text (multi-line)" value={form.introText} onChange={(e) => setForm((p) => ({ ...p, introText: e.target.value }))} required />
          <input className="w-full border rounded-lg px-3 py-2" placeholder="Why Section Title" value={form.whyTitle} onChange={(e) => setForm((p) => ({ ...p, whyTitle: e.target.value }))} required />
          <textarea className="w-full border rounded-lg px-3 py-2 min-h-20" placeholder="Why Section Description" value={form.whyDescription} onChange={(e) => setForm((p) => ({ ...p, whyDescription: e.target.value }))} />
          <textarea className="w-full border rounded-lg px-3 py-2 min-h-20" placeholder="Why Points (one point per line)" value={form.whyPointsText} onChange={(e) => setForm((p) => ({ ...p, whyPointsText: e.target.value }))} />
          <textarea className="w-full border rounded-lg px-3 py-2 min-h-16" placeholder="IELTS Note" value={form.ieltsNote} onChange={(e) => setForm((p) => ({ ...p, ieltsNote: e.target.value }))} />
          <textarea className="w-full border rounded-lg px-3 py-2 min-h-20" placeholder="IELTS Rows (University | Score per line)" value={form.ieltsRowsText} onChange={(e) => setForm((p) => ({ ...p, ieltsRowsText: e.target.value }))} />
          <input className="w-full border rounded-lg px-3 py-2" placeholder="Tab 1 Title" value={form.tabOneTitle} onChange={(e) => setForm((p) => ({ ...p, tabOneTitle: e.target.value }))} required />
          <textarea className="w-full border rounded-lg px-3 py-2 min-h-20" placeholder="Tab 1 Description" value={form.tabOneDescription} onChange={(e) => setForm((p) => ({ ...p, tabOneDescription: e.target.value }))} />
          <textarea className="w-full border rounded-lg px-3 py-2 min-h-20" placeholder="Tab 1 Detail cards (Label | Value per line)" value={form.tabOneDetailsText} onChange={(e) => setForm((p) => ({ ...p, tabOneDetailsText: e.target.value }))} />
          <textarea className="w-full border rounded-lg px-3 py-2 min-h-20" placeholder="Tab 1 Scope tags (one per line)" value={form.tabOneScopeText} onChange={(e) => setForm((p) => ({ ...p, tabOneScopeText: e.target.value }))} />
          <input className="w-full border rounded-lg px-3 py-2" placeholder="Tab 2 Title" value={form.tabTwoTitle} onChange={(e) => setForm((p) => ({ ...p, tabTwoTitle: e.target.value }))} />
          <textarea className="w-full border rounded-lg px-3 py-2 min-h-20" placeholder="Tab 2 Description" value={form.tabTwoDescription} onChange={(e) => setForm((p) => ({ ...p, tabTwoDescription: e.target.value }))} />
          <textarea className="w-full border rounded-lg px-3 py-2 min-h-20" placeholder="Tab 2 Detail cards (Label | Value per line)" value={form.tabTwoDetailsText} onChange={(e) => setForm((p) => ({ ...p, tabTwoDetailsText: e.target.value }))} />
          <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4 space-y-3">
            <div>
              <h3 className="text-sm font-semibold text-emerald-900">Tab 3 · Post Graduation</h3>
              <p className="text-xs text-emerald-700">Add postgraduate content using the same detail card and scope format as Tab 1.</p>
            </div>
            <input className="w-full border rounded-lg px-3 py-2" placeholder="Tab 3 Title" value={form.tabThreeTitle} onChange={(e) => setForm((p) => ({ ...p, tabThreeTitle: e.target.value }))} />
            <textarea className="w-full border rounded-lg px-3 py-2 min-h-20" placeholder="Tab 3 Description" value={form.tabThreeDescription} onChange={(e) => setForm((p) => ({ ...p, tabThreeDescription: e.target.value }))} />
            <textarea className="w-full border rounded-lg px-3 py-2 min-h-20" placeholder="Tab 3 Detail cards (Label | Value per line)" value={form.tabThreeDetailsText} onChange={(e) => setForm((p) => ({ ...p, tabThreeDetailsText: e.target.value }))} />
            <textarea className="w-full border rounded-lg px-3 py-2 min-h-20" placeholder="Tab 3 Scope tags (one per line)" value={form.tabThreeScopeText} onChange={(e) => setForm((p) => ({ ...p, tabThreeScopeText: e.target.value }))} />
          </div>
          <input className="w-full border rounded-lg px-3 py-2" placeholder="Thumbnail URL" value={form.thumbnail} onChange={(e) => setForm((p) => ({ ...p, thumbnail: e.target.value }))} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input className="w-full border rounded-lg px-3 py-2" type="number" placeholder="Display Order" value={form.displayOrder} onChange={(e) => setForm((p) => ({ ...p, displayOrder: Number(e.target.value) || 0 }))} />
            <label className="flex items-center gap-2 border rounded-lg px-3 py-2 text-sm"><input type="checkbox" checked={form.isActive} onChange={(e) => setForm((p) => ({ ...p, isActive: e.target.checked }))} />Active</label>
          </div>
          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium">{form.id ? "Update Course" : "Add Course"}</button>
            <button type="button" className="px-4 py-2 rounded-lg border" onClick={() => setForm(emptyForm)}>Reset</button>
          </div>
        </form>
      </section>

      <section className="bg-white border rounded-xl p-5">
        <h2 className="text-lg font-semibold mb-3">Courses</h2>
        {loading ? <p className="text-sm text-gray-600">Loading courses...</p> : (
          <div className="space-y-3 max-h-[78vh] overflow-auto pr-1">
            {items.map((item) => (
              <article key={item.id} className="border rounded-lg p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-600">/{item.slug} · Order {item.displayOrder}</p>
                    <p className="text-xs text-gray-500">{item.isActive ? "Active" : "Inactive"}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button className="text-sm text-blue-600" onClick={() => editItem(item)}>Edit</button>
                    <button className="text-sm text-red-600" onClick={() => handleDelete(item.id)}>Delete</button>
                  </div>
                </div>
              </article>
            ))}
            {!items.length ? <p className="text-sm text-gray-500">No courses yet.</p> : null}
          </div>
        )}
      </section>
    </div>
  );
}
