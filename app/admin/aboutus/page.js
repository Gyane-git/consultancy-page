"use client";

import { useEffect, useState } from "react";

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

export default function AdminAboutUsPage() {
  const [form, setForm] = useState({ ceoName: "", designation: "", message: "", profileImage: "", linkedinUrl: "" });
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let ignore = false;
    async function loadData() {
      const res = await fetch("/api/about-ceo", { cache: "no-store" });
      const data = await res.json();
      if (!ignore && data?.success && data?.ceo) {
        setForm({
          ceoName: data.ceo.ceoName || "",
          designation: data.ceo.designation || "",
          message: data.ceo.message || "",
          profileImage: data.ceo.profileImage || "",
          linkedinUrl: data.ceo.linkedinUrl || "",
        });
      }
    }
    loadData();
    return () => {
      ignore = true;
    };
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setNotice("");
    try {
      const res = await fetch("/api/about-ceo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data?.success) throw new Error(data?.error || "Failed to save");
      setNotice("CEO profile updated successfully.");
    } catch (error) {
      console.error(error);
      setNotice("Failed to save CEO profile.");
    } finally {
      setSaving(false);
    }
  }

  async function handleImageSelect(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setNotice("Processing image...");
    try {
      const dataUrl = await toCompressedDataUrl(file);
      setForm((prev) => ({ ...prev, profileImage: dataUrl }));
      setNotice("Image selected from gallery.");
    } catch (error) {
      console.error(error);
      setNotice("Failed to process image.");
    }
  }

  return (
    <div className="p-6 max-w-3xl text-gray-600">
      <h1 className="text-2xl font-semibold mb-1">About Us: CEO Profile</h1>
      <p className="text-sm text-gray-600 mb-6">Manage CEO name, designation, message, profile image and LinkedIn URL.</p>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white border rounded-xl p-5">
        <input className="w-full border rounded-lg px-3 py-2" placeholder="CEO Name" value={form.ceoName} onChange={(e) => setForm({ ...form, ceoName: e.target.value })} required />
        <input className="w-full border rounded-lg px-3 py-2" placeholder="Designation" value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} required />
        <div className="space-y-2">
          <input className="w-full border rounded-lg px-3 py-2" placeholder="Profile Image URL or base64" value={form.profileImage} onChange={(e) => setForm({ ...form, profileImage: e.target.value })} />
          <input type="file" accept="image/*" onChange={handleImageSelect} className="w-full border rounded-lg px-3 py-2 text-sm" />
          {form.profileImage ? <img src={form.profileImage} alt="CEO preview" className="h-28 w-28 object-cover rounded-lg border" /> : null}
        </div>
        <input className="w-full border rounded-lg px-3 py-2" placeholder="LinkedIn URL" value={form.linkedinUrl} onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })} />
        <textarea className="w-full border rounded-lg px-3 py-2 min-h-40" placeholder="CEO Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />

        <button type="submit" disabled={saving} className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium">
          {saving ? "Saving..." : "Save CEO Profile"}
        </button>
      </form>

      {notice ? <p className="mt-3 text-sm text-gray-700">{notice}</p> : null}
    </div>
  );
}
