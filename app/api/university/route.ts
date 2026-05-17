import { NextResponse } from "next/server";
import getPool from "@/lib/db";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

type UniversityRow = RowDataPacket & {
  id: number;
  name: string;
  logo: string | null;
  country: string | null;
  courseName: string | null;
  courseDescription: string | null;
  supportImage: string | null;
  videoUrl: string | null;
  isActive: number | boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
};

const defaultUniversities = [
  { name: "University of York", logo: "/uni/University-of-York.png", country: "UK" },
  { name: "AUC School of Medicine", logo: "/uni/american-university-of-the-caribbean-school-of-medicine-logo.png", country: "Caribbean" },
  { name: "Amsterdam School of the Arts", logo: "/uni/amsterdam-school-of-the-arts-logo.png", country: "Netherlands" },
  { name: "Aureus University", logo: "/uni/aureus-university-school-of-medicine-logo.png", country: "Aruba" },
  { name: "Autonomous University of Barcelona", logo: "/uni/autonomous-university-of-barcelona-logo.png", country: "Spain" },
  { name: "Avans University", logo: "/uni/avans-university-of-applied-sciences-logo.png", country: "Netherlands" },
  { name: "Codarts University", logo: "/uni/codarts-university-of-the-arts-logo.png", country: "Netherlands" },
  { name: "Delft University of Technology", logo: "/uni/delft-university-of-technology-logo.png", country: "Netherlands" },
  { name: "Durham University", logo: "/uni/durham-university-logo.png", country: "UK" },
  { name: "University of Exeter", logo: "/uni/University-of-Exeter.png", country: "UK" },
  { name: "Oxford University", logo: "/uni/oxford.png", country: "UK" },
  { name: "University of Manchester", logo: "/uni/the-university-of-manchester-logo.png", country: "UK" },
];

