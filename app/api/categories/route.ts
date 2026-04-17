import { NextResponse } from "next/server";
import getPool from "@/lib/db";

// GET - Fetch all categories
export async function GET() {
  try {
    const pool = getPool();
    const [rows] = await pool.query("SELECT * FROM Category WHERE isActive = true ORDER BY createdAt DESC");
    return NextResponse.json({ success: true, categories: rows });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch categories" }, { status: 500 });
  }
}

// POST - Create new category
export async function POST(request: Request) {
  try {
    const pool = getPool();
    const formData = await request.formData();
    
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string || name.toLowerCase().replace(/\s+/g, "-");
    const description = formData.get("description") as string || "";
    
    // Handle image upload (store as null for now)
    let imageUrl = null;
    const image = formData.get("image") as File | null;
    if (image && image.size > 0) {
      // In production, upload to cloud storage
      imageUrl = `/uploads/${Date.now()}-${image.name}`;
    }

    const [result] = await pool.query(
      "INSERT INTO Category (name, slug, description, image, isActive) VALUES (?, ?, ?, ?, true)",
      [name, slug, description, imageUrl]
    );

    const [inserted] = await pool.query("SELECT * FROM Category WHERE id = ?", [(result as any).insertId]);
    
    return NextResponse.json({ success: true, category: (inserted as any[])[0] });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json({ success: false, error: "Failed to create category" }, { status: 500 });
  }
}