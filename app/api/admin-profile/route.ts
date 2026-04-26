import { NextResponse } from "next/server";
import { compare, hash } from "bcryptjs";
import getPool from "@/lib/db";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

type AdminRow = RowDataPacket & {
  id: number;
  email: string;
  password: string;
  name: string | null;
};

export async function PUT(request: Request) {
  try {
    const payload = await request.json();

    const email = String(payload?.email ?? "").trim().toLowerCase();
    const name = String(payload?.name ?? "").trim();
    const currentPassword = String(payload?.currentPassword ?? "");
    const newPassword = String(payload?.newPassword ?? "");

    if (!email) {
      return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 });
    }

    if (!name) {
      return NextResponse.json({ success: false, error: "User name is required" }, { status: 400 });
    }

    const pool = getPool();
    const [rows] = await pool.query<AdminRow[]>(
      "SELECT id, email, password, name FROM Admin WHERE email = ? LIMIT 1",
      [email],
    );

    const admin = rows[0];
    if (!admin) {
      return NextResponse.json({ success: false, error: "Admin user not found" }, { status: 404 });
    }

    let nextPasswordHash: string | null = null;
    const wantsPasswordUpdate = newPassword.length > 0;

    if (wantsPasswordUpdate) {
      if (!currentPassword) {
        return NextResponse.json(
          { success: false, error: "Current password is required to set a new password" },
          { status: 400 },
        );
      }

      const isValidCurrent = await compare(currentPassword, admin.password);
      if (!isValidCurrent) {
        return NextResponse.json({ success: false, error: "Current password is incorrect" }, { status: 401 });
      }

      if (newPassword.length < 6) {
        return NextResponse.json(
          { success: false, error: "New password must be at least 6 characters" },
          { status: 400 },
        );
      }

      nextPasswordHash = await hash(newPassword, 10);
    }

    if (wantsPasswordUpdate && nextPasswordHash) {
      await pool.query<ResultSetHeader>(
        "UPDATE Admin SET name = ?, password = ?, updatedAt = NOW() WHERE id = ?",
        [name, nextPasswordHash, admin.id],
      );
    } else {
      await pool.query<ResultSetHeader>("UPDATE Admin SET name = ?, updatedAt = NOW() WHERE id = ?", [name, admin.id]);
    }

    const [updatedRows] = await pool.query<AdminRow[]>(
      "SELECT id, email, name, password FROM Admin WHERE id = ? LIMIT 1",
      [admin.id],
    );

    const updated = updatedRows[0];
    return NextResponse.json({
      success: true,
      user: {
        id: updated.id,
        email: updated.email,
        name: updated.name ?? "Admin",
      },
    });
  } catch (error) {
    console.error("admin-profile PUT error", error);
    return NextResponse.json({ success: false, error: "Failed to update admin profile" }, { status: 500 });
  }
}
