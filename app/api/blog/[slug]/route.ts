import { NextResponse } from "next/server";
import getPool from "@/lib/db";
import { ensureContentTables } from "@/lib/content-store";
import type { RowDataPacket } from "mysql2";

export async function GET(_: Request, context: { params: Promise<{ slug: string }> }) {
  try {
    await ensureContentTables();
    const { slug } = await context.params;
    const pool = getPool();

    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM BlogPost WHERE slug = ? AND isPublished = true LIMIT 1",
      [slug],
    );

    const blog = rows[0];
    if (!blog) {
      return NextResponse.json({ success: false, error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      blog: {
        ...blog,
        tags: blog.tags ? JSON.parse(blog.tags) : [],
      },
    });
  } catch (error) {
    console.error("blog/[slug] GET error", error);
    return NextResponse.json({ success: false, error: "Failed to fetch blog" }, { status: 500 });
  }
}
