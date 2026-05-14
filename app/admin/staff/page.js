"use client";

import { useEffect, useState } from "react";

const emptyForm = { id: null, name: "", designation: "", image: "", socialUrl: "", displayOrder: 0, isActive: true };

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

export default function AdminStaffPage() {
  const [staff, setStaff] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [notice, setNotice] = useState("");

  async function loadStaff() {
    const res = await fetch("/api/staff-profile?all=1", { cache: "no-store" });
    const data = await res.json();
    if (data?.success) setStaff(Array.isArray(data.staff) ? data.staff : []);
  }

  useEffect(() => {
    Promise.resolve().then(loadStaff);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setNotice("");
    const method = form.id ? "PUT" : "POST";
    const res = await fetch("/api/staff-profile", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok || !data?.success) {
      setNotice(data?.error || "Failed to save staff profile");
      return;
    }
    setNotice("Staff profile saved.");
    setForm(emptyForm);
    loadStaff();
  }

  async function handleDelete(id) {
    if (!confirm("Delete this staff profile?")) return;
    const res = await fetch(`/api/staff-profile?id=${id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok || !data?.success) {
      setNotice(data?.error || "Failed to delete staff profile");
      return;
    }
    setNotice("Staff profile deleted.");
    loadStaff();
  }

  async function handleImageSelect(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setNotice("Processing image...");
    try {
      const dataUrl = await toCompressedDataUrl(file);
      setForm((prev) => ({ ...prev, image: dataUrl }));
      setNotice("Image selected from gallery.");
    } catch (error) {
      console.error(error);
      setNotice("Failed to process image.");
    }
  }

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 text-gray-600">
      <div>
        <h1 className="text-2xl font-semibold mb-1">Staff Profiles</h1>
        <p className="text-sm text-gray-600 mb-4">Fields: staff name, image, social media URL, and designation.</p>

        <form onSubmit={handleSubmit} className="space-y-3 bg-white border rounded-xl p-4">
          <input className="w-full border rounded-lg px-3 py-2" placeholder="Staff Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input className="w-full border rounded-lg px-3 py-2" placeholder="Designation" value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} required />
          <input className="w-full border rounded-lg px-3 py-2" placeholder="Image URL or base64" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
          <input type="file" accept="image/*" onChange={handleImageSelect} className="w-full border rounded-lg px-3 py-2 text-sm" />
          {form.image ? <img src={form.image} alt="Staff preview" className="h-24 w-24 object-cover rounded-lg border" /> : null}
          <input className="w-full border rounded-lg px-3 py-2" placeholder="Social Media URL" value={form.socialUrl} onChange={(e) => setForm({ ...form, socialUrl: e.target.value })} />
          <input className="w-full border rounded-lg px-3 py-2" type="number" placeholder="Display Order" value={form.displayOrder} onChange={(e) => setForm({ ...form, displayOrder: Number(e.target.value) || 0 })} />

          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
            Active
          </label>

          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium">{form.id ? "Update" : "Add"} Staff</button>
            {form.id ? (
              <button type="button" className="px-4 py-2 rounded-lg border" onClick={() => setForm(emptyForm)}>Cancel Edit</button>
            ) : null}
          </div>
        </form>

        {notice ? <p className="mt-3 text-sm text-gray-700">{notice}</p> : null}
      </div>

      <div className="bg-white border rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-3">Staff List</h2>
        <div className="space-y-3">
          {staff.map((item) => (
            <div key={item.id} className="border rounded-lg p-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.designation}</p>
                  <p className="text-xs text-gray-500">{item.socialUrl || "No social URL"}</p>
                </div>
                <div className="flex gap-2">
                  <button className="text-sm text-blue-600" onClick={() => setForm({ ...item })}>Edit</button>
                  <button className="text-sm text-red-600" onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
          {!staff.length ? <p className="text-sm text-gray-500">No staff profiles yet.</p> : null}
        </div>
      </div>
    </div>
  );
}
