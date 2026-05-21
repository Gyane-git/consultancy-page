import { NextResponse } from "next/server";
import getPool from "@/lib/db";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

type CourseRow = RowDataPacket & {
  id: number;
  testType: string;
  courseTime: string | null;
  title: string;
  target: string | null;
  price: string | null;
  description: string | null;
  breakdown: string | null;
  displayOrder: number;
  isActive: number | boolean;
  createdAt: string;
  updatedAt: string;
};

const allowedTypes = new Set(["ielts", "pte", "duolingo"]);

function normalizeType(value: unknown) {
  const v = String(value ?? "").trim().toLowerCase();
  return allowedTypes.has(v) ? v : "";
}

function mapCourse(row: CourseRow) {
  let breakdown: string[] = [];
  try {
    breakdown = row.breakdown ? JSON.parse(row.breakdown) : [];
  } catch {
    breakdown = [];
  }

  return {
    id: row.id,
    testType: row.testType,
    courseTime: row.courseTime,
    title: row.title,
    target: row.target,
    price: row.price,
    description: row.description,
    breakdown,
    displayOrder: row.displayOrder,
    isActive: Boolean(row.isActive),
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

const seeds = [
  { testType: "ielts", courseTime: "8 Weeks", title: "Foundation Course", target: "Beginner", price: "NPR 10,000", description: "Complete IELTS concept clarity.", breakdown: ["Listening", "Reading", "Writing", "Speaking", "Mock Tests"], displayOrder: 0 },
  { testType: "ielts", courseTime: "5 Weeks", title: "Advanced Classes", target: "6 – 7+", price: "NPR 5,000", description: "Targeted IELTS drills.", breakdown: ["Listening", "Reading", "Writing", "Speaking", "Mock"], displayOrder: 1 },
  { testType: "pte", courseTime: "6 Weeks", title: "PTE Foundation", target: "Beginner", price: "NPR 8,000", description: "Complete PTE fundamentals.", breakdown: ["Speaking", "Writing", "Reading", "Listening"], displayOrder: 0 },
  { testType: "pte", courseTime: "5 Weeks", title: "PTE Intensive", target: "50 – 65", price: "NPR 7,000", description: "High-weight PTE tasks focus.", breakdown: ["Read Aloud", "Repeat Sentence", "Essay", "Mock"], displayOrder: 1 },
  { testType: "duolingo", courseTime: "4 Weeks", title: "DET Starter", target: "Beginner", price: "NPR 6,000", description: "DET format from zero.", breakdown: ["Literacy", "Comprehension", "Conversation", "Production"], displayOrder: 0 },
  { testType: "duolingo", courseTime: "5 Weeks", title: "DET Core", target: "90 – 110", price: "NPR 7,000", description: "Structured DET prep.", breakdown: ["Vocabulary", "Grammar", "Speaking", "Writing", "Mock"], displayOrder: 1 },
];

async function ensureTable() {
  const pool = getPool();
  await pool.query(`
    CREATE TABLE IF NOT EXISTS EnglishCourseProgram (
      id INT NOT NULL AUTO_INCREMENT,
      testType VARCHAR(40) NOT NULL,
      courseTime VARCHAR(120) NULL,
      title VARCHAR(255) NOT NULL,
      target VARCHAR(120) NULL,
      price VARCHAR(120) NULL,
      description LONGTEXT NULL,
      breakdown LONGTEXT NULL,
      displayOrder INT NOT NULL DEFAULT 0,
      isActive BOOLEAN NOT NULL DEFAULT true,
      createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
    )
  `);

  const [rows] = await pool.query<RowDataPacket[]>("SELECT COUNT(*) AS total FROM EnglishCourseProgram");
  if (Number(rows?.[0]?.total ?? 0) > 0) return;

  for (const item of seeds) {
    await pool.query(
      `INSERT INTO EnglishCourseProgram (testType, courseTime, title, target, price, description, breakdown, displayOrder, isActive)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, true)`,
      [item.testType, item.courseTime, item.title, item.target, item.price, item.description, JSON.stringify(item.breakdown), item.displayOrder],
    );
  }
}

export async function GET(request: Request) {
  try {
    await ensureTable();
    const { searchParams } = new URL(request.url);
    const testType = normalizeType(searchParams.get("testType"));
    const includeInactive = searchParams.get("all") === "1";

    const pool = getPool();
    let query = includeInactive
      ? "SELECT * FROM EnglishCourseProgram"
      : "SELECT * FROM EnglishCourseProgram WHERE isActive = true";
    const params: unknown[] = [];

    if (testType) {
      query += includeInactive ? " WHERE testType = ?" : " AND testType = ?";
      params.push(testType);
    }

    query += " ORDER BY testType ASC, displayOrder ASC, id DESC";

    const [rows] = await pool.query<CourseRow[]>(query, params);
    return NextResponse.json({ success: true, courses: rows.map(mapCourse) });
  } catch (error) {
    console.error("eng-courses GET error", error);
    return NextResponse.json({ success: false, error: "Failed to fetch course programs" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureTable();
    const payload = await request.json();
    const pool = getPool();

    const testType = normalizeType(payload?.testType);
    const courseTime = String(payload?.courseTime ?? "").trim();
    const title = String(payload?.title ?? "").trim();
    const target = String(payload?.target ?? "").trim();
    const price = String(payload?.price ?? "").trim();
    const description = String(payload?.description ?? "").trim();
    const breakdown = Array.isArray(payload?.breakdown)
      ? payload.breakdown.map((b: unknown) => String(b).trim()).filter(Boolean)
      : String(payload?.breakdownText ?? "").split("\n").map((b) => b.trim()).filter(Boolean);
    const displayOrder = Number(payload?.displayOrder ?? 0);

    if (!testType || !title) {
      return NextResponse.json({ success: false, error: "testType and title are required" }, { status: 400 });
    }

    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO EnglishCourseProgram (testType, courseTime, title, target, price, description, breakdown, displayOrder, isActive)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, true)`,
      [testType, courseTime || null, title, target || null, price || null, description || null, JSON.stringify(breakdown), Number.isFinite(displayOrder) ? displayOrder : 0],
    );

    const [rows] = await pool.query<CourseRow[]>("SELECT * FROM EnglishCourseProgram WHERE id = ?", [result.insertId]);
    return NextResponse.json({ success: true, course: rows[0] ? mapCourse(rows[0]) : null });
  } catch (error) {
    console.error("eng-courses POST error", error);
    return NextResponse.json({ success: false, error: "Failed to create course program" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await ensureTable();
    const payload = await request.json();
    const pool = getPool();

    const id = Number(payload?.id);
    const testType = normalizeType(payload?.testType);
    const courseTime = String(payload?.courseTime ?? "").trim();
    const title = String(payload?.title ?? "").trim();
    const target = String(payload?.target ?? "").trim();
    const price = String(payload?.price ?? "").trim();
    const description = String(payload?.description ?? "").trim();
    const breakdown = Array.isArray(payload?.breakdown)
      ? payload.breakdown.map((b: unknown) => String(b).trim()).filter(Boolean)
      : String(payload?.breakdownText ?? "").split("\n").map((b) => b.trim()).filter(Boolean);
    const displayOrder = Number(payload?.displayOrder ?? 0);
    const isActive = payload?.isActive !== false;

    if (!Number.isFinite(id) || id <= 0 || !testType || !title) {
      return NextResponse.json({ success: false, error: "Valid id, testType and title are required" }, { status: 400 });
    }

    await pool.query(
      `UPDATE EnglishCourseProgram
       SET testType = ?, courseTime = ?, title = ?, target = ?, price = ?, description = ?, breakdown = ?, displayOrder = ?, isActive = ?
       WHERE id = ?`,
      [testType, courseTime || null, title, target || null, price || null, description || null, JSON.stringify(breakdown), Number.isFinite(displayOrder) ? displayOrder : 0, isActive, id],
    );

    const [rows] = await pool.query<CourseRow[]>("SELECT * FROM EnglishCourseProgram WHERE id = ?", [id]);
    return NextResponse.json({ success: true, course: rows[0] ? mapCourse(rows[0]) : null });
  } catch (error) {
    console.error("eng-courses PUT error", error);
    return NextResponse.json({ success: false, error: "Failed to update course program" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await ensureTable();
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get("id"));
    if (!Number.isFinite(id) || id <= 0) {
      return NextResponse.json({ success: false, error: "Valid id is required" }, { status: 400 });
    }

    const pool = getPool();
    await pool.query("DELETE FROM EnglishCourseProgram WHERE id = ?", [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("eng-courses DELETE error", error);
    return NextResponse.json({ success: false, error: "Failed to delete course program" }, { status: 500 });
  }
}
