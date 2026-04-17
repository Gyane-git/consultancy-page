import { NextResponse } from "next/server";
import getPool from "@/lib/db";

// GET - Fetch all popup ads
export async function GET() {
  try {
    const pool = getPool();
    const [rows] = await pool.query("SELECT * FROM PopupAd WHERE isActive = true ORDER BY createdAt DESC");
    return NextResponse.json({ success: true, popupAds: rows });
  } catch (error) {
    console.error("Error fetching popup ads:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch popup ads" }, { status: 500 });
  }
}

// POST - Create new popup ad
export async function POST(request: Request) {
  try {
    const pool = getPool();
    const formData = await request.formData();
    
    const title = formData.get("title") as string;
    const content = formData.get("content") as string || null;
    const image = formData.get("image") as string || null;
    const link = formData.get("link") as string || null;
    const showOnce = formData.get("showOnce") === "true" ? true : false;

    const [result] = await pool.query(
      "INSERT INTO PopupAd (title, content, image, link, isActive, showOnce) VALUES (?, ?, ?, ?, true, ?)",
      [title, content, image, link, showOnce]
    );

    const [inserted] = await pool.query("SELECT * FROM PopupAd WHERE id = ?", [(result as any).insertId]);
    
    return NextResponse.json({ success: true, popupAd: (inserted as any[])[0] });
  } catch (error) {
    console.error("Error creating popup ad:", error);
    return NextResponse.json({ success: false, error: "Failed to create popup ad" }, { status: 500 });
  }
}