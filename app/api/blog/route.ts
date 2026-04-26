import { NextResponse } from "next/server";
import getPool from "@/lib/db";
import { ensureContentTables } from "@/lib/content-store";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

function normalizeTags(value: unknown) {
  if (Array.isArray(value)) return JSON.stringify(value.map((v) => String(v)));
  if (typeof value === "string") {
    if (!value.trim()) return JSON.stringify([]);
    return JSON.stringify(value.split(",").map((v) => v.trim()).filter(Boolean));
  }
  return JSON.stringify([]);
}

export async function GET(request: Request) {
  try {
    await ensureContentTables();
    const pool = getPool();
    const { searchParams } = new URL(request.url);
    const includeDraft = searchParams.get("includeDraft") === "1";

    const [rows] = await pool.query<RowDataPacket[]>(
      includeDraft
        ? "SELECT * FROM BlogPost ORDER BY publishedAt DESC, createdAt DESC"
        : "SELECT * FROM BlogPost WHERE isPublished = true ORDER BY publishedAt DESC, createdAt DESC",
    );

    const blogs = rows.map((row) => ({
      ...row,
      tags: row.tags ? JSON.parse(row.tags) : [],
    }));

    return NextResponse.json({ success: true, blogs });
  } catch (error) {
    console.error("blog GET error", error);
    return NextResponse.json({ success: false, error: "Failed to fetch blogs" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureContentTables();
    const payload = await request.json();
    const pool = getPool();

    const slug = String(payload?.slug ?? "").trim().toLowerCase();
    const title = String(payload?.title ?? "").trim();
    const excerpt = String(payload?.excerpt ?? "").trim();
    const content = String(payload?.content ?? "").trim();
    const category = String(payload?.category ?? "").trim();
    const readTime = String(payload?.readTime ?? "").trim();
    const thumbnail = String(payload?.thumbnail ?? "").trim();
    const videoUrl = String(payload?.videoUrl ?? "").trim();
    const isPublished = payload?.isPublished !== false;
    const tags = normalizeTags(payload?.tags);

    if (!slug || !title || !content) {
      return NextResponse.json({ success: false, error: "slug, title and content are required" }, { status: 400 });
    }

    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO BlogPost (slug, title, excerpt, content, category, readTime, thumbnail, videoUrl, tags, isPublished)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        slug,
        title,
        excerpt || null,
        content,
        category || null,
        readTime || null,
        thumbnail || null,
        videoUrl || null,
        tags,
        isPublished,
      ],
    );

    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM BlogPost WHERE id = ?", [result.insertId]);
    const blog = rows[0];
    return NextResponse.json({ success: true, blog: blog ? { ...blog, tags: blog.tags ? JSON.parse(blog.tags) : [] } : null });
  } catch (error: unknown) {
    console.error("blog POST error", error);
    if (typeof error === "object" && error !== null && "code" in error && (error as { code?: string }).code === "ER_DUP_ENTRY") {
      return NextResponse.json({ success: false, error: "slug already exists" }, { status: 409 });
    }
    return NextResponse.json({ success: false, error: "Failed to create blog" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await ensureContentTables();
    const payload = await request.json();
    const pool = getPool();

    const id = Number(payload?.id);
    const slug = String(payload?.slug ?? "").trim().toLowerCase();
    const title = String(payload?.title ?? "").trim();
    const excerpt = String(payload?.excerpt ?? "").trim();
    const content = String(payload?.content ?? "").trim();
    const category = String(payload?.category ?? "").trim();
    const readTime = String(payload?.readTime ?? "").trim();
    const thumbnail = String(payload?.thumbnail ?? "").trim();
    const videoUrl = String(payload?.videoUrl ?? "").trim();
    const isPublished = payload?.isPublished !== false;
    const tags = normalizeTags(payload?.tags);

    if (!Number.isFinite(id) || id <= 0) {
      return NextResponse.json({ success: false, error: "Valid id is required" }, { status: 400 });
    }

    if (!slug || !title || !content) {
      return NextResponse.json({ success: false, error: "slug, title and content are required" }, { status: 400 });
    }

    await pool.query(
      `UPDATE BlogPost
       SET slug = ?, title = ?, excerpt = ?, content = ?, category = ?, readTime = ?, thumbnail = ?, videoUrl = ?, tags = ?, isPublished = ?
       WHERE id = ?`,
      [
        slug,
        title,
        excerpt || null,
        content,
        category || null,
        readTime || null,
        thumbnail || null,
        videoUrl || null,
        tags,
        isPublished,
        id,
      ],
    );

    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM BlogPost WHERE id = ?", [id]);
    const blog = rows[0];
    return NextResponse.json({ success: true, blog: blog ? { ...blog, tags: blog.tags ? JSON.parse(blog.tags) : [] } : null });
  } catch (error: unknown) {
    console.error("blog PUT error", error);
    if (typeof error === "object" && error !== null && "code" in error && (error as { code?: string }).code === "ER_DUP_ENTRY") {
      return NextResponse.json({ success: false, error: "slug already exists" }, { status: 409 });
    }
    return NextResponse.json({ success: false, error: "Failed to update blog" }, { status: 500 });
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
    await pool.query("DELETE FROM BlogPost WHERE id = ?", [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("blog DELETE error", error);
    return NextResponse.json({ success: false, error: "Failed to delete blog" }, { status: 500 });
  }
}
