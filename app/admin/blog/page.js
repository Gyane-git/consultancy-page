"use client";

import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const emptyForm = {
  id: null,
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  category: "General",
  readTime: "5 min",
  thumbnail: "",
  videoUrl: "",
  tags: "",
  isPublished: true,
};

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function mapBlogToForm(blog) {
  return {
    id: blog.id,
    slug: blog.slug || "",
    title: blog.title || "",
    excerpt: blog.excerpt || "",
    content: blog.content || "",
    category: blog.category || "General",
    readTime: blog.readTime || "5 min",
    thumbnail: blog.thumbnail || "",
    videoUrl: blog.videoUrl || "",
    tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : "",
    isPublished: blog.isPublished !== false,
  };
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

export default function AdminBlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [search, setSearch] = useState("");

  async function loadBlogs() {
    setLoading(true);
    try {
      const res = await fetch("/api/blog?includeDraft=1", { cache: "no-store" });
      const data = await res.json();
      if (data?.success) {
        setBlogs(Array.isArray(data.blogs) ? data.blogs : []);
      }
    } catch (error) {
      console.error(error);
      setNotice("Failed to load blog posts.");
      toast.error("Failed to load blog posts.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    Promise.resolve().then(loadBlogs);
  }, []);

  const filteredBlogs = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return blogs;
    return blogs.filter((blog) => {
      const title = String(blog.title || "").toLowerCase();
      const slug = String(blog.slug || "").toLowerCase();
      const category = String(blog.category || "").toLowerCase();
      return title.includes(term) || slug.includes(term) || category.includes(term);
    });
  }, [blogs, search]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setNotice("");

    const payload = {
      ...form,
      slug: slugify(form.slug || form.title),
    };

    if (!payload.slug || !payload.title.trim() || !payload.content.trim()) {
      setNotice("Slug, title and content are required.");
      toast.error("Slug, title and content are required.");
      setSaving(false);
      return;
    }

    const method = payload.id ? "PUT" : "POST";

    try {
      const res = await fetch("/api/blog", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data?.success) {
        throw new Error(data?.error || "Failed to save blog post");
      }

      setNotice(payload.id ? "Blog post updated." : "Blog post created.");
      toast.success(payload.id ? "Blog post updated." : "Blog post created.");
      setForm(emptyForm);
      await loadBlogs();
    } catch (error) {
      console.error(error);
      setNotice(error instanceof Error ? error.message : "Failed to save blog post");
      toast.error(error instanceof Error ? error.message : "Failed to save blog post");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    const ok = window.confirm("Delete this blog post?");
    if (!ok) return;

    setNotice("");
    try {
      const res = await fetch(`/api/blog?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data?.success) {
        throw new Error(data?.error || "Failed to delete blog post");
      }

      setNotice("Blog post deleted.");
      toast.success("Blog post deleted.");
      if (form.id === id) {
        setForm(emptyForm);
      }
      await loadBlogs();
    } catch (error) {
      console.error(error);
      setNotice(error instanceof Error ? error.message : "Failed to delete blog post");
      toast.error(error instanceof Error ? error.message : "Failed to delete blog post");
    }
  }

  function startEdit(blog) {
    setForm(mapBlogToForm(blog));
    setNotice("Editing selected blog post.");
    toast("Editing selected blog post.");
  }

  function clearForm() {
    setForm(emptyForm);
    setNotice("Form reset.");
    toast("Form reset.");
  }

  async function handleThumbnailFromGallery(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setNotice("Processing thumbnail...");
    try {
      const dataUrl = await toCompressedDataUrl(file);
      setForm((prev) => ({ ...prev, thumbnail: dataUrl }));
      setNotice("Thumbnail selected from gallery.");
      toast.success("Thumbnail selected from gallery.");
    } catch (error) {
      console.error(error);
      setNotice("Failed to process thumbnail image.");
      toast.error("Failed to process thumbnail image.");
    }
  }

  return (
    <div className="p-6 grid grid-cols-1 xl:grid-cols-2 gap-6 text-gray-600">
      <section className="bg-white border rounded-xl p-5">
        <h1 className="text-2xl font-semibold mb-1">Blog Posts</h1>
        <p className="text-sm text-gray-600 mb-5">Create and manage blog posts shown on the website.</p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Title"
            value={form.title}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                title: e.target.value,
                slug: prev.id ? prev.slug : slugify(e.target.value),
              }))
            }
            required
          />

          <input
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Slug (auto-generated from title)"
            value={form.slug}
            onChange={(e) => setForm((prev) => ({ ...prev, slug: slugify(e.target.value) }))}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Category (example: UK, Canada)"
              value={form.category}
              onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
            />
            <input
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Read Time (example: 5 min)"
              value={form.readTime}
              onChange={(e) => setForm((prev) => ({ ...prev, readTime: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <input
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Thumbnail URL or base64"
              value={form.thumbnail}
              onChange={(e) => setForm((prev) => ({ ...prev, thumbnail: e.target.value }))}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailFromGallery}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
            {form.thumbnail ? (
              <img src={form.thumbnail} alt="Thumbnail preview" className="h-24 w-40 object-cover rounded-lg border" />
            ) : null}
          </div>

          <input
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Embedded Video URL or iframe code (YouTube/Facebook/Instagram)"
            value={form.videoUrl}
            onChange={(e) => setForm((prev) => ({ ...prev, videoUrl: e.target.value }))}
          />

          <input
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Tags (comma separated)"
            value={form.tags}
            onChange={(e) => setForm((prev) => ({ ...prev, tags: e.target.value }))}
          />

          <textarea
            className="w-full border rounded-lg px-3 py-2 min-h-20"
            placeholder="Short excerpt"
            value={form.excerpt}
            onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
          />

          <textarea
            className="w-full border rounded-lg px-3 py-2 min-h-48"
            placeholder="Blog content"
            value={form.content}
            onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
            required
          />

          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={form.isPublished}
              onChange={(e) => setForm((prev) => ({ ...prev, isPublished: e.target.checked }))}
            />
            Published
          </label>

          <div className="flex gap-2">
            <button type="submit" disabled={saving} className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium">
              {saving ? "Saving..." : form.id ? "Update Post" : "Create Post"}
            </button>
            <button type="button" className="px-4 py-2 rounded-lg border" onClick={clearForm}>
              Reset
            </button>
          </div>
        </form>

        {notice ? <p className="mt-3 text-sm text-gray-700">{notice}</p> : null}
      </section>

      <section className="bg-white border rounded-xl p-5">
        <div className="flex items-center justify-between mb-3 gap-3">
          <h2 className="text-lg font-semibold">All Posts ({filteredBlogs.length})</h2>
          <input
            className="border rounded-lg px-3 py-2 text-sm w-full max-w-64"
            placeholder="Search title/slug/category"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <p className="text-sm text-gray-600">Loading posts...</p>
        ) : !filteredBlogs.length ? (
          <p className="text-sm text-gray-600">No posts found.</p>
        ) : (
          <div className="space-y-3 max-h-[70vh] overflow-auto pr-1">
            {filteredBlogs.map((blog) => (
              <article key={blog.id} className="border rounded-lg p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{blog.title}</p>
                    <p className="text-xs text-gray-500">/{blog.slug}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {blog.category || "General"} • {blog.readTime || "5 min"} • {blog.isPublished ? "Published" : "Draft"}
                    </p>
                  </div>

                  <div className="flex gap-2 shrink-0">
                    <button className="text-sm text-blue-600" onClick={() => startEdit(blog)}>
                      Edit
                    </button>
                    <button className="text-sm text-red-600" onClick={() => handleDelete(blog.id)}>
                      Delete
                    </button>
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
