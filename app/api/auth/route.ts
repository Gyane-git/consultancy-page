import { NextResponse } from "next/server";
import getPool from "@/lib/db";
import { compare, hash } from "bcryptjs";

// POST - Admin login
export async function POST(request: Request) {
  try {
    const pool = getPool();
    const body = await request.json();
    const { email, password } = body;

    const [rows] = await pool.query("SELECT * FROM Admin WHERE email = ?", [email]);
    const admins = rows as any[];
    
    if (admins.length === 0) {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
    }

    const admin = admins[0];
    const isValid = await compare(password, admin.password);
    
    if (!isValid) {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
    }

    return NextResponse.json({ 
      success: true, 
      admin: { id: admin.id, email: admin.email, name: admin.name } 
    });
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json({ success: false, error: "Login failed" }, { status: 500 });
  }
}

// PUT - Create a default admin user
export async function PUT(request: Request) {
  try {
    const pool = getPool();
    const body = await request.json();
    const { email, password, name } = body;

    // Check if admin already exists
    const [existing] = await pool.query("SELECT id FROM Admin WHERE email = ?", [email]);
    if ((existing as any[]).length > 0) {
      return NextResponse.json({ success: false, error: "Admin already exists" }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    const [result] = await pool.query(
      "INSERT INTO Admin (email, password, name) VALUES (?, ?, ?)",
      [email, hashedPassword, name || "Admin"]
    );

    const [inserted] = await pool.query("SELECT id, email, name FROM Admin WHERE id = ?", [(result as any).insertId]);
    
    return NextResponse.json({ success: true, admin: (inserted as any[])[0] });
  } catch (error) {
    console.error("Error creating admin:", error);
    return NextResponse.json({ success: false, error: "Failed to create admin" }, { status: 500 });
  }
}