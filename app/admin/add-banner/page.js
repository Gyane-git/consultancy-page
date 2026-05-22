"use client";
import { useState } from "react";

export default function AddBannerPage() {
  const [bannerName, setBannerName] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function toDataUrl(imageFile) {
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "");
      reader.onerror = reject;
      reader.readAsDataURL(imageFile);
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bannerName || (!file && !imageUrl)) {
      setMsg("Fill banner name and image first.");
      return;
    }

    setLoading(true);
    setMsg("");
    try {
      const finalImage = file ? await toDataUrl(file) : imageUrl;
      const res = await fetch("/api/banner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: bannerName,
          imageUrl: finalImage,
          linkUrl,
          displayOrder,
          isActive,
        }),
      });

      const data = await res.json();
      setMsg(data?.message || data?.error || "Done");

      if (data.success) {
        setBannerName("");
        setLinkUrl("");
        setDisplayOrder(0);
        setIsActive(true);
        setFile(null);
        setImageUrl("");
      }
    } catch (error) {
      console.error(error);
      setMsg("Failed to create banner");
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow">
    //   <h1 className="text-2xl  text-black font-bold mb-4">Add Banner</h1>

      <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow p-6">
          <h1 className="text-2xl text-black font-bold mb-4">Add Banner</h1>

      {msg && <p className="text-green-600 text-center">{msg}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Banner Name */}
        <div>
          <label className="block mb-1 font-medium text-black">Banner Name</label>
          <input
            type="text"
            value={bannerName}
            onChange={(e) => setBannerName(e.target.value)}
            className="w-full text-black border px-3 py-2 rounded"
            placeholder="Enter banner name"
          />
        </div>

        {/* Upload Banner */}
        <div>
          <label className="block mb-1 text-black font-medium">Upload Banner</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full text-black border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 text-black font-medium">Or Banner Image URL / base64</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full text-black border px-3 py-2 rounded"
            placeholder="https://... or data:image/..."
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-black">Banner Link URL (optional)</label>
          <input
            type="text"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            className="w-full text-black border px-3 py-2 rounded"
            placeholder="https://studysync.com/eng-proficiency/pte-prepare"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block mb-1 font-medium text-black">Display Order</label>
            <input type="number" value={displayOrder} onChange={(e) => setDisplayOrder(Number(e.target.value) || 0)} className="w-full text-black border px-3 py-2 rounded" />
          </div>
          <label className="flex items-center gap-2 mt-7 text-black">
            <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
            Active
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Uploading..." : "Add Banner"}
        </button>
      </form>
        </div>
      </div>
    </div>
  );
}
