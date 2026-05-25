import { NextResponse } from "next/server";
import getPool from "@/lib/db";
import { ensureContentTables } from "@/lib/content-store";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

type DestinationDbRow = RowDataPacket & {
  id: number;
  slug: string;
  name: string;
  shortText: string | null;
  long_description: string | null;
  bannerTitle: string | null;
  bodyImage: string | null;
  whyStudy: string | null;
  topUniversities: string | null;
  eligibilityProcess: string | null;
  costScholarships: string | null;
  applicationProcess: string | null;
  afterReaching: string | null;
  isActive: number | boolean;
  createdAt: string;
  updatedAt: string;
};

function normalizeSlug(input: unknown) {
  return String(input ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function mapDestinationRow(row: DestinationDbRow) {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    shortText: row.shortText,
    longText: row.long_description,
    bannerTitle: row.bannerTitle,
    bodyImage: row.bodyImage,
    whyStudy: row.whyStudy,
    topUniversities: row.topUniversities,
    eligibilityProcess: row.eligibilityProcess,
    costScholarships: row.costScholarships,
    applicationProcess: row.applicationProcess,
    afterReaching: row.afterReaching,
    isActive: Boolean(row.isActive),
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

export async function GET(request: Request) {
  try {
    await ensureContentTables();
    const pool = getPool();
    const { searchParams } = new URL(request.url);
    const slug = normalizeSlug(searchParams.get("slug"));

    if (slug) {
      const [rows] = await pool.query<DestinationDbRow[]>(
        `SELECT id, slug, name, shortText, long_description, bannerTitle, bodyImage, whyStudy, topUniversities,
                eligibilityProcess, costScholarships, applicationProcess, afterReaching, isActive, createdAt, updatedAt
         FROM DestinationContent WHERE slug = ? LIMIT 1`,
        [slug],
      );
      const destination = rows[0] ? mapDestinationRow(rows[0]) : null;
      return NextResponse.json({ success: true, destination });
    }

    const [rows] = await pool.query<DestinationDbRow[]>(
      `SELECT id, slug, name, shortText, long_description, bannerTitle, bodyImage, whyStudy, topUniversities,
              eligibilityProcess, costScholarships, applicationProcess, afterReaching, isActive, createdAt, updatedAt
       FROM DestinationContent WHERE isActive = true ORDER BY name ASC`,
    );
    return NextResponse.json({ success: true, destinations: rows.map(mapDestinationRow) });
  } catch (error) {
    console.error("destination GET error", error);
    return NextResponse.json({ success: false, error: "Failed to fetch destinations" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureContentTables();
    const payload = await request.json();
    const pool = getPool();

    const slug = normalizeSlug(payload?.slug);
    const name = String(payload?.name ?? "").trim();
    const shortText = String(payload?.shortText ?? "").trim();
    const longText = String(payload?.longText ?? "").trim();
    const bannerTitle = String(payload?.bannerTitle ?? "").trim();
    const bodyImage = String(payload?.bodyImage ?? "").trim();
    const whyStudy = String(payload?.whyStudy ?? "").trim();
    const topUniversities = String(payload?.topUniversities ?? "").trim();
    const eligibilityProcess = String(payload?.eligibilityProcess ?? "").trim();
    const costScholarships = String(payload?.costScholarships ?? "").trim();
    const applicationProcess = String(payload?.applicationProcess ?? "").trim();
    const afterReaching = String(payload?.afterReaching ?? "").trim();

    if (!slug || !name) {
      return NextResponse.json(
        { success: false, error: "Valid slug and destination name are required" },
        { status: 400 },
      );
    }

    const [existing] = await pool.query<RowDataPacket[]>("SELECT id FROM DestinationContent WHERE slug = ? LIMIT 1", [slug]);
    if (existing.length > 0) {
      return NextResponse.json(
        { success: false, error: `Slug '${slug}' already exists. Please use a different slug.` },
        { status: 409 },
      );
    }

    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO DestinationContent
       (slug, name, shortText, long_description, bannerTitle, bodyImage, whyStudy, topUniversities, eligibilityProcess, costScholarships, applicationProcess, afterReaching, isActive)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, true)`,
      [
        slug,
        name,
        shortText || null,
        longText || null,
        bannerTitle || `Study in ${name}`,
        bodyImage || null,
        whyStudy || null,
        topUniversities || null,
        eligibilityProcess || null,
        costScholarships || null,
        applicationProcess || null,
        afterReaching || null,
      ],
    );

    const [rows] = await pool.query<DestinationDbRow[]>(
      `SELECT id, slug, name, shortText, long_description, bannerTitle, bodyImage, whyStudy, topUniversities,
              eligibilityProcess, costScholarships, applicationProcess, afterReaching, isActive, createdAt, updatedAt
       FROM DestinationContent WHERE id = ?`,
      [result.insertId],
    );
    return NextResponse.json({ success: true, destination: rows[0] ? mapDestinationRow(rows[0]) : null });
  } catch (error: unknown) {
    console.error("destination POST error", error);
    if (typeof error === "object" && error !== null && "code" in error && (error as { code?: string }).code === "ER_DUP_ENTRY") {
      return NextResponse.json({ success: false, error: "Slug already exists" }, { status: 409 });
    }
    return NextResponse.json({ success: false, error: "Failed to create destination" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await ensureContentTables();
    const payload = await request.json();
    const pool = getPool();

    const id = Number(payload?.id);
    const slug = normalizeSlug(payload?.slug);
    const name = String(payload?.name ?? "").trim();
    const shortText = String(payload?.shortText ?? "").trim();
    const longText = String(payload?.longText ?? "").trim();
    const bannerTitle = String(payload?.bannerTitle ?? "").trim();
    const bodyImage = String(payload?.bodyImage ?? "").trim();
    const whyStudy = String(payload?.whyStudy ?? "").trim();
    const topUniversities = String(payload?.topUniversities ?? "").trim();
    const eligibilityProcess = String(payload?.eligibilityProcess ?? "").trim();
    const costScholarships = String(payload?.costScholarships ?? "").trim();
    const applicationProcess = String(payload?.applicationProcess ?? "").trim();
    const afterReaching = String(payload?.afterReaching ?? "").trim();
    const isActive = payload?.isActive !== false;

    if (!Number.isFinite(id) || id <= 0) {
      return NextResponse.json({ success: false, error: "Valid id is required" }, { status: 400 });
    }

    if (!slug || !name) {
      return NextResponse.json(
        { success: false, error: "Valid slug and destination name are required" },
        { status: 400 },
      );
    }

    const [slugConflict] = await pool.query<RowDataPacket[]>(
      "SELECT id FROM DestinationContent WHERE slug = ? AND id <> ? LIMIT 1",
      [slug, id],
    );
    if (slugConflict.length > 0) {
      return NextResponse.json(
        { success: false, error: `Slug '${slug}' already exists. Please use a different slug.` },
        { status: 409 },
      );
    }

    await pool.query(
      `UPDATE DestinationContent
       SET slug = ?, name = ?, shortText = ?, long_description = ?, bannerTitle = ?, bodyImage = ?, whyStudy = ?, topUniversities = ?,
           eligibilityProcess = ?, costScholarships = ?, applicationProcess = ?, afterReaching = ?, isActive = ?
       WHERE id = ?`,
      [
        slug,
        name,
        shortText || null,
        longText || null,
        bannerTitle || `Study in ${name}`,
        bodyImage || null,
        whyStudy || null,
        topUniversities || null,
        eligibilityProcess || null,
        costScholarships || null,
        applicationProcess || null,
        afterReaching || null,
        isActive,
        id,
      ],
    );

    const [rows] = await pool.query<DestinationDbRow[]>(
      `SELECT id, slug, name, shortText, long_description, bannerTitle, bodyImage, whyStudy, topUniversities,
              eligibilityProcess, costScholarships, applicationProcess, afterReaching, isActive, createdAt, updatedAt
       FROM DestinationContent WHERE id = ?`,
      [id],
    );
    return NextResponse.json({ success: true, destination: rows[0] ? mapDestinationRow(rows[0]) : null });
  } catch (error: unknown) {
    console.error("destination PUT error", error);
    if (typeof error === "object" && error !== null && "code" in error && (error as { code?: string }).code === "ER_DUP_ENTRY") {
      return NextResponse.json({ success: false, error: "Slug already exists" }, { status: 409 });
    }
    return NextResponse.json({ success: false, error: "Failed to update destination" }, { status: 500 });
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
    await pool.query("DELETE FROM DestinationContent WHERE id = ?", [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("destination DELETE error", error);
    return NextResponse.json({ success: false, error: "Failed to delete destination" }, { status: 500 });
  }
}