function mapUniversity(row: UniversityRow) {
  return {
    id: row.id,
    name: row.name,
    logo: row.logo,
    country: row.country,
    courseName: row.courseName,
    courseDescription: row.courseDescription,
    supportImage: row.supportImage,
    videoUrl: row.videoUrl,
    isActive: Boolean(row.isActive),
    displayOrder: row.displayOrder,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

async function ensureUniversityTable() {
  const pool = getPool();
  await pool.query(`
    CREATE TABLE IF NOT EXISTS UniversityContent (
      id INT NOT NULL AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      logo LONGTEXT NULL,
      country VARCHAR(120) NULL,
      courseName VARCHAR(255) NULL,
      courseDescription LONGTEXT NULL,
      supportImage LONGTEXT NULL,
      videoUrl VARCHAR(1400) NULL,
      isActive BOOLEAN NOT NULL DEFAULT true,
      displayOrder INT NOT NULL DEFAULT 0,
      createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
    )
  `);

  const [rows] = await pool.query<RowDataPacket[]>("SELECT COUNT(*) AS total FROM UniversityContent");
  const total = Number(rows?.[0]?.total ?? 0);
  if (total > 0) return;

  for (let i = 0; i < defaultUniversities.length; i += 1) {
    const uni = defaultUniversities[i];
    await pool.query(
      `INSERT INTO UniversityContent (name, logo, country, courseName, courseDescription, supportImage, videoUrl, isActive, displayOrder)
       VALUES (?, ?, ?, ?, ?, ?, ?, true, ?)`,
      [
        uni.name,
        uni.logo,
        uni.country,
        null,
        null,
        null,
        null,
        i,
      ],
    );
  }
}

export async function GET(request: Request) {
  try {
    await ensureUniversityTable();
    const { searchParams } = new URL(request.url);
    const includeInactive = searchParams.get("all") === "1";
    const id = Number(searchParams.get("id"));
    const pool = getPool();

    if (Number.isFinite(id) && id > 0) {
      const [rows] = await pool.query<UniversityRow[]>("SELECT * FROM UniversityContent WHERE id = ? LIMIT 1", [id]);
      return NextResponse.json({ success: true, university: rows[0] ? mapUniversity(rows[0]) : null });
    }

    const [rows] = await pool.query<UniversityRow[]>(
      includeInactive
        ? "SELECT * FROM UniversityContent ORDER BY displayOrder ASC, id DESC"
        : "SELECT * FROM UniversityContent WHERE isActive = true ORDER BY displayOrder ASC, id DESC",
    );
    return NextResponse.json({ success: true, universities: rows.map(mapUniversity) });
  } catch (error) {
    console.error("university GET error", error);
    return NextResponse.json({ success: false, error: "Failed to fetch universities" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureUniversityTable();
    const payload = await request.json();
    const pool = getPool();

    const name = String(payload?.name ?? "").trim();
    const logo = String(payload?.logo ?? "").trim();
    const country = String(payload?.country ?? "").trim();
    const courseName = String(payload?.courseName ?? "").trim();
    const courseDescription = String(payload?.courseDescription ?? "").trim();
    const supportImage = String(payload?.supportImage ?? "").trim();
    const videoUrl = String(payload?.videoUrl ?? "").trim();
    const displayOrder = Number(payload?.displayOrder ?? 0);

    if (!name) {
      return NextResponse.json({ success: false, error: "University name is required" }, { status: 400 });
    }

    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO UniversityContent
       (name, logo, country, courseName, courseDescription, supportImage, videoUrl, isActive, displayOrder)
       VALUES (?, ?, ?, ?, ?, ?, ?, true, ?)`,
      [
        name,
        logo || null,
        country || null,
        courseName || null,
        courseDescription || null,
        supportImage || null,
        videoUrl || null,
        Number.isFinite(displayOrder) ? displayOrder : 0,
      ],
    );

    const [rows] = await pool.query<UniversityRow[]>("SELECT * FROM UniversityContent WHERE id = ?", [result.insertId]);
    return NextResponse.json({ success: true, university: rows[0] ? mapUniversity(rows[0]) : null });
  } catch (error) {
    console.error("university POST error", error);
    return NextResponse.json({ success: false, error: "Failed to create university" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await ensureUniversityTable();
    const payload = await request.json();
    const pool = getPool();

    const id = Number(payload?.id);
    const name = String(payload?.name ?? "").trim();
    const logo = String(payload?.logo ?? "").trim();
    const country = String(payload?.country ?? "").trim();
    const courseName = String(payload?.courseName ?? "").trim();
    const courseDescription = String(payload?.courseDescription ?? "").trim();
    const supportImage = String(payload?.supportImage ?? "").trim();
    const videoUrl = String(payload?.videoUrl ?? "").trim();
    const displayOrder = Number(payload?.displayOrder ?? 0);
    const isActive = payload?.isActive !== false;

    if (!Number.isFinite(id) || id <= 0) {
      return NextResponse.json({ success: false, error: "Valid id is required" }, { status: 400 });
    }
    if (!name) {
      return NextResponse.json({ success: false, error: "University name is required" }, { status: 400 });
    }

    await pool.query(
      `UPDATE UniversityContent
       SET name = ?, logo = ?, country = ?, courseName = ?, courseDescription = ?, supportImage = ?, videoUrl = ?, displayOrder = ?, isActive = ?
       WHERE id = ?`,
      [
        name,
        logo || null,
        country || null,
        courseName || null,
        courseDescription || null,
        supportImage || null,
        videoUrl || null,
        Number.isFinite(displayOrder) ? displayOrder : 0,
        isActive,
        id,
      ],
    );

    const [rows] = await pool.query<UniversityRow[]>("SELECT * FROM UniversityContent WHERE id = ?", [id]);
    return NextResponse.json({ success: true, university: rows[0] ? mapUniversity(rows[0]) : null });
  } catch (error) {
    console.error("university PUT error", error);
    return NextResponse.json({ success: false, error: "Failed to update university" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await ensureUniversityTable();
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get("id"));
    if (!Number.isFinite(id) || id <= 0) {
      return NextResponse.json({ success: false, error: "Valid id is required" }, { status: 400 });
    }

    const pool = getPool();
    await pool.query("DELETE FROM UniversityContent WHERE id = ?", [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("university DELETE error", error);
    return NextResponse.json({ success: false, error: "Failed to delete university" }, { status: 500 });
  }
}
