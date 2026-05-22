import { NextResponse } from "next/server";
import getPool from "@/lib/db";
import { ensureContentTables } from "@/lib/content-store";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

type VideoRow = RowDataPacket & {
  id: number;
  name: string;
  role: string | null;
  caption: string | null;
  thumbnail: string | null;
  videoUrl: string;
  tag: string | null;
  displayOrder: number;
  isActive: number | boolean;
  createdAt: string;
  updatedAt: string;
};

function getYouTubeId(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.replace("/", "").trim();
    }
    if (parsed.hostname.includes("youtube.com")) {
      return parsed.searchParams.get("v") || "";
    }
  } catch {
    return "";
  }
  return "";
}

function getYoutubeThumbnail(url: string) {
  const id = getYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
}

function isSupportedVideoUrl(url: string) {
  const normalized = String(url || "").trim().toLowerCase();
  if (normalized.includes("facebook.com/share/") || normalized.includes("fb.watch/")) {
    return true;
  }
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();
    return (
      host.includes("youtube.com") ||
      host.includes("youtu.be") ||
      host.includes("facebook.com") ||
      host.includes("fb.watch") ||
      host.includes("instagram.com")
    );
  } catch {
    return false;
  }
}

function normalizeVideoUrl(value: unknown) {
  const raw = String(value ?? "").trim();
  if (!raw) return "";
  const iframeSrcMatch = raw.match(/src\s*=\s*["']([^"']+)["']/i);
  if (iframeSrcMatch?.[1]) {
    return iframeSrcMatch[1].trim().replace(/&amp;/g, "&");
  }
  const match = raw.match(/https?:\/\/[^\s]+/i);
  return (match ? match[0] : raw).trim();
}

function mapVideo(row: VideoRow) {
  const fallbackThumb = row.thumbnail || getYoutubeThumbnail(row.videoUrl);
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    caption: row.caption,
    thumbnail: fallbackThumb || null,
    videoUrl: row.videoUrl,
    tag: row.tag,
    displayOrder: row.displayOrder,
    isActive: Boolean(row.isActive),
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

export async function GET(request: Request) {
  try {
    await ensureContentTables();
    const { searchParams } = new URL(request.url);
    const includeInactive = searchParams.get("all") === "1";

    const pool = getPool();
    const [rows] = await pool.query<VideoRow[]>(
      includeInactive
        ? "SELECT * FROM VideoTestimonial ORDER BY displayOrder ASC, id DESC"
        : "SELECT * FROM VideoTestimonial WHERE isActive = true ORDER BY displayOrder ASC, id DESC",
    );

    return NextResponse.json({ success: true, videos: rows.map(mapVideo) });
  } catch (error) {
    console.error("video-testimonials GET error", error);
    return NextResponse.json({ success: false, error: "Failed to fetch video testimonials" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureContentTables();
    const payload = await request.json();
    const pool = getPool();

    const name = String(payload?.name ?? "").trim();
    const role = String(payload?.role ?? "").trim();
    const caption = String(payload?.caption ?? "").trim();
    const thumbnail = String(payload?.thumbnail ?? "").trim();
    const videoUrl = normalizeVideoUrl(payload?.videoUrl);
    const tag = String(payload?.tag ?? "").trim();
    const displayOrder = Number(payload?.displayOrder ?? 0);

    if (!name || !videoUrl) {
      return NextResponse.json({ success: false, error: "name and videoUrl are required" }, { status: 400 });
    }
    if (!isSupportedVideoUrl(videoUrl)) {
      return NextResponse.json({ success: false, error: "Only YouTube, Facebook, and Instagram video URLs are supported." }, { status: 400 });
    }

    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO VideoTestimonial (name, role, caption, thumbnail, videoUrl, tag, displayOrder, isActive)
       VALUES (?, ?, ?, ?, ?, ?, ?, true)`,
      [name, role || null, caption || null, thumbnail || null, videoUrl, tag || null, Number.isFinite(displayOrder) ? displayOrder : 0],
    );

    const [rows] = await pool.query<VideoRow[]>("SELECT * FROM VideoTestimonial WHERE id = ?", [result.insertId]);
    return NextResponse.json({ success: true, video: rows[0] ? mapVideo(rows[0]) : null });
  } catch (error) {
    console.error("video-testimonials POST error", error);
    return NextResponse.json({ success: false, error: "Failed to create video testimonial" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await ensureContentTables();
    const payload = await request.json();
    const pool = getPool();

    const id = Number(payload?.id);
    const name = String(payload?.name ?? "").trim();
    const role = String(payload?.role ?? "").trim();
    const caption = String(payload?.caption ?? "").trim();
    const thumbnail = String(payload?.thumbnail ?? "").trim();
    const videoUrl = normalizeVideoUrl(payload?.videoUrl);
    const tag = String(payload?.tag ?? "").trim();
    const displayOrder = Number(payload?.displayOrder ?? 0);
    const isActive = payload?.isActive !== false;

    if (!Number.isFinite(id) || id <= 0) {
      return NextResponse.json({ success: false, error: "Valid id is required" }, { status: 400 });
    }

    if (!name || !videoUrl) {
      return NextResponse.json({ success: false, error: "name and videoUrl are required" }, { status: 400 });
    }
    if (!isSupportedVideoUrl(videoUrl)) {
      return NextResponse.json({ success: false, error: "Only YouTube, Facebook, and Instagram video URLs are supported." }, { status: 400 });
    }

    await pool.query(
      `UPDATE VideoTestimonial
       SET name = ?, role = ?, caption = ?, thumbnail = ?, videoUrl = ?, tag = ?, displayOrder = ?, isActive = ?
       WHERE id = ?`,
      [
        name,
        role || null,
        caption || null,
        thumbnail || null,
        videoUrl,
        tag || null,
        Number.isFinite(displayOrder) ? displayOrder : 0,
        isActive,
        id,
      ],
    );

    const [rows] = await pool.query<VideoRow[]>("SELECT * FROM VideoTestimonial WHERE id = ?", [id]);
    return NextResponse.json({ success: true, video: rows[0] ? mapVideo(rows[0]) : null });
  } catch (error) {
    console.error("video-testimonials PUT error", error);
    return NextResponse.json({ success: false, error: "Failed to update video testimonial" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await ensureContentTables();
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get("id"));

    if (!Number.isFinite(id) || id <= 0) {
      return NextResponse.json({ success: false, error: "Valid id is required" }, { status: 400 });
    }

    const pool = getPool();
    await pool.query("DELETE FROM VideoTestimonial WHERE id = ?", [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("video-testimonials DELETE error", error);
    return NextResponse.json({ success: false, error: "Failed to delete video testimonial" }, { status: 500 });
  }
}
