import { NextResponse } from "next/server";
import getPool from "@/lib/db";

// GET - Fetch all banners
export async function GET() {
  try {
    const pool = getPool();
    const [rows] = await pool.query("SELECT * FROM Banner WHERE isActive = true ORDER BY `order` ASC");
    return NextResponse.json({ success: true, banners: rows });
  } catch (error) {
    console.error("Error fetching banners:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch banners" }, { status: 500 });
  }
}

// POST - Create new banner
export async function POST(request: Request) {
  try {
    const pool = getPool();
    const formData = await request.formData();
    
    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string || null;
    const image = formData.get("image") as string || "";
    const link = formData.get("link") as string || null;
    const order = parseInt(formData.get("order") as string) || 0;

    const [result] = await pool.query(
      "INSERT INTO Banner (title, subtitle, image, link, isActive, `order`) VALUES (?, ?, ?, ?, true, ?)",
      [title, subtitle, image, link, order]
    );

    const [inserted] = await pool.query("SELECT * FROM Banner WHERE id = ?", [(result as any).insertId]);
    
    return NextResponse.json({ success: true, banner: (inserted as any[])[0] });
  } catch (error) {
    console.error("Error creating banner:", error);
    return NextResponse.json({ success: false, error: "Failed to create banner" }, { status: 500 });
  }
}