import { NextResponse } from "next/server";
import { compare } from "bcryptjs";
import getPool from "@/lib/db";

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
    const [rows] = await pool.query(
      "SELECT id, email, password, name FROM Admin WHERE email = ? LIMIT 1",
      [email],
    );

    const admin = Array.isArray(rows) ? (rows[0] as AdminRow | undefined) : undefined;
    if (!admin) {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
    }

    const ok = await compare(password, admin.password);
    if (!ok) {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      user: { id: admin.id, email: admin.email, name: admin.name ?? "Admin" },
    });
  } catch (error) {
    console.error("auth POST error", error);
    return NextResponse.json({ success: false, error: "Login failed" }, { status: 500 });
  }
}
