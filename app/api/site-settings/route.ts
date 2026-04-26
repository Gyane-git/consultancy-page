import { NextResponse } from "next/server";
import getPool from "@/lib/db";
import { ensureContentTables } from "@/lib/content-store";
import type { RowDataPacket } from "mysql2";

type SiteSettingsRow = RowDataPacket & {
  singletonKey: string;
  showUniversityTab: number | boolean;
  homeShowFindUni: number | boolean;
};

function mapSettings(row: SiteSettingsRow | undefined) {
  return {
    showUniversityTab: row ? Boolean(row.showUniversityTab) : true,
    homeShowFindUni: row ? Boolean(row.homeShowFindUni) : true,
  };
}

export async function GET() {
  try {
    await ensureContentTables();
    const pool = getPool();
    const [rows] = await pool.query<SiteSettingsRow[]>("SELECT * FROM SiteSetting WHERE singletonKey = 'default' LIMIT 1");
    return NextResponse.json({ success: true, settings: mapSettings(rows[0]) });
  } catch (error) {
    console.error("site-settings GET error", error);
    return NextResponse.json({ success: false, error: "Failed to fetch site settings" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureContentTables();
    const payload = await request.json();

    const showUniversityTab = payload?.showUniversityTab !== false;
    const homeShowFindUni = payload?.homeShowFindUni !== false;

    const pool = getPool();
    await pool.query(
      `INSERT INTO SiteSetting (singletonKey, showUniversityTab, homeShowFindUni)
       VALUES ('default', ?, ?)
       ON DUPLICATE KEY UPDATE
         showUniversityTab = VALUES(showUniversityTab),
         homeShowFindUni = VALUES(homeShowFindUni)`,
      [showUniversityTab, homeShowFindUni],
    );

    const [rows] = await pool.query<SiteSettingsRow[]>("SELECT * FROM SiteSetting WHERE singletonKey = 'default' LIMIT 1");
    return NextResponse.json({ success: true, settings: mapSettings(rows[0]) });
  } catch (error) {
    console.error("site-settings POST error", error);
    return NextResponse.json({ success: false, error: "Failed to update site settings" }, { status: 500 });
  }
}
