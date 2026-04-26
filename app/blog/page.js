"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadBlogs() {
      try {
        const res = await fetch("/api/blog", { cache: "no-store" });
        const data = await res.json();
        if (!ignore && data?.success) {
          setBlogs(Array.isArray(data.blogs) ? data.blogs : []);
        }
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadBlogs();
    return () => {
      ignore = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return blogs;
    return blogs.filter((blog) => {
      const title = String(blog?.title ?? "").toLowerCase();
      const excerpt = String(blog?.excerpt ?? "").toLowerCase();
      return title.includes(term) || excerpt.includes(term);
    });
  }, [blogs, search]);

  return (
    <main style={{ background: "#f7f8fa", minHeight: "100vh", padding: "40px 24px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#111", marginBottom: 8 }}>Latest Blog Posts</h1>
          <p style={{ color: "#777", marginBottom: 18 }}>Read updates, student guidance, and destination insights.</p>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search blog title or summary"
            style={{ width: "100%", maxWidth: 420, padding: "12px 14px", borderRadius: 10, border: "1px solid #ddd", fontSize: "0.9rem" }}
          />
        </div>

        {loading ? (
          <p style={{ color: "#666" }}>Loading blogs...</p>
        ) : filtered.length === 0 ? (
          <p style={{ color: "#666" }}>No blog posts found.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            {filtered.map((blog) => (
              <Link
                key={blog.id}
                href={`/blog/${blog.slug}`}
                style={{ textDecoration: "none", color: "inherit", background: "#fff", border: "1px solid #e8e8e8", borderRadius: 14, padding: 18, display: "block" }}
              >
                {blog.thumbnail ? (
                  <div style={{ marginBottom: 12 }}>
                    <img
                      src={blog.thumbnail}
                      alt={blog.title || "Blog thumbnail"}
                      style={{ width: "100%", height: 170, objectFit: "cover", borderRadius: 10, border: "1px solid #f1f1f1" }}
                    />
                  </div>
                ) : null}
                <div style={{ fontSize: "0.75rem", color: "#1a90c8", fontWeight: 700, marginBottom: 8 }}>{blog.category || "General"}</div>
                <h2 style={{ fontSize: "1.1rem", lineHeight: 1.35, color: "#111", marginBottom: 10 }}>{blog.title}</h2>
                <p style={{ color: "#6b7280", fontSize: "0.88rem", lineHeight: 1.6, marginBottom: 12 }}>{blog.excerpt || "No summary available."}</p>
                <div style={{ fontSize: "0.78rem", color: "#999", display: "flex", justifyContent: "space-between" }}>
                  <span>{blog.readTime || "5 min"}</span>
                  <span>Read more →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
