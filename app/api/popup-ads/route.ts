import { NextResponse } from "next/server";
import getPool from "@/lib/db";
import { ensureContentTables } from "@/lib/content-store";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

type PopupAdRow = RowDataPacket & {
  id: number;
  title: string;
  color: string | null;
  isActive: number | boolean;
};

let popupSchemaReady: Promise<void> | null = null;

async function ensurePopupSchema() {
  if (!popupSchemaReady) {
    popupSchemaReady = (async () => {
      await ensureContentTables();
      const pool = getPool();
      const [columns] = await pool.query<RowDataPacket[]>("SHOW COLUMNS FROM PopupAd");
      const hasColor = columns.some((col) => col.Field === "color");
      if (!hasColor) {
        await pool.query("ALTER TABLE PopupAd ADD COLUMN color VARCHAR(20) NULL");
      }
    })();
  }

  try {
    await popupSchemaReady;
  } catch (error) {
    popupSchemaReady = null;
    throw error;
  }
}

function normalizeColor(value: unknown) {
  const input = String(value ?? "").trim();
  return /^#[0-9a-fA-F]{6}$/.test(input) ? input : "#000000";
}

function normalizeTitle(value: unknown) {
  return String(value ?? "").trim();
}

function mapPopupAd(row: PopupAdRow) {
  return {
    id: row.id,
    title: row.title,
    color: row.color || "#000000",
    isActive: Boolean(row.isActive),
  };
}

export async function GET() {
  try {
    await ensurePopupSchema();
    const pool = getPool();
    const [rows] = await pool.query<PopupAdRow[]>(
      "SELECT id, title, color, isActive FROM PopupAd ORDER BY id DESC",
    );

    // Keep legacy response shape expected by admin page: array directly
    return NextResponse.json(rows.map(mapPopupAd));
  } catch (error) {
    console.error("popup-ads GET error", error);
    return NextResponse.json({ success: false, error: "Failed to fetch popup ads" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await ensurePopupSchema();
    const payload = await request.json();

    const ads = Array.isArray(payload?.ads) ? payload.ads : [];
    const firstAd = ads[0] ?? {};
    const title = normalizeTitle(firstAd.title);
    const color = normalizeColor(firstAd.color);
    const isActive = Number(payload?.is_active) === 0 ? 0 : 1;

    if (!title) {
      return NextResponse.json({ success: false, error: "Ad title is required" }, { status: 400 });
    }

    const pool = getPool();
    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO PopupAd (title, color, isActive, createdAt, updatedAt) VALUES (?, ?, ?, NOW(), NOW())",
      [title, color, isActive],
    );

    const [rows] = await pool.query<PopupAdRow[]>(
      "SELECT id, title, color, isActive FROM PopupAd WHERE id = ? LIMIT 1",
      [result.insertId],
    );

    return NextResponse.json({ success: true, ad: rows[0] ? mapPopupAd(rows[0]) : null });
  } catch (error) {
    console.error("popup-ads POST error", error);
    return NextResponse.json({ success: false, error: "Failed to create popup ad" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await ensurePopupSchema();
    const payload = await request.json();

    const id = Number(payload?.id);
    const ads = Array.isArray(payload?.ads) ? payload.ads : [];
    const firstAd = ads[0] ?? {};
    const title = normalizeTitle(firstAd.title);
    const color = normalizeColor(firstAd.color);
    const isActive = Number(payload?.is_active) === 0 ? 0 : 1;

    if (!Number.isFinite(id) || id <= 0) {
      return NextResponse.json({ success: false, error: "Valid id is required" }, { status: 400 });
    }

    if (!title) {
      return NextResponse.json({ success: false, error: "Ad title is required" }, { status: 400 });
    }

    const pool = getPool();
    await pool.query<ResultSetHeader>(
      "UPDATE PopupAd SET title = ?, color = ?, isActive = ?, updatedAt = NOW() WHERE id = ?",
      [title, color, isActive, id],
    );

    const [rows] = await pool.query<PopupAdRow[]>(
      "SELECT id, title, color, isActive FROM PopupAd WHERE id = ? LIMIT 1",
      [id],
    );

    return NextResponse.json({ success: true, ad: rows[0] ? mapPopupAd(rows[0]) : null });
  } catch (error) {
    console.error("popup-ads PUT error", error);
    return NextResponse.json({ success: false, error: "Failed to update popup ad" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await ensurePopupSchema();
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get("id"));

    if (!Number.isFinite(id) || id <= 0) {
      return NextResponse.json({ success: false, error: "Valid id is required" }, { status: 400 });
    }

    const pool = getPool();
    await pool.query<ResultSetHeader>("DELETE FROM PopupAd WHERE id = ?", [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("popup-ads DELETE error", error);
    return NextResponse.json({ success: false, error: "Failed to delete popup ad" }, { status: 500 });
  }
}
