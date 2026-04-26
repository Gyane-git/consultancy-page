import { NextResponse } from "next/server";
import getPool from "@/lib/db";
import { ensureContentTables } from "@/lib/content-store";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

export async function GET() {
  try {
    await ensureContentTables();
    const pool = getPool();
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM ConsultationRequest ORDER BY createdAt DESC");
    return NextResponse.json({ success: true, consultations: rows });
  } catch (error) {
    console.error("consultations GET error", error);
    return NextResponse.json({ success: false, error: "Failed to fetch consultation requests" }, { status: 500 });
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
    const nationality = String(payload?.nationality ?? "").trim();
    const studyDestination = String(payload?.studyDestination ?? "").trim();
    const studyLevel = String(payload?.studyLevel ?? "").trim();
    const fieldOfStudy = String(payload?.fieldOfStudy ?? "").trim();
    const goals = JSON.stringify(Array.isArray(payload?.goals) ? payload.goals : []);
    const challenges = String(payload?.challenges ?? "").trim();
    const preferredDate = String(payload?.preferredDate ?? "").trim();
    const preferredTime = String(payload?.preferredTime ?? "").trim();
    const consultationType = String(payload?.consultationType ?? "").trim();
    const additionalInfo = String(payload?.additionalInfo ?? "").trim();

    if (!name || !email) {
      return NextResponse.json({ success: false, error: "name and email are required" }, { status: 400 });
    }

    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO ConsultationRequest (
        name, email, phone, nationality, studyDestination, studyLevel, fieldOfStudy,
        goals, challenges, preferredDate, preferredTime, consultationType, additionalInfo, status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new')`,
      [
        name,
        email,
        phone || null,
        nationality || null,
        studyDestination || null,
        studyLevel || null,
        fieldOfStudy || null,
        goals,
        challenges || null,
        preferredDate || null,
        preferredTime || null,
        consultationType || null,
        additionalInfo || null,
      ],
    );

    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM ConsultationRequest WHERE id = ?", [result.insertId]);
    return NextResponse.json({ success: true, consultation: rows[0] ?? null });
  } catch (error) {
    console.error("consultations POST error", error);
    return NextResponse.json({ success: false, error: "Failed to submit consultation request" }, { status: 500 });
  }
}
