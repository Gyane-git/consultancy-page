import { NextResponse } from "next/server";
import getPool from "@/lib/db";
import { ensureContentTables } from "@/lib/content-store";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

type PopupAdRow = RowDataPacket & {
  id: number;
  title: string;
  imageUrl: string | null;
  color: string | null;
  targetMode: string | null;
  targetPaths: string | null;
  isActive: number | boolean;
};

let popupSchemaReady: Promise<void> | null = null;

async function ensurePopupSchema() {
  if (!popupSchemaReady) {
    popupSchemaReady = (async () => {
      await ensureContentTables();
      const pool = getPool();
      await pool.query(`
        CREATE TABLE IF NOT EXISTS PopupAd (
          id INT NOT NULL AUTO_INCREMENT,
          title VARCHAR(255) NOT NULL,
          imageUrl LONGTEXT NULL,
          color VARCHAR(20) NULL,
          targetMode VARCHAR(20) NOT NULL DEFAULT 'global',
          targetPaths LONGTEXT NULL,
          isActive BOOLEAN NOT NULL DEFAULT true,
          createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          PRIMARY KEY (id)
        )
      `);
      const [columns] = await pool.query<RowDataPacket[]>("SHOW COLUMNS FROM PopupAd");
      const hasColor = columns.some((col) => col.Field === "color");
      const hasImageUrl = columns.some((col) => col.Field === "imageUrl");
      const hasTargetMode = columns.some((col) => col.Field === "targetMode");
      const hasTargetPaths = columns.some((col) => col.Field === "targetPaths");
      if (!hasColor) {
        await pool.query("ALTER TABLE PopupAd ADD COLUMN color VARCHAR(20) NULL");
      }
      if (!hasImageUrl) {
        await pool.query("ALTER TABLE PopupAd ADD COLUMN imageUrl LONGTEXT NULL");
      }
      if (!hasTargetMode) {
        await pool.query("ALTER TABLE PopupAd ADD COLUMN targetMode VARCHAR(20) NOT NULL DEFAULT 'global'");
      }
      if (!hasTargetPaths) {
        await pool.query("ALTER TABLE PopupAd ADD COLUMN targetPaths LONGTEXT NULL");
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

function normalizeImageUrl(value: unknown) {
  return String(value ?? "").trim();
}

function normalizeTargetMode(value: unknown) {
  return String(value ?? "").trim().toLowerCase() === "path" ? "path" : "global";
}

function normalizeTargetPaths(value: unknown) {
  const input = Array.isArray(value)
    ? value.map((item) => String(item ?? "").trim()).filter(Boolean)
    : String(value ?? "")
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);

  const normalized = input.map((item) => {
    if (item.startsWith("http://") || item.startsWith("https://")) {
      try {
        const u = new URL(item);
        return u.pathname || "/";
      } catch {
        return "";
      }
    }
    return item.startsWith("/") ? item : `/${item}`;
  }).filter(Boolean);

  return JSON.stringify(Array.from(new Set(normalized)));
}

function mapPopupAd(row: PopupAdRow) {
  return {
    id: row.id,
    title: row.title,
    imageUrl: row.imageUrl || "",
    color: row.color || "#000000",
    targetMode: row.targetMode || "global",
    targetPaths: row.targetPaths ? JSON.parse(row.targetPaths) : [],
    isActive: Boolean(row.isActive),
  };
}

export async function GET(request: Request) {
  try {
    await ensurePopupSchema();
    const pool = getPool();
    const { searchParams } = new URL(request.url);
    const pathname = String(searchParams.get("pathname") || "").trim();
    const [rows] = await pool.query<PopupAdRow[]>(
      "SELECT id, title, imageUrl, color, targetMode, targetPaths, isActive FROM PopupAd ORDER BY id DESC",
    );

    const mapped = rows.map(mapPopupAd);
    if (pathname) {
      const matched = mapped.filter((item) => {
        if (!item.isActive) return false;
        if (item.targetMode === "global") return true;
        return Array.isArray(item.targetPaths) && item.targetPaths.includes(pathname);
      });
      return NextResponse.json({ success: true, ads: matched });
    }

    // Keep legacy response shape expected by admin page: array directly
    return NextResponse.json(mapped);
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
    const imageUrl = normalizeImageUrl(firstAd.imageUrl);
    const color = normalizeColor(firstAd.color);
    const targetMode = normalizeTargetMode(firstAd.targetMode);
    const targetPaths = normalizeTargetPaths(firstAd.targetPaths);
    const isActive = Number(payload?.is_active) === 0 ? 0 : 1;

    if (!title) {
      return NextResponse.json({ success: false, error: "Ad title is required" }, { status: 400 });
    }
    if (!imageUrl) {
      return NextResponse.json({ success: false, error: "Popup image is required" }, { status: 400 });
    }

    const pool = getPool();
    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO PopupAd (title, imageUrl, color, targetMode, targetPaths, isActive, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())",
      [title, imageUrl, color, targetMode, targetPaths, isActive],
    );

    const [rows] = await pool.query<PopupAdRow[]>(
      "SELECT id, title, imageUrl, color, targetMode, targetPaths, isActive FROM PopupAd WHERE id = ? LIMIT 1",
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
    const imageUrl = normalizeImageUrl(firstAd.imageUrl);
    const color = normalizeColor(firstAd.color);
    const targetMode = normalizeTargetMode(firstAd.targetMode);
    const targetPaths = normalizeTargetPaths(firstAd.targetPaths);
    const isActive = Number(payload?.is_active) === 0 ? 0 : 1;

    if (!Number.isFinite(id) || id <= 0) {
      return NextResponse.json({ success: false, error: "Valid id is required" }, { status: 400 });
    }

    if (!title) {
      return NextResponse.json({ success: false, error: "Ad title is required" }, { status: 400 });
    }
    if (!imageUrl) {
      return NextResponse.json({ success: false, error: "Popup image is required" }, { status: 400 });
    }

    const pool = getPool();
    await pool.query<ResultSetHeader>(
      "UPDATE PopupAd SET title = ?, imageUrl = ?, color = ?, targetMode = ?, targetPaths = ?, isActive = ?, updatedAt = NOW() WHERE id = ?",
      [title, imageUrl, color, targetMode, targetPaths, isActive, id],
    );

    const [rows] = await pool.query<PopupAdRow[]>(
      "SELECT id, title, imageUrl, color, targetMode, targetPaths, isActive FROM PopupAd WHERE id = ? LIMIT 1",
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
