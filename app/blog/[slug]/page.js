"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

function getEmbedVideoUrl(rawUrl) {
  const input = String(rawUrl || "").trim();
  if (!input) return "";

  try {
    if (input.includes("<iframe")) {
      const srcMatch = input.match(/src\s*=\s*["']([^"']+)["']/i);
      if (srcMatch?.[1]) return srcMatch[1].trim().replace(/&amp;/g, "&");
    }

    const url = new URL(input);

    // YouTube formats -> embed URL
    if (url.hostname.includes("youtube.com") || url.hostname.includes("youtu.be")) {
      if (url.pathname.startsWith("/embed/")) {
        return url.toString();
      }
      if (url.hostname.includes("youtu.be")) {
        const id = url.pathname.replace("/", "");
        return id ? `https://www.youtube.com/embed/${id}` : "";
      }
      const watchId = url.searchParams.get("v");
      if (watchId) {
        return `https://www.youtube.com/embed/${watchId}`;
      }
      return "";
    }

    // Facebook embed or normal video URL -> plugin embed URL
    if (url.hostname.includes("facebook.com") || url.hostname.includes("fb.watch")) {
      if (url.pathname.includes("/plugins/video.php")) {
        return url.toString();
      }
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(input)}&show_text=false`;
    }

    // Instagram embed URL support
    if (url.hostname.includes("instagram.com")) {
      if (url.pathname.includes("/embed")) return url.toString();
      const parts = url.pathname.split("/").filter(Boolean);
      if (parts.length >= 2 && (parts[0] === "reel" || parts[0] === "p" || parts[0] === "tv")) {
        return `https://www.instagram.com/${parts[0]}/${parts[1]}/embed`;
      }
    }
  } catch {
    return "";
  }

  return "";
}

function getEmbedAspectPadding(rawUrl, embedUrl) {
  const raw = String(rawUrl || "").toLowerCase();
  const src = String(embedUrl || "").toLowerCase();
  const isVerticalHint =
    raw.includes("/reel/") ||
    raw.includes("instagram.com/reel") ||
    src.includes("/reel/") ||
    src.includes("instagram.com/reel");

  try {
    const parsed = new URL(String(embedUrl || ""));
    const h = Number(parsed.searchParams.get("height"));
    const w = Number(parsed.searchParams.get("width"));
    if (Number.isFinite(h) && Number.isFinite(w) && h > 0 && w > 0) {
      const percent = (h / w) * 100;
      if (percent >= 80 && percent <= 220) return `${percent}%`;
    }
  } catch {
    // fallback below
  }

  return isVerticalHint ? "177.78%" : "56.25%";
}

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
  const embedVideoUrl = getEmbedVideoUrl(blog.videoUrl);
  const embedPaddingTop = getEmbedAspectPadding(blog.videoUrl, embedVideoUrl);

  return (
    <main style={{ background: "#f7f8fa", minHeight: "100vh", padding: "28px 24px 60px" }}>
      <article style={{ maxWidth: 860, margin: "0 auto", background: "#fff", border: "1px solid #e8e8e8", borderRadius: 14, padding: "26px 24px" }}>
        <Link href="/blog" style={{ color: "#1a90c8", textDecoration: "none", fontWeight: 600, fontSize: "0.86rem" }}>← Back to Blog</Link>

        <div style={{ marginTop: 14, marginBottom: 10, fontSize: "0.76rem", fontWeight: 700, color: "#1a90c8" }}>{blog.category || "General"}</div>
        <h1 style={{ fontSize: "2rem", color: "#111", lineHeight: 1.25, marginBottom: 10 }}>{blog.title}</h1>
        <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: 20 }}>{blog.readTime || "5 min read"}</p>

        {blog.thumbnail ? (
          <div style={{ marginBottom: 20 }}>
            <img
              src={blog.thumbnail}
              alt={blog.title || "Blog thumbnail"}
              style={{ width: "100%", maxHeight: 380, objectFit: "cover", borderRadius: 12, border: "1px solid #f1f1f1" }}
            />
          </div>
        ) : null}

        {blog.excerpt ? (
          <p style={{ fontSize: "1rem", color: "#555", lineHeight: 1.8, marginBottom: 18 }}>{blog.excerpt}</p>
        ) : null}

        {embedVideoUrl ? (
          <div style={{ marginBottom: 22 }}>
            <div style={{ position: "relative", width: "100%", maxWidth: 760, margin: "0 auto", paddingTop: embedPaddingTop, borderRadius: 12, overflow: "hidden", border: "1px solid #ececec", background: "#000" }}>
              <iframe
                src={embedVideoUrl}
                title="Embedded Video"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
                allowFullScreen
              />
            </div>
          </div>
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
