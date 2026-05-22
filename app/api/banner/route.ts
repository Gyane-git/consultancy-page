import { NextResponse } from "next/server";
import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import getPool from "@/lib/db";

type BannerRow = RowDataPacket & {
  id: number;
  name: string;
  imageUrl: string | null;
  linkUrl: string | null;
  isActive: number | boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
};

async function ensureBannerTable() {
  const pool = getPool();
  await pool.query(`
    CREATE TABLE IF NOT EXISTS BannerImage (
      id INT NOT NULL AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      imageUrl LONGTEXT NULL,
      linkUrl VARCHAR(2000) NULL,
      isActive BOOLEAN NOT NULL DEFAULT true,
      displayOrder INT NOT NULL DEFAULT 0,
      createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
    )
  `);
}

function mapBanner(row: BannerRow) {
  return {
    id: row.id,
    banner_name: row.name,
    image_path: row.imageUrl || "",
    link_url: row.linkUrl || "",
    isActive: Boolean(row.isActive),
    displayOrder: row.displayOrder || 0,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

function normalizeImageUrl(value: unknown) {
  return String(value ?? "").trim();
}

function normalizeText(value: unknown) {
  return String(value ?? "").trim();
}

export async function GET(request: Request) {
  try {
    await ensureBannerTable();
    const pool = getPool();
    const { searchParams } = new URL(request.url);
    const includeInactive = searchParams.get("all") === "1";
    const [rows] = await pool.query<BannerRow[]>(
      includeInactive
        ? "SELECT * FROM BannerImage ORDER BY displayOrder ASC, id DESC"
        : "SELECT * FROM BannerImage WHERE isActive = true ORDER BY displayOrder ASC, id DESC"
    );
    return NextResponse.json({ success: true, banners: rows.map(mapBanner) });
  } catch (error) {
    console.error("banner GET error", error);
    return NextResponse.json({ success: false, error: "Failed to fetch banners" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureBannerTable();
    const pool = getPool();

    const contentType = request.headers.get("content-type") || "";
    let name = "";
    let imageUrl = "";
    let linkUrl = "";
    let isActive = true;
    let displayOrder = 0;

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      name = normalizeText(formData.get("bannerName"));
      const file = formData.get("bannerImage");
      imageUrl = normalizeImageUrl(file);
      linkUrl = normalizeText(formData.get("linkUrl"));
      isActive = String(formData.get("isActive") ?? "true") !== "false";
      displayOrder = Number(formData.get("displayOrder") ?? 0) || 0;
    } else {
      const payload = await request.json();
      name = normalizeText(payload?.name ?? payload?.bannerName);
      imageUrl = normalizeImageUrl(payload?.imageUrl ?? payload?.image_path);
      linkUrl = normalizeText(payload?.linkUrl ?? payload?.link_url);
      isActive = payload?.isActive !== false;
      displayOrder = Number(payload?.displayOrder ?? 0) || 0;
    }

    if (!name || !imageUrl) {
      return NextResponse.json({ success: false, error: "Banner name and image are required." }, { status: 400 });
    }

    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO BannerImage (name, imageUrl, linkUrl, isActive, displayOrder)
       VALUES (?, ?, ?, ?, ?)`,
      [name, imageUrl, linkUrl || null, isActive, displayOrder]
    );

    const [rows] = await pool.query<BannerRow[]>("SELECT * FROM BannerImage WHERE id = ?", [result.insertId]);
    return NextResponse.json({ success: true, banner: rows[0] ? mapBanner(rows[0]) : null, message: "Banner created successfully" });
  } catch (error) {
    console.error("banner POST error", error);
    return NextResponse.json({ success: false, error: "Failed to create banner" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await ensureBannerTable();
    const pool = getPool();
    const payload = await request.json();
    const id = Number(payload?.id || 0);
    const name = normalizeText(payload?.name ?? payload?.bannerName);
    const imageUrl = normalizeImageUrl(payload?.imageUrl ?? payload?.image_path);
    const linkUrl = normalizeText(payload?.linkUrl ?? payload?.link_url);
    const isActive = payload?.isActive !== false;
    const displayOrder = Number(payload?.displayOrder ?? 0) || 0;

    if (!id) return NextResponse.json({ success: false, error: "Valid id is required." }, { status: 400 });
    if (!name || !imageUrl) {
      return NextResponse.json({ success: false, error: "Banner name and image are required." }, { status: 400 });
    }

    await pool.query(
      `UPDATE BannerImage
       SET name = ?, imageUrl = ?, linkUrl = ?, isActive = ?, displayOrder = ?
       WHERE id = ?`,
      [name, imageUrl, linkUrl || null, isActive, displayOrder, id]
    );
    const [rows] = await pool.query<BannerRow[]>("SELECT * FROM BannerImage WHERE id = ?", [id]);
    return NextResponse.json({ success: true, banner: rows[0] ? mapBanner(rows[0]) : null });
  } catch (error) {
    console.error("banner PUT error", error);
    return NextResponse.json({ success: false, error: "Failed to update banner" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await ensureBannerTable();
    const pool = getPool();
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get("id") || 0);
    if (!id) return NextResponse.json({ success: false, error: "Valid id is required." }, { status: 400 });
    await pool.query("DELETE FROM BannerImage WHERE id = ?", [id]);
    return NextResponse.json({ success: true, message: "Banner removed successfully" });
  } catch (error) {
    console.error("banner DELETE error", error);
    return NextResponse.json({ success: false, error: "Failed to delete banner" }, { status: 500 });
  }
}
