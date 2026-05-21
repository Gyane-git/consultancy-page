import { NextResponse } from "next/server";
import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import getPool from "@/lib/db";

type CourseRow = RowDataPacket & {
  id: number;
  slug: string;
  name: string;
  heroTitle: string;
  introText: string;
  whyTitle: string;
  whyDescription: string | null;
  whyPoints: string | null;
  ieltsNote: string | null;
  ieltsRows: string | null;
  tabOneTitle: string;
  tabOneDescription: string | null;
  tabOneDetails: string | null;
  tabOneScope: string | null;
  tabTwoTitle: string | null;
  tabTwoDescription: string | null;
  tabTwoDetails: string | null;
  thumbnail: string | null;
  isActive: number;
  displayOrder: number;
};

function parseJsonArray(raw: string | null) {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function mapCourse(row: CourseRow) {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    heroTitle: row.heroTitle,
    introText: row.introText,
    whyTitle: row.whyTitle,
    whyDescription: row.whyDescription || "",
    whyPoints: parseJsonArray(row.whyPoints),
    ieltsNote: row.ieltsNote || "",
    ieltsRows: parseJsonArray(row.ieltsRows),
    tabOneTitle: row.tabOneTitle,
    tabOneDescription: row.tabOneDescription || "",
    tabOneDetails: parseJsonArray(row.tabOneDetails),
    tabOneScope: parseJsonArray(row.tabOneScope),
    tabTwoTitle: row.tabTwoTitle || "Undergraduate Study",
    tabTwoDescription: row.tabTwoDescription || "",
    tabTwoDetails: parseJsonArray(row.tabTwoDetails),
    thumbnail: row.thumbnail || "",
    isActive: Boolean(row.isActive),
    displayOrder: row.displayOrder || 0,
  };
}

async function ensureTable() {
  const pool = getPool();
  await pool.query(`
    CREATE TABLE IF NOT EXISTS PopularCourse (
      id INT NOT NULL AUTO_INCREMENT,
      slug VARCHAR(140) NOT NULL,
      name VARCHAR(255) NOT NULL,
      heroTitle VARCHAR(255) NOT NULL,
      introText LONGTEXT NOT NULL,
      whyTitle VARCHAR(255) NOT NULL,
      whyDescription TEXT NULL,
      whyPoints LONGTEXT NULL,
      ieltsNote TEXT NULL,
      ieltsRows LONGTEXT NULL,
      tabOneTitle VARCHAR(255) NOT NULL,
      tabOneDescription LONGTEXT NULL,
      tabOneDetails LONGTEXT NULL,
      tabOneScope LONGTEXT NULL,
      tabTwoTitle VARCHAR(255) NULL,
      tabTwoDescription LONGTEXT NULL,
      tabTwoDetails LONGTEXT NULL,
      thumbnail LONGTEXT NULL,
      isActive TINYINT(1) NOT NULL DEFAULT 1,
      displayOrder INT NOT NULL DEFAULT 0,
      createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY uniq_popular_course_slug (slug)
    )
  `);

  const [countRows] = await pool.query<RowDataPacket[]>("SELECT COUNT(*) AS total FROM PopularCourse");
  const total = Number(countRows?.[0]?.total || 0);
  if (total > 0) return;

  await pool.query(
    `INSERT INTO PopularCourse
      (slug, name, heroTitle, introText, whyTitle, whyDescription, whyPoints, ieltsNote, ieltsRows, tabOneTitle, tabOneDescription, tabOneDetails, tabOneScope, tabTwoTitle, tabTwoDescription, tabTwoDetails, thumbnail, isActive, displayOrder)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 1)`,
    [
      "study-it-in-australia",
      "Study IT in Australia",
      "Study Information Technology (IT) in Australia",
      "Information Technology is a field of study that includes computers and electronic systems for communication and innovation.\n\nWith global demand for digital skills, IT remains one of the strongest career pathways for international students.",
      "Why study Information Technology in Australia?",
      "Top reasons students choose Australia for IT studies.",
      JSON.stringify([
        "Strong IT job market and future demand.",
        "Higher salary potential for graduates.",
        "Flexible career pathways in multiple IT domains.",
        "Industry-integrated learning opportunities.",
      ]),
      "Generally, IELTS overall 6.0+ is required, but this can vary by institution.",
      JSON.stringify([
        { name: "University of Melbourne", score: "7.0" },
        { name: "University of Sydney", score: "6.5" },
        { name: "University of Adelaide", score: "5.5" },
      ]),
      "Diploma / Advanced Diploma",
      "A diploma pathway is faster and practical, usually completed in around 52 weeks depending on institution.",
      JSON.stringify([
        { label: "Entry Requirement", value: "Year 12 or Equivalent" },
        { label: "Course Duration", value: "52 Weeks" },
        { label: "Avg. Salary", value: "US$40k / yr" },
      ]),
      JSON.stringify(["eLearning Manager", "IT Manager", "ICT Project Manager", "Quality Assurance Manager"]),
      "Undergraduate Study",
      "An undergraduate IT degree is a globally recognized pathway that opens broad professional opportunities.",
      JSON.stringify([
        { label: "Entry Requirement", value: "Year 12 or Equivalent" },
        { label: "Course Duration", value: "3 Years" },
        { label: "IELTS Required", value: "6.0+" },
      ]),
      "",
    ]
  );
}

function normalizeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function GET(request: Request) {
  try {
    await ensureTable();
    const pool = getPool();
    const { searchParams } = new URL(request.url);
    const slug = String(searchParams.get("slug") || "").trim().toLowerCase();
    const includeInactive = searchParams.get("all") === "1";
    if (slug) {
      const [rows] = await pool.query<CourseRow[]>("SELECT * FROM PopularCourse WHERE slug = ? LIMIT 1", [slug]);
      return NextResponse.json({ success: true, course: rows[0] ? mapCourse(rows[0]) : null });
    }
    const [rows] = await pool.query<CourseRow[]>(
      includeInactive ? "SELECT * FROM PopularCourse ORDER BY displayOrder ASC, id ASC" : "SELECT * FROM PopularCourse WHERE isActive = 1 ORDER BY displayOrder ASC, id ASC"
    );
    return NextResponse.json({ success: true, courses: rows.map(mapCourse) });
  } catch (error) {
    console.error("popular-courses GET error", error);
    return NextResponse.json({ success: false, error: "Failed to fetch courses" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureTable();
    const pool = getPool();
    const payload = await request.json();
    const slug = normalizeSlug(String(payload?.slug || ""));
    const name = String(payload?.name || "").trim();
    const heroTitle = String(payload?.heroTitle || name).trim();
    const introText = String(payload?.introText || "").trim();
    const whyTitle = String(payload?.whyTitle || "").trim();
    const whyDescription = String(payload?.whyDescription || "").trim();
    const tabOneTitle = String(payload?.tabOneTitle || "").trim();
    if (!slug || !name || !heroTitle || !introText || !whyTitle || !tabOneTitle) {
      return NextResponse.json({ success: false, error: "Required fields are missing." }, { status: 400 });
    }
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO PopularCourse
       (slug, name, heroTitle, introText, whyTitle, whyDescription, whyPoints, ieltsNote, ieltsRows, tabOneTitle, tabOneDescription, tabOneDetails, tabOneScope, tabTwoTitle, tabTwoDescription, tabTwoDetails, thumbnail, isActive, displayOrder)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        slug,
        name,
        heroTitle,
        introText,
        whyTitle,
        whyDescription || null,
        JSON.stringify(Array.isArray(payload?.whyPoints) ? payload.whyPoints : []),
        String(payload?.ieltsNote || "").trim() || null,
        JSON.stringify(Array.isArray(payload?.ieltsRows) ? payload.ieltsRows : []),
        tabOneTitle,
        String(payload?.tabOneDescription || "").trim() || null,
        JSON.stringify(Array.isArray(payload?.tabOneDetails) ? payload.tabOneDetails : []),
        JSON.stringify(Array.isArray(payload?.tabOneScope) ? payload.tabOneScope : []),
        String(payload?.tabTwoTitle || "Undergraduate Study").trim() || null,
        String(payload?.tabTwoDescription || "").trim() || null,
        JSON.stringify(Array.isArray(payload?.tabTwoDetails) ? payload.tabTwoDetails : []),
        String(payload?.thumbnail || "").trim() || null,
        payload?.isActive === false ? 0 : 1,
        Number(payload?.displayOrder || 0),
      ]
    );
    const [rows] = await pool.query<CourseRow[]>("SELECT * FROM PopularCourse WHERE id = ?", [result.insertId]);
    return NextResponse.json({ success: true, course: rows[0] ? mapCourse(rows[0]) : null });
  } catch (error: unknown) {
    console.error("popular-courses POST error", error);
    if (typeof error === "object" && error !== null && "code" in error && (error as { code?: string }).code === "ER_DUP_ENTRY") {
      return NextResponse.json({ success: false, error: "Course slug already exists" }, { status: 409 });
    }
    return NextResponse.json({ success: false, error: "Failed to create course" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await ensureTable();
    const pool = getPool();
    const payload = await request.json();
    const id = Number(payload?.id || 0);
    if (!id) return NextResponse.json({ success: false, error: "Valid id is required." }, { status: 400 });

    const slug = normalizeSlug(String(payload?.slug || ""));
    const name = String(payload?.name || "").trim();
    const heroTitle = String(payload?.heroTitle || name).trim();
    const introText = String(payload?.introText || "").trim();
    const whyTitle = String(payload?.whyTitle || "").trim();
    const whyDescription = String(payload?.whyDescription || "").trim();
    const tabOneTitle = String(payload?.tabOneTitle || "").trim();
    if (!slug || !name || !heroTitle || !introText || !whyTitle || !tabOneTitle) {
      return NextResponse.json({ success: false, error: "Required fields are missing." }, { status: 400 });
    }

    await pool.query(
      `UPDATE PopularCourse SET
        slug = ?, name = ?, heroTitle = ?, introText = ?, whyTitle = ?, whyDescription = ?, whyPoints = ?, ieltsNote = ?, ieltsRows = ?,
        tabOneTitle = ?, tabOneDescription = ?, tabOneDetails = ?, tabOneScope = ?, tabTwoTitle = ?, tabTwoDescription = ?, tabTwoDetails = ?,
        thumbnail = ?, isActive = ?, displayOrder = ?
       WHERE id = ?`,
      [
        slug,
        name,
        heroTitle,
        introText,
        whyTitle,
        whyDescription || null,
        JSON.stringify(Array.isArray(payload?.whyPoints) ? payload.whyPoints : []),
        String(payload?.ieltsNote || "").trim() || null,
        JSON.stringify(Array.isArray(payload?.ieltsRows) ? payload.ieltsRows : []),
        tabOneTitle,
        String(payload?.tabOneDescription || "").trim() || null,
        JSON.stringify(Array.isArray(payload?.tabOneDetails) ? payload.tabOneDetails : []),
        JSON.stringify(Array.isArray(payload?.tabOneScope) ? payload.tabOneScope : []),
        String(payload?.tabTwoTitle || "Undergraduate Study").trim() || null,
        String(payload?.tabTwoDescription || "").trim() || null,
        JSON.stringify(Array.isArray(payload?.tabTwoDetails) ? payload.tabTwoDetails : []),
        String(payload?.thumbnail || "").trim() || null,
        payload?.isActive === false ? 0 : 1,
        Number(payload?.displayOrder || 0),
        id,
      ]
    );
    const [rows] = await pool.query<CourseRow[]>("SELECT * FROM PopularCourse WHERE id = ?", [id]);
    return NextResponse.json({ success: true, course: rows[0] ? mapCourse(rows[0]) : null });
  } catch (error: unknown) {
    console.error("popular-courses PUT error", error);
    if (typeof error === "object" && error !== null && "code" in error && (error as { code?: string }).code === "ER_DUP_ENTRY") {
      return NextResponse.json({ success: false, error: "Course slug already exists" }, { status: 409 });
    }
    return NextResponse.json({ success: false, error: "Failed to update course" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await ensureTable();
    const pool = getPool();
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get("id") || 0);
    if (!id) return NextResponse.json({ success: false, error: "Valid id is required." }, { status: 400 });
    await pool.query("DELETE FROM PopularCourse WHERE id = ?", [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("popular-courses DELETE error", error);
    return NextResponse.json({ success: false, error: "Failed to delete course" }, { status: 500 });
  }
}
