import { NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2/promise";
import getPool from "@/lib/db";

type ServiceSectionRow = RowDataPacket & {
  id: number;
  subtitle: string;
  title: string;
  description: string;
  pointsLabel: string;
};

type ServiceCardRow = RowDataPacket & {
  id: number;
  sortOrder: number;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  features: string | null;
  statValue: string;
  statLabel: string;
  color: string;
  bgColor: string;
  isActive: number;
};

async function ensureServicesTables() {
  const pool = getPool();

  await pool.query(`
    CREATE TABLE IF NOT EXISTS ServicesPageSection (
      id INT NOT NULL AUTO_INCREMENT,
      singletonKey VARCHAR(40) NOT NULL DEFAULT 'default',
      subtitle VARCHAR(180) NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      pointsLabel VARCHAR(120) NOT NULL,
      createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY uniq_services_section_singleton (singletonKey)
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS ServicesPageCards (
      id INT NOT NULL AUTO_INCREMENT,
      sortOrder INT NOT NULL DEFAULT 0,
      slug VARCHAR(120) NOT NULL,
      title VARCHAR(255) NOT NULL,
      tagline VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      features TEXT NULL,
      statValue VARCHAR(80) NOT NULL,
      statLabel VARCHAR(180) NOT NULL,
      color VARCHAR(30) NOT NULL DEFAULT '#e8352a',
      bgColor VARCHAR(30) NOT NULL DEFAULT '#fff0ef',
      isActive TINYINT(1) NOT NULL DEFAULT 1,
      createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY uniq_services_slug (slug)
    )
  `);

  await pool.query(
    `INSERT IGNORE INTO ServicesPageSection (singletonKey, subtitle, title, description, pointsLabel)
     VALUES ('default', ?, ?, ?, ?)`,
    [
      "Our Services",
      "Five Ways We Shape Your Future",
      "We support your full study abroad journey with expert guidance, documentation support, and career-focused planning.",
      "5 Core Services",
    ]
  );

  const [existingRows] = await pool.query<RowDataPacket[]>("SELECT COUNT(*) AS total FROM ServicesPageCards");
  const total = Number(existingRows?.[0]?.total || 0);
  if (total > 0) return;

  const seedCards = [
    {
      sortOrder: 1,
      slug: "study-abroad-counselling",
      title: "Study Abroad Counselling",
      tagline: "Your dream destination, mapped.",
      description:
        "Personalized one-on-one counselling to help you choose the right country, university, and course — aligned with your academic background, career goals, and budget.",
      features: JSON.stringify([
        "Country & university shortlisting",
        "Course & intake selection",
        "Profile evaluation",
        "Career pathway planning",
      ]),
      statValue: "10+",
      statLabel: "Countries Covered",
      color: "#e8352a",
      bgColor: "#fff0ef",
    },
    {
      sortOrder: 2,
      slug: "university-applications",
      title: "University & College Applications",
      tagline: "Applications that open doors.",
      description:
        "End-to-end application management — from SOP writing and document preparation to submission tracking and offer letter follow-up.",
      features: JSON.stringify([
        "SOP & personal statement drafting",
        "Document checklist & preparation",
        "Application portal submission",
        "Offer letter follow-up",
      ]),
      statValue: "500+",
      statLabel: "Applications Processed",
      color: "#e8922a",
      bgColor: "#fff7ee",
    },
    {
      sortOrder: 3,
      slug: "visa-documentation",
      title: "Visa Documentation & Guidance",
      tagline: "99%+ success, zero guesswork.",
      description:
        "Meticulous visa file preparation with expert review at every step. We handle complex cases and ensure your application meets every requirement.",
      features: JSON.stringify([
        "Visa document checklist",
        "Financial document guidance",
        "Mock visa interview prep",
        "Embassy appointment support",
      ]),
      statValue: "99%+",
      statLabel: "Visa Success Rate",
      color: "#1a9e5c",
      bgColor: "#edf9f3",
    },
    {
      sortOrder: 4,
      slug: "career-counselling",
      title: "Career Counselling & Course Selection",
      tagline: "Choose smart. Grow faster.",
      description:
        "Data-driven career guidance that maps your skills and interests to the most in-demand courses and industries across global markets.",
      features: JSON.stringify([
        "Personality & skills assessment",
        "Industry demand analysis",
        "Course comparison & selection",
        "Post-study work pathway advice",
      ]),
      statValue: "700+",
      statLabel: "Students Guided",
      color: "#1a90c8",
      bgColor: "#edf6fb",
    },
    {
      sortOrder: 5,
      slug: "ielts-preparation",
      title: "IELTS & Test Preparation Support",
      tagline: "Score higher. Apply stronger.",
      description:
        "Structured IELTS, PTE, and Duolingo preparation with practice tests, score analysis, and targeted improvement strategies to hit your target band score.",
      features: JSON.stringify([
        "Full-length mock tests",
        "Band score analysis",
        "Speaking & writing coaching",
        "PTE & Duolingo guidance",
      ]),
      statValue: "6.5+",
      statLabel: "Avg. Band Score",
      color: "#e8352a",
      bgColor: "#fff0ef",
    },
  ];

  for (const card of seedCards) {
    await pool.query(
      `INSERT IGNORE INTO ServicesPageCards
        (sortOrder, slug, title, tagline, description, features, statValue, statLabel, color, bgColor, isActive)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
      [
        card.sortOrder,
        card.slug,
        card.title,
        card.tagline,
        card.description,
        card.features,
        card.statValue,
        card.statLabel,
        card.color,
        card.bgColor,
      ]
    );
  }
}

function parseFeatures(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  } catch {
    return raw
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
  }
}

export async function GET(request: Request) {
  try {
    await ensureServicesTables();
    const pool = getPool();
    const url = new URL(request.url);
    const includeInactive = url.searchParams.get("all") === "1";

    const [sectionRows] = await pool.query<ServiceSectionRow[]>(
      "SELECT id, subtitle, title, description, pointsLabel FROM ServicesPageSection WHERE singletonKey = 'default' LIMIT 1"
    );
    const section = sectionRows[0] || null;

    const [cardRows] = await pool.query<ServiceCardRow[]>(
      includeInactive
        ? "SELECT id, sortOrder, slug, title, tagline, description, features, statValue, statLabel, color, bgColor, isActive FROM ServicesPageCards ORDER BY sortOrder ASC, id ASC"
        : "SELECT id, sortOrder, slug, title, tagline, description, features, statValue, statLabel, color, bgColor, isActive FROM ServicesPageCards WHERE isActive = 1 ORDER BY sortOrder ASC, id ASC"
    );

    const services = cardRows.map((row, index) => ({
      id: String(index + 1).padStart(2, "0"),
      rowId: row.id,
      sortOrder: row.sortOrder,
      slug: row.slug,
      title: row.title,
      tagline: row.tagline,
      desc: row.description,
      features: parseFeatures(row.features),
      stat: row.statValue,
      statLabel: row.statLabel,
      color: row.color,
      bg: row.bgColor,
      isActive: Boolean(row.isActive),
    }));

    return NextResponse.json({ success: true, section, services });
  } catch (error) {
    console.error("services-page GET error", error);
    return NextResponse.json({ success: false, error: "Failed to load services page data" }, { status: 500 });
  }
}

function normalizeSlug(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function POST(request: Request) {
  try {
    await ensureServicesTables();
    const pool = getPool();
    const body = await request.json();
    const entity = String(body?.entity || "card");

    if (entity === "section") {
      const subtitle = String(body?.subtitle || "").trim();
      const title = String(body?.title || "").trim();
      const description = String(body?.description || "").trim();
      const pointsLabel = String(body?.pointsLabel || "").trim();
      if (!subtitle || !title || !description || !pointsLabel) {
        return NextResponse.json({ success: false, error: "All section fields are required." }, { status: 400 });
      }
      await pool.query(
        `INSERT INTO ServicesPageSection (singletonKey, subtitle, title, description, pointsLabel)
         VALUES ('default', ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE subtitle = VALUES(subtitle), title = VALUES(title), description = VALUES(description), pointsLabel = VALUES(pointsLabel)`,
        [subtitle, title, description, pointsLabel]
      );
      return NextResponse.json({ success: true });
    }

    const slug = normalizeSlug(String(body?.slug || ""));
    const title = String(body?.title || "").trim();
    const tagline = String(body?.tagline || "").trim();
    const description = String(body?.desc || body?.description || "").trim();
    const statValue = String(body?.stat || body?.statValue || "").trim();
    const statLabel = String(body?.statLabel || "").trim();
    const features = Array.isArray(body?.features)
      ? body.features.map((item: unknown) => String(item).trim()).filter(Boolean)
      : String(body?.featuresText || "")
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean);
    const sortOrder = Number(body?.sortOrder || 0);
    const color = String(body?.color || "#e8352a").trim();
    const bgColor = String(body?.bg || body?.bgColor || "#fff0ef").trim();
    const isActive = body?.isActive === false ? 0 : 1;

    if (!slug || !title || !tagline || !description || !statValue || !statLabel) {
      return NextResponse.json({ success: false, error: "Required service fields are missing." }, { status: 400 });
    }

    await pool.query(
      `INSERT INTO ServicesPageCards (sortOrder, slug, title, tagline, description, features, statValue, statLabel, color, bgColor, isActive)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [sortOrder, slug, title, tagline, description, JSON.stringify(features), statValue, statLabel, color, bgColor, isActive]
    );

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("services-page POST error", error);
    const err = error as { code?: string };
    if (err?.code === "ER_DUP_ENTRY") {
      return NextResponse.json({ success: false, error: "Service slug already exists." }, { status: 409 });
    }
    return NextResponse.json({ success: false, error: "Failed to save services data" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await ensureServicesTables();
    const pool = getPool();
    const body = await request.json();
    const entity = String(body?.entity || "card");

    if (entity === "section") {
      const subtitle = String(body?.subtitle || "").trim();
      const title = String(body?.title || "").trim();
      const description = String(body?.description || "").trim();
      const pointsLabel = String(body?.pointsLabel || "").trim();
      if (!subtitle || !title || !description || !pointsLabel) {
        return NextResponse.json({ success: false, error: "All section fields are required." }, { status: 400 });
      }
      await pool.query(
        "UPDATE ServicesPageSection SET subtitle = ?, title = ?, description = ?, pointsLabel = ? WHERE singletonKey = 'default' LIMIT 1",
        [subtitle, title, description, pointsLabel]
      );
      return NextResponse.json({ success: true });
    }

    const id = Number(body?.id || 0);
    if (!id) return NextResponse.json({ success: false, error: "Service id is required." }, { status: 400 });

    const slug = normalizeSlug(String(body?.slug || ""));
    const title = String(body?.title || "").trim();
    const tagline = String(body?.tagline || "").trim();
    const description = String(body?.desc || body?.description || "").trim();
    const statValue = String(body?.stat || body?.statValue || "").trim();
    const statLabel = String(body?.statLabel || "").trim();
    const features = Array.isArray(body?.features)
      ? body.features.map((item: unknown) => String(item).trim()).filter(Boolean)
      : String(body?.featuresText || "")
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean);
    const sortOrder = Number(body?.sortOrder || 0);
    const color = String(body?.color || "#e8352a").trim();
    const bgColor = String(body?.bg || body?.bgColor || "#fff0ef").trim();
    const isActive = body?.isActive === false ? 0 : 1;

    if (!slug || !title || !tagline || !description || !statValue || !statLabel) {
      return NextResponse.json({ success: false, error: "Required service fields are missing." }, { status: 400 });
    }

    await pool.query(
      `UPDATE ServicesPageCards
       SET sortOrder = ?, slug = ?, title = ?, tagline = ?, description = ?, features = ?, statValue = ?, statLabel = ?, color = ?, bgColor = ?, isActive = ?
       WHERE id = ?`,
      [sortOrder, slug, title, tagline, description, JSON.stringify(features), statValue, statLabel, color, bgColor, isActive, id]
    );

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("services-page PUT error", error);
    const err = error as { code?: string };
    if (err?.code === "ER_DUP_ENTRY") {
      return NextResponse.json({ success: false, error: "Service slug already exists." }, { status: 409 });
    }
    return NextResponse.json({ success: false, error: "Failed to update services data" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await ensureServicesTables();
    const pool = getPool();
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get("id") || 0);
    if (!id) return NextResponse.json({ success: false, error: "Service id is required." }, { status: 400 });
    await pool.query("DELETE FROM ServicesPageCards WHERE id = ? LIMIT 1", [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("services-page DELETE error", error);
    return NextResponse.json({ success: false, error: "Failed to delete service card" }, { status: 500 });
  }
}
