import { NextResponse } from "next/server";
import { compare } from "bcryptjs";
import getPool from "@/lib/db";
import type { RowDataPacket } from "mysql2";

type AdminRow = {
  id: number;
  email: string;
  password: string;
  name: string | null;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body?.email ?? "").trim().toLowerCase();
    const password = String(body?.password ?? "");

    if (!email || !password) {
      return NextResponse.json({ success: false, error: "Email and password are required" }, { status: 400 });
    }

    const pool = getPool();
    const [metaRows] = await pool.query<RowDataPacket[]>("SELECT DATABASE() AS currentDb, @@hostname AS dbHost");
    const [rows] = await pool.query(
      "SELECT id, email, password, name FROM Admin WHERE email = ? LIMIT 1",
      [email],
    );

    const admin = Array.isArray(rows) ? (rows[0] as AdminRow | undefined) : undefined;
    const meta = metaRows[0] as { currentDb?: string; dbHost?: string } | undefined;
    console.info("auth debug", {
      loginEmail: email,
      db: meta?.currentDb ?? null,
      dbHost: meta?.dbHost ?? null,
      foundAdmin: Boolean(admin),
      storedEmail: admin?.email ?? null,
      hashPrefix: admin?.password?.slice(0, 4) ?? null,
      hashLength: admin?.password?.length ?? 0,
    });

    if (!admin) {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
    }

    const ok = await compare(password, admin.password);
    console.info("auth password compare", { loginEmail: email, matched: ok });
    if (!ok) {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      user: { id: admin.id, email: admin.email, name: admin.name ?? "Admin" },
    });
  } catch (error) {
    console.error("auth POST error", error);
    const message = error instanceof Error ? error.message : "Login failed";
    const safeMessage = message.includes("Missing required database environment variables")
      ? message
      : "Login failed";
    return NextResponse.json({ success: false, error: safeMessage }, { status: 500 });
  }
}
