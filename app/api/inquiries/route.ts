import { NextResponse } from "next/server";
import getPool from "@/lib/db";
import { ensureContentTables } from "@/lib/content-store";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

export async function GET() {
  try {
    await ensureContentTables();
    const pool = getPool();
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM ContactRequest ORDER BY createdAt DESC");
    return NextResponse.json({ success: true, inquiries: rows });
  } catch (error) {
    console.error("inquiries GET error", error);
    return NextResponse.json({ success: false, error: "Failed to fetch inquiries" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureContentTables();
    const payload = await request.json();
    const pool = getPool();

    const name = String(payload?.name ?? "").trim();
    const email = String(payload?.email ?? "").trim();
    const phone = String(payload?.phone ?? "").trim();
    const preferredTime = String(payload?.time ?? payload?.preferredTime ?? "").trim();
    const subject = String(payload?.subject ?? "").trim();
    const message = String(payload?.message ?? "").trim();

    if (!name || !email) {
      return NextResponse.json({ success: false, error: "name and email are required" }, { status: 400 });
    }

    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO ContactRequest (name, email, phone, preferredTime, subject, message, status)
       VALUES (?, ?, ?, ?, ?, ?, 'new')`,
      [name, email, phone || null, preferredTime || null, subject || null, message || null],
    );

    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM ContactRequest WHERE id = ?", [result.insertId]);
    return NextResponse.json({ success: true, inquiry: rows[0] ?? null });
  } catch (error) {
    console.error("inquiries POST error", error);
    return NextResponse.json({ success: false, error: "Failed to submit inquiry" }, { status: 500 });
  }
}
