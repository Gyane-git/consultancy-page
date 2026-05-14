"use client";

import { useEffect, useMemo, useState } from "react";

const emptyForm = {
  id: null,
  name: "",
  role: "",
  caption: "",
  thumbnail: "",
  videoUrl: "",
  tag: "Student",
  displayOrder: 0,
  isActive: true,
};

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

export default function AdminVideoTestimonialsPage() {
  const [videos, setVideos] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [search, setSearch] = useState("");

  async function loadVideos() {
    setLoading(true);
    try {
      const res = await fetch("/api/video-testimonials?all=1", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok || !data?.success) throw new Error(data?.error || "Failed to fetch video testimonials");
      setVideos(Array.isArray(data.videos) ? data.videos : []);
    } catch (error) {
      console.error(error);
      setNotice(error instanceof Error ? error.message : "Failed to fetch video testimonials");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    Promise.resolve().then(loadVideos);
  }, []);

  const filteredVideos = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return videos;
    return videos.filter((item) => {
      return [item.name, item.role, item.caption, item.tag]
        .map((v) => String(v || "").toLowerCase())
        .some((v) => v.includes(term));
    });
  }, [videos, search]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setNotice("");

    try {
      const method = form.id ? "PUT" : "POST";
      const res = await fetch("/api/video-testimonials", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok || !data?.success) throw new Error(data?.error || "Failed to save video testimonial");

      setNotice(form.id ? "Video testimonial updated." : "Video testimonial created.");
      setForm(emptyForm);
      await loadVideos();
    } catch (error) {
      console.error(error);
      setNotice(error instanceof Error ? error.message : "Failed to save video testimonial");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this video testimonial?")) return;

    setNotice("");
    try {
      const res = await fetch(`/api/video-testimonials?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data?.success) throw new Error(data?.error || "Failed to delete video testimonial");

      setNotice("Video testimonial deleted.");
      if (form.id === id) setForm(emptyForm);
      await loadVideos();
    } catch (error) {
      console.error(error);
      setNotice(error instanceof Error ? error.message : "Failed to delete video testimonial");
    }
  }

  async function handleImageSelect(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setNotice("Processing thumbnail...");

    try {
      const dataUrl = await toCompressedDataUrl(file);
      setForm((prev) => ({ ...prev, thumbnail: dataUrl }));
      setNotice("Thumbnail selected from gallery.");
    } catch (error) {
      console.error(error);
      setNotice("Failed to process thumbnail image.");
    }
  }

  function startEdit(item) {
    setForm({
      id: item.id,
      name: item.name || "",
      role: item.role || "",
      caption: item.caption || "",
      thumbnail: item.thumbnail || "",
      videoUrl: item.videoUrl || "",
      tag: item.tag || "Student",
      displayOrder: Number(item.displayOrder || 0),
      isActive: item.isActive !== false,
    });
    setNotice("Editing selected video testimonial.");
  }

  return (
    <div className="p-6 grid grid-cols-1 xl:grid-cols-2 gap-6 text-gray-600">
      <section className="bg-white border rounded-xl p-5">
        <h1 className="text-2xl font-semibold mb-1">Video Testimonials</h1>
        <p className="text-sm text-gray-600 mb-5">
          Manage fields: name, role, caption, thumbnail (gallery), video URL, tag.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input className="w-full border rounded-lg px-3 py-2" placeholder="Name" value={form.name} onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))} required />
          <input className="w-full border rounded-lg px-3 py-2" placeholder="Role" value={form.role} onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))} />
          <textarea className="w-full border rounded-lg px-3 py-2 min-h-20" placeholder="Caption" value={form.caption} onChange={(e) => setForm((prev) => ({ ...prev, caption: e.target.value }))} />

          <div className="space-y-2">
            <input className="w-full border rounded-lg px-3 py-2" placeholder="Thumbnail URL or base64" value={form.thumbnail} onChange={(e) => setForm((prev) => ({ ...prev, thumbnail: e.target.value }))} />
            <input type="file" accept="image/*" onChange={handleImageSelect} className="w-full border rounded-lg px-3 py-2 text-sm" />
            {form.thumbnail ? <img src={form.thumbnail} alt="Thumbnail preview" className="h-28 w-44 object-cover rounded-lg border" /> : null}
          </div>

          <input className="w-full border rounded-lg px-3 py-2" placeholder="Video URL (YouTube/Facebook)" value={form.videoUrl} onChange={(e) => setForm((prev) => ({ ...prev, videoUrl: e.target.value }))} required />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input className="w-full border rounded-lg px-3 py-2" placeholder="Tag" value={form.tag} onChange={(e) => setForm((prev) => ({ ...prev, tag: e.target.value }))} />
            <input className="w-full border rounded-lg px-3 py-2" type="number" placeholder="Display Order" value={form.displayOrder} onChange={(e) => setForm((prev) => ({ ...prev, displayOrder: Number(e.target.value) || 0 }))} />
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={form.isActive} onChange={(e) => setForm((prev) => ({ ...prev, isActive: e.target.checked }))} />
            Active
          </label>

          <div className="flex gap-2">
            <button type="submit" disabled={saving} className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium disabled:opacity-50">{saving ? "Saving..." : form.id ? "Update Video" : "Add Video"}</button>
            <button type="button" className="px-4 py-2 rounded-lg border" onClick={() => setForm(emptyForm)}>Reset</button>
          </div>
        </form>

        {notice ? <p className="mt-3 text-sm text-gray-700">{notice}</p> : null}
      </section>

      <section className="bg-white border rounded-xl p-5">
        <div className="flex items-center justify-between mb-3 gap-3">
          <h2 className="text-lg font-semibold">All Videos ({filteredVideos.length})</h2>
          <input className="border rounded-lg px-3 py-2 text-sm w-full max-w-64" placeholder="Search name/role/tag" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        {loading ? (
          <p className="text-sm text-gray-600">Loading videos...</p>
        ) : !filteredVideos.length ? (
          <p className="text-sm text-gray-600">No video testimonials found.</p>
        ) : (
          <div className="space-y-3 max-h-[70vh] overflow-auto pr-1">
            {filteredVideos.map((item) => (
              <article key={item.id} className="border rounded-lg p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.role || "No role"}</p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.caption || "No caption"}</p>
                    <p className="text-xs text-blue-600 mt-1 break-all">{item.videoUrl}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs">
                      <span className="px-2 py-0.5 rounded bg-gray-100">{item.tag || "N/A"}</span>
                      <span className="px-2 py-0.5 rounded bg-gray-100">Order: {item.displayOrder ?? 0}</span>
                      <span className={`px-2 py-0.5 rounded ${item.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {item.isActive ? "Active" : "Inactive"}
                      </span>
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
