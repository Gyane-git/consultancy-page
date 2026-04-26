import { NextResponse } from "next/server";
import getPool from "@/lib/db";
import { ensureContentTables } from "@/lib/content-store";
import type { RowDataPacket } from "mysql2";

export async function GET() {
  try {
    await ensureContentTables();
    const pool = getPool();
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM AboutCeo WHERE singletonKey = 'default' LIMIT 1");
    const ceo = rows[0] ?? null;
    return NextResponse.json({ success: true, ceo });
  } catch (error) {
    console.error("about-ceo GET error", error);
    return NextResponse.json({ success: false, error: "Failed to fetch CEO profile" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureContentTables();
    const payload = await request.json();
    const pool = getPool();

    const ceoName = String(payload?.ceoName ?? "").trim();
    const designation = String(payload?.designation ?? "").trim();
    const message = String(payload?.message ?? "").trim();
    const profileImage = String(payload?.profileImage ?? "").trim();
    const linkedinUrl = String(payload?.linkedinUrl ?? "").trim();

    if (!ceoName || !designation || !message) {
      return NextResponse.json(
        { success: false, error: "ceoName, designation and message are required" },
        { status: 400 },
      );
    }

    await pool.query(
      `INSERT INTO AboutCeo (singletonKey, ceoName, designation, message, profileImage, linkedinUrl)
       VALUES ('default', ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         ceoName = VALUES(ceoName),
         designation = VALUES(designation),
         message = VALUES(message),
         profileImage = VALUES(profileImage),
         linkedinUrl = VALUES(linkedinUrl)`,
      [ceoName, designation, message, profileImage || null, linkedinUrl || null],
    );

    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM AboutCeo WHERE singletonKey = 'default' LIMIT 1");
    return NextResponse.json({ success: true, ceo: rows[0] ?? null });
  } catch (error: unknown) {
    console.error("about-ceo POST error", error);
    if (typeof error === "object" && error !== null && "code" in error && (error as { code?: string }).code === "ER_DATA_TOO_LONG") {
      return NextResponse.json(
        { success: false, error: "Image is too large. Please upload a smaller image." },
        { status: 413 },
      );
    }
    return NextResponse.json({ success: false, error: "Failed to save CEO profile" }, { status: 500 });
  }
}
