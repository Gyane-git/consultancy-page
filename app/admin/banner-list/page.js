"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function BannerList() {
  const [banners, setBanners] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ banner_name: "", image_path: "", link_url: "", displayOrder: 0, isActive: true });

  const fetchBanners = async () => {
    const res = await fetch("/api/banner?all=1");
    const data = await res.json();
    if (data.success) {
      setBanners(data.banners);
    }
  };

  const deleteBanner = async (id) => {
    if (!confirm("Are you sure you want to delete this banner?")) return;

    const res = await fetch(`/api/banner?id=${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.success) {
      alert("Banner removed successfully");
      fetchBanners();
    } else {
      alert("Failed to delete banner");
    }
  };

  const handleEdit = (id) => {
    const banner = banners.find((b) => b.id === id);
    if (!banner) return;
    setEditingId(id);
    setEditForm({
      banner_name: banner.banner_name || "",
      image_path: banner.image_path || "",
      link_url: banner.link_url || "",
      displayOrder: Number(banner.displayOrder || 0),
      isActive: banner.isActive !== false,
    });
  };

  const handleInfo = () => {};

  const saveEdit = async () => {
    if (!editingId) return;
    const res = await fetch("/api/banner", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editingId,
        name: editForm.banner_name,
        imageUrl: editForm.image_path,
        linkUrl: editForm.link_url,
        displayOrder: editForm.displayOrder,
        isActive: editForm.isActive,
      }),
    });
    const data = await res.json();
    if (data?.success) {
      setEditingId(null);
      fetchBanners();
    } else {
      alert(data?.error || "Failed to update banner");
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBanners();
  }, []);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Banner Management</h1>
        <p className="text-gray-600 mt-1">Manage your banner collection</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {banners.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No banners available
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {banners.map((banner) => (
              <div
                key={banner.id}
                className="flex items-center p-4 hover:bg-gray-50 transition-colors"
              >
                {/* Banner Image */}
                <div className="shrink-0 w-32 h-20 mr-4">
                  <Image
                    src={banner.image_path}
                    alt={banner.banner_name}
                    width={128}
                    height={80}
                    className="w-full h-full object-cover rounded-md border border-gray-200"
                  />
                </div>

                {/* Banner Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {banner.banner_name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    ID: {banner.id} · Order: {banner.displayOrder || 0} · {banner.isActive ? "Active" : "Inactive"}
                  </p>
                  {banner.link_url ? <p className="text-xs text-blue-600 break-all mt-1">{banner.link_url}</p> : null}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => handleInfo(banner.id)}
                    className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                    title="View Info"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(banner.id)}
                    className="px-4 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-md hover:bg-green-100 transition-colors"
                    title="Edit Banner"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteBanner(banner.id)}
                    className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
                    title="Delete Banner"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {editingId ? (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-5 w-full max-w-2xl space-y-3">
            <h3 className="text-xl font-semibold text-gray-900">Edit Banner</h3>
            <input className="w-full border rounded-lg px-3 py-2 text-black" value={editForm.banner_name} onChange={(e) => setEditForm((p) => ({ ...p, banner_name: e.target.value }))} placeholder="Banner Name" />
            <input className="w-full border rounded-lg px-3 py-2 text-black" value={editForm.image_path} onChange={(e) => setEditForm((p) => ({ ...p, image_path: e.target.value }))} placeholder="Image URL / base64" />
            <input className="w-full border rounded-lg px-3 py-2 text-black" value={editForm.link_url} onChange={(e) => setEditForm((p) => ({ ...p, link_url: e.target.value }))} placeholder="Link URL" />
            <div className="grid grid-cols-2 gap-3">
              <input type="number" className="w-full border rounded-lg px-3 py-2 text-black" value={editForm.displayOrder} onChange={(e) => setEditForm((p) => ({ ...p, displayOrder: Number(e.target.value) || 0 }))} placeholder="Display Order" />
              <label className="flex items-center gap-2 text-black"><input type="checkbox" checked={editForm.isActive} onChange={(e) => setEditForm((p) => ({ ...p, isActive: e.target.checked }))} />Active</label>
            </div>
            <div className="flex gap-2">
              <button onClick={saveEdit} className="px-4 py-2 rounded bg-blue-600 text-white">Save</button>
              <button onClick={() => setEditingId(null)} className="px-4 py-2 rounded border text-black">Cancel</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
