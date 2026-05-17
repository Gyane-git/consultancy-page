"use client";

import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const emptyForm = {
  id: null,
  name: "",
  logo: "",
  country: "",
  courseName: "",
  courseDescription: "",
  supportImage: "",
  videoUrl: "",
  displayOrder: 0,
  isActive: true,
};

function toEmbedUrl(url) {
  const value = String(url || "").trim();
  if (!value) return "";

  try {
    const parsed = new URL(value);
    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.replace("/", "").trim();
      return id ? `https://www.youtube.com/embed/${id}` : "";
    }
    if (parsed.hostname.includes("youtube.com")) {
      const id = parsed.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : "";
    }
    if (parsed.hostname.includes("facebook.com")) {
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(value)}&show_text=false`;
    }
  } catch {
    return "";
  }

  return "";
}

async function toCompressedDataUrl(file) {
  const sourceUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "");
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const img = await new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = sourceUrl;
  });

  const MAX_EDGE = 1400;
  const scale = Math.min(1, MAX_EDGE / Math.max(img.width, img.height));
  const width = Math.max(1, Math.round(img.width * scale));
  const height = Math.max(1, Math.round(img.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return sourceUrl;
  ctx.drawImage(img, 0, 0, width, height);

  let quality = 0.85;
  let output = canvas.toDataURL("image/jpeg", quality);
  const MAX_LENGTH = 1_500_000;
  while (output.length > MAX_LENGTH && quality > 0.45) {
    quality -= 0.1;
    output = canvas.toDataURL("image/jpeg", quality);
  }

  return output;
}

export default function AdminUniversitiesPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [search, setSearch] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");

  async function loadData() {
    setLoading(true);
    try {
      const res = await fetch("/api/university?all=1", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok || !data?.success) throw new Error(data?.error || "Failed to fetch universities");
      setItems(Array.isArray(data.universities) ? data.universities : []);
    } catch (error) {
      console.error(error);
      setNotice(error instanceof Error ? error.message : "Failed to fetch universities");
      toast.error(error instanceof Error ? error.message : "Failed to fetch universities");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    Promise.resolve().then(loadData);
  }, []);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return items;
    return items.filter((u) => [u.name, u.country, u.courseName].some((v) => String(v || "").toLowerCase().includes(term)));
  }, [items, search]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setNotice("");

    try {
      const method = form.id ? "PUT" : "POST";
      const res = await fetch("/api/university", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data?.success) throw new Error(data?.error || "Failed to save university");

      setNotice(form.id ? "University updated." : "University created.");
      toast.success(form.id ? "University updated." : "University created.");
      setForm(emptyForm);
      await loadData();
    } catch (error) {
      console.error(error);
      setNotice(error instanceof Error ? error.message : "Failed to save university");
      toast.error(error instanceof Error ? error.message : "Failed to save university");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this university?")) return;
    setNotice("");
    try {
      const res = await fetch(`/api/university?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data?.success) throw new Error(data?.error || "Failed to delete university");
      setNotice("University deleted.");
      toast.success("University deleted.");
      if (form.id === id) setForm(emptyForm);
      await loadData();
    } catch (error) {
      console.error(error);
      setNotice(error instanceof Error ? error.message : "Failed to delete university");
      toast.error(error instanceof Error ? error.message : "Failed to delete university");
    }
  }

  function startEdit(item) {
    setForm({
      id: item.id,
      name: item.name || "",
      logo: item.logo || "",
      country: item.country || "",
      courseName: item.courseName || "",
      courseDescription: item.courseDescription || "",
      supportImage: item.supportImage || "",
      videoUrl: item.videoUrl || "",
      displayOrder: Number(item.displayOrder || 0),
      isActive: item.isActive !== false,
    });
    setNotice("Editing selected university.");
    toast("Editing selected university.");
  }

  async function handleImagePick(type, e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setNotice("Processing image...");
    try {
      const dataUrl = await toCompressedDataUrl(file);
      setForm((prev) => ({ ...prev, [type]: dataUrl }));
      setNotice(type === "logo" ? "Logo selected from gallery." : "Support image selected from gallery.");
      toast.success(type === "logo" ? "Logo selected from gallery." : "Support image selected from gallery.");
    } catch (error) {
      console.error(error);
      setNotice("Failed to process image.");
      toast.error("Failed to process image.");
    }
  }

  const embedUrl = toEmbedUrl(form.videoUrl);

  return (
    <div className="p-6 grid grid-cols-1 xl:grid-cols-2 gap-6 text-gray-700">
      <section className="bg-white border rounded-xl p-5 shadow-sm">
        <h1 className="text-2xl font-semibold mb-1">Universities</h1>
        <p className="text-sm text-gray-600 mb-5">Manage university, logo, country, course, course description, support image, and video URL.</p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input className="w-full border rounded-lg px-3 py-2" placeholder="University Name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} required />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input className="w-full border rounded-lg px-3 py-2" placeholder="Country" value={form.country} onChange={(e) => setForm((p) => ({ ...p, country: e.target.value }))} />
            <input className="w-full border rounded-lg px-3 py-2" placeholder="Course Name" value={form.courseName} onChange={(e) => setForm((p) => ({ ...p, courseName: e.target.value }))} />
          </div>

          <textarea className="w-full border rounded-lg px-3 py-2 min-h-24" placeholder="Course Description" value={form.courseDescription} onChange={(e) => setForm((p) => ({ ...p, courseDescription: e.target.value }))} />

          <div className="space-y-2">
            <input className="w-full border rounded-lg px-3 py-2" placeholder="Logo URL/base64" value={form.logo} onChange={(e) => setForm((p) => ({ ...p, logo: e.target.value }))} />
            <input type="file" accept="image/*" onChange={(e) => handleImagePick("logo", e)} className="w-full border rounded-lg px-3 py-2 text-sm" />
            {form.logo ? <img src={form.logo} alt="Logo preview" className="h-20 w-40 object-contain rounded border bg-gray-50" /> : null}
          </div>

          <div className="space-y-2">
            <input className="w-full border rounded-lg px-3 py-2" placeholder="Supporting Image URL/base64" value={form.supportImage} onChange={(e) => setForm((p) => ({ ...p, supportImage: e.target.value }))} />
            <input type="file" accept="image/*" onChange={(e) => handleImagePick("supportImage", e)} className="w-full border rounded-lg px-3 py-2 text-sm" />
            {form.supportImage ? <img src={form.supportImage} alt="Support preview" className="h-24 w-full object-cover rounded border" /> : null}
          </div>

          <input className="w-full border rounded-lg px-3 py-2" placeholder="YouTube/Facebook Video URL" value={form.videoUrl} onChange={(e) => setForm((p) => ({ ...p, videoUrl: e.target.value }))} />

          {embedUrl ? (
            <div className="rounded-lg overflow-hidden border">
              <iframe
                title="Video Preview"
                src={embedUrl}
                className="w-full h-52"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          ) : null}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input className="w-full border rounded-lg px-3 py-2" type="number" placeholder="Display Order" value={form.displayOrder} onChange={(e) => setForm((p) => ({ ...p, displayOrder: Number(e.target.value) || 0 }))} />
            <label className="flex items-center gap-2 border rounded-lg px-3 py-2 text-sm text-gray-700">
              <input type="checkbox" checked={form.isActive} onChange={(e) => setForm((p) => ({ ...p, isActive: e.target.checked }))} />
              Active
            </label>
          </div>

          <div className="flex gap-2">
            <button type="submit" disabled={saving} className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium disabled:opacity-50">{saving ? "Saving..." : form.id ? "Update University" : "Add University"}</button>
            <button type="button" className="px-4 py-2 rounded-lg border" onClick={() => setForm(emptyForm)}>Reset</button>
          </div>
        </form>

        {notice ? <p className="mt-3 text-sm text-gray-700">{notice}</p> : null}
      </section>

      <section className="bg-white border rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3 gap-3">
          <h2 className="text-lg font-semibold">University List ({filtered.length})</h2>
          <input className="border rounded-lg px-3 py-2 text-sm w-full max-w-64" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        {loading ? (
          <p className="text-sm text-gray-600">Loading universities...</p>
        ) : !filtered.length ? (
          <p className="text-sm text-gray-600">No universities found.</p>
        ) : (
          <div className="space-y-3 max-h-[72vh] overflow-auto pr-1">
            {filtered.map((item) => (
              <article key={item.id} className="border rounded-lg p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.country || "No country"}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.courseName || "No course"}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs">
                      <span className={`px-2 py-0.5 rounded ${item.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{item.isActive ? "Active" : "Inactive"}</span>
                      <span className="px-2 py-0.5 rounded bg-gray-100">Order: {item.displayOrder ?? 0}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 shrink-0">
                    <button className="text-sm text-blue-600" onClick={() => startEdit(item)}>Edit</button>
                    <button className="text-sm text-red-600" onClick={() => handleDelete(item.id)}>Delete</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
