import { NextResponse } from "next/server";
import getPool from "@/lib/db";
import { ensureContentTables } from "@/lib/content-store";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

export async function GET(request: Request) {
  try {
    await ensureContentTables();
    const { searchParams } = new URL(request.url);
    const includeInactive = searchParams.get("all") === "1";

    const pool = getPool();
    const query = includeInactive
      ? "SELECT * FROM StaffProfile ORDER BY displayOrder ASC, id DESC"
      : "SELECT * FROM StaffProfile WHERE isActive = true ORDER BY displayOrder ASC, id DESC";

    const [rows] = await pool.query<RowDataPacket[]>(query);
    return NextResponse.json({ success: true, staff: rows });
  } catch (error) {
    console.error("staff-profile GET error", error);
    return NextResponse.json({ success: false, error: "Failed to fetch staff profiles" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureContentTables();
    const payload = await request.json();
    const pool = getPool();

    const name = String(payload?.name ?? "").trim();
    const designation = String(payload?.designation ?? "").trim();
    const image = String(payload?.image ?? "").trim();
    const socialUrl = String(payload?.socialUrl ?? "").trim();
    const displayOrder = Number(payload?.displayOrder ?? 0);

    if (!name || !designation) {
      return NextResponse.json({ success: false, error: "name and designation are required" }, { status: 400 });
    }

    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO StaffProfile (name, designation, image, socialUrl, displayOrder, isActive) VALUES (?, ?, ?, ?, ?, true)",
      [name, designation, image || null, socialUrl || null, Number.isFinite(displayOrder) ? displayOrder : 0],
    );

    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM StaffProfile WHERE id = ?", [result.insertId]);
    return NextResponse.json({ success: true, staff: rows[0] ?? null });
  } catch (error) {
    console.error("staff-profile POST error", error);
    return NextResponse.json({ success: false, error: "Failed to create staff profile" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await ensureContentTables();
    const payload = await request.json();
    const pool = getPool();

    const id = Number(payload?.id);
    const name = String(payload?.name ?? "").trim();
    const designation = String(payload?.designation ?? "").trim();
    const image = String(payload?.image ?? "").trim();
    const socialUrl = String(payload?.socialUrl ?? "").trim();
    const displayOrder = Number(payload?.displayOrder ?? 0);
    const isActive = payload?.isActive !== false;

    if (!Number.isFinite(id) || id <= 0) {
      return NextResponse.json({ success: false, error: "Valid id is required" }, { status: 400 });
    }

    if (!name || !designation) {
      return NextResponse.json({ success: false, error: "name and designation are required" }, { status: 400 });
    }

    await pool.query(
      `UPDATE StaffProfile
       SET name = ?, designation = ?, image = ?, socialUrl = ?, displayOrder = ?, isActive = ?
       WHERE id = ?`,
      [name, designation, image || null, socialUrl || null, Number.isFinite(displayOrder) ? displayOrder : 0, isActive, id],
    );

    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM StaffProfile WHERE id = ?", [id]);
    return NextResponse.json({ success: true, staff: rows[0] ?? null });
  } catch (error) {
    console.error("staff-profile PUT error", error);
    return NextResponse.json({ success: false, error: "Failed to update staff profile" }, { status: 500 });
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
    await pool.query("DELETE FROM StaffProfile WHERE id = ?", [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("staff-profile DELETE error", error);
    return NextResponse.json({ success: false, error: "Failed to delete staff profile" }, { status: 500 });
  }
}
