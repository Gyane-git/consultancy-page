"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params?.slug;

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    let ignore = false;

    async function loadBlog() {
      try {
        const res = await fetch(`/api/blog/${encodeURIComponent(slug)}`, { cache: "no-store" });
        const data = await res.json();
        if (!ignore && data?.success) {
          setBlog(data.blog);
        }
      } catch (error) {
        console.error("Failed to fetch blog", error);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadBlog();
    return () => {
      ignore = true;
    };
  }, [slug]);

  if (loading) {
    return <main style={{ padding: "80px 24px", textAlign: "center" }}>Loading article...</main>;
  }

  if (!blog) {
    return (
      <main style={{ padding: "80px 24px", textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: 12 }}>404</h1>
        <p style={{ color: "#666", marginBottom: 16 }}>Article not found.</p>
        <Link href="/blog" style={{ color: "#1a90c8", textDecoration: "none", fontWeight: 600 }}>Back to Blog</Link>
      </main>
    );
  }

  const tags = Array.isArray(blog.tags) ? blog.tags : [];

  return (
    <main style={{ background: "#f7f8fa", minHeight: "100vh", padding: "28px 24px 60px" }}>
      <article style={{ maxWidth: 860, margin: "0 auto", background: "#fff", border: "1px solid #e8e8e8", borderRadius: 14, padding: "26px 24px" }}>
        <Link href="/blog" style={{ color: "#1a90c8", textDecoration: "none", fontWeight: 600, fontSize: "0.86rem" }}>← Back to Blog</Link>

        <div style={{ marginTop: 14, marginBottom: 10, fontSize: "0.76rem", fontWeight: 700, color: "#1a90c8" }}>{blog.category || "General"}</div>
        <h1 style={{ fontSize: "2rem", color: "#111", lineHeight: 1.25, marginBottom: 10 }}>{blog.title}</h1>
        <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: 20 }}>{blog.readTime || "5 min read"}</p>

        {blog.excerpt ? (
          <p style={{ fontSize: "1rem", color: "#555", lineHeight: 1.8, marginBottom: 18 }}>{blog.excerpt}</p>
        ) : null}

        <div style={{ color: "#444", lineHeight: 1.9, whiteSpace: "pre-wrap" }}>{blog.content}</div>

        {tags.length ? (
          <div style={{ marginTop: 20, display: "flex", flexWrap: "wrap", gap: 8 }}>
            {tags.map((tag) => (
              <span key={tag} style={{ fontSize: "0.75rem", background: "#f3f4f6", color: "#666", borderRadius: 999, padding: "4px 10px" }}>
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </article>
    </main>
  );
}
