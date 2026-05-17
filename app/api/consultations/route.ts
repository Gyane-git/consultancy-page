import { NextResponse } from "next/server";
import getPool from "@/lib/db";
import { ensureContentTables } from "@/lib/content-store";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

async function sendConsultationEmails(payload: {
  name: string;
  email: string;
  phone?: string;
  nationality?: string;
  studyDestination?: string;
  studyLevel?: string;
  fieldOfStudy?: string;
  goals?: string[];
  challenges?: string;
  preferredDate?: string;
  preferredTime?: string;
  consultationType?: string;
  additionalInfo?: string;
}) {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const fromEmail = process.env.SMTP_FROM || smtpUser;
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;

  if (!smtpHost || !smtpUser || !smtpPass || !fromEmail || !adminEmail) {
    console.warn("consultation email skipped: SMTP or ADMIN_NOTIFICATION_EMAIL env not configured");
    return;
  }

  const nodemailerModule = await import("nodemailer");
  const nodemailer = nodemailerModule.default ?? nodemailerModule;
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPass },
  });

  const goalsText = Array.isArray(payload.goals) && payload.goals.length ? payload.goals.join(", ") : "N/A";

  const adminHtml = `
    <h2>New Consultation Booking</h2>
    <p><strong>Name:</strong> ${payload.name}</p>
    <p><strong>Email:</strong> ${payload.email}</p>
    <p><strong>Phone:</strong> ${payload.phone || "N/A"}</p>
    <p><strong>Nationality:</strong> ${payload.nationality || "N/A"}</p>
    <p><strong>Study Destination:</strong> ${payload.studyDestination || "N/A"}</p>
    <p><strong>Study Level:</strong> ${payload.studyLevel || "N/A"}</p>
    <p><strong>Field of Study:</strong> ${payload.fieldOfStudy || "N/A"}</p>
    <p><strong>Goals:</strong> ${goalsText}</p>
    <p><strong>Challenges:</strong> ${payload.challenges || "N/A"}</p>
    <p><strong>Preferred Date:</strong> ${payload.preferredDate || "N/A"}</p>
    <p><strong>Preferred Time:</strong> ${payload.preferredTime || "N/A"}</p>
    <p><strong>Consultation Type:</strong> ${payload.consultationType || "N/A"}</p>
    <p><strong>Additional Info:</strong> ${payload.additionalInfo || "N/A"}</p>
  `;

  const userHtml = `
    <h2>Consultation Booking Received</h2>
    <p>Hi ${payload.name},</p>
    <p>Thank you for booking a free consultation with StudySync. Our team will contact you soon.</p>
    <p><strong>Your preferred schedule:</strong> ${payload.preferredDate || "N/A"} ${payload.preferredTime || ""}</p>
    <p><strong>Consultation type:</strong> ${payload.consultationType || "N/A"}</p>
    <p>Regards,<br/>StudySync Team</p>
  `;

  await Promise.all([
    transporter.sendMail({
      from: fromEmail,
      to: adminEmail,
      subject: `New Consultation Booking: ${payload.name}`,
      html: adminHtml,
    }),
    transporter.sendMail({
      from: fromEmail,
      to: payload.email,
      subject: "Your Consultation Booking Confirmation",
      html: userHtml,
    }),
  ]);
}

export async function GET() {
  try {
    await ensureContentTables();
    const pool = getPool();
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM ConsultationRequest ORDER BY createdAt DESC");
    return NextResponse.json({ success: true, consultations: rows });
  } catch (error) {
    console.error("consultations GET error", error);
    return NextResponse.json({ success: false, error: "Failed to fetch consultation requests" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureContentTables();
    const payload = await request.json();
    const pool = getPool();

    const name = String(payload?.name ?? "").trim();
    const email = String(payload?.email ?? "").trim();
    const phone = String(payload?.phone ?? "").trim();
    const nationality = String(payload?.nationality ?? "").trim();
    const studyDestination = String(payload?.studyDestination ?? "").trim();
    const studyLevel = String(payload?.studyLevel ?? "").trim();
    const fieldOfStudy = String(payload?.fieldOfStudy ?? "").trim();
    const goalsArray = Array.isArray(payload?.goals) ? payload.goals.map((g: unknown) => String(g)) : [];
    const goals = JSON.stringify(goalsArray);
    const challenges = String(payload?.challenges ?? "").trim();
    const preferredDate = String(payload?.preferredDate ?? "").trim();
    const preferredTime = String(payload?.preferredTime ?? "").trim();
    const consultationType = String(payload?.consultationType ?? "").trim();
    const additionalInfo = String(payload?.additionalInfo ?? "").trim();

    if (!name || !email) {
      return NextResponse.json({ success: false, error: "name and email are required" }, { status: 400 });
    }

    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO ConsultationRequest (
        name, email, phone, nationality, studyDestination, studyLevel, fieldOfStudy,
        goals, challenges, preferredDate, preferredTime, consultationType, additionalInfo, status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new')`,
      [
        name,
        email,
        phone || null,
        nationality || null,
        studyDestination || null,
        studyLevel || null,
        fieldOfStudy || null,
        goals,
        challenges || null,
        preferredDate || null,
        preferredTime || null,
        consultationType || null,
        additionalInfo || null,
      ],
    );

    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM ConsultationRequest WHERE id = ?", [result.insertId]);

    try {
      await sendConsultationEmails({
        name,
        email,
        phone,
        nationality,
        studyDestination,
        studyLevel,
        fieldOfStudy,
        goals: goalsArray,
        challenges,
        preferredDate,
        preferredTime,
        consultationType,
        additionalInfo,
      });
    } catch (emailError) {
      console.error("consultations email error", emailError);
    }

    return NextResponse.json({ success: true, consultation: rows[0] ?? null });
  } catch (error) {
    console.error("consultations POST error", error);
    return NextResponse.json({ success: false, error: "Failed to submit consultation request" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await ensureContentTables();
    const payload = await request.json();
    const pool = getPool();

    const id = Number(payload?.id);
    const status = String(payload?.status ?? "").trim().toLowerCase();
    const allowed = new Set(["new", "in_progress", "completed", "cancelled"]);

    if (!Number.isFinite(id) || id <= 0) {
      return NextResponse.json({ success: false, error: "Valid id is required" }, { status: 400 });
    }
    if (!allowed.has(status)) {
      return NextResponse.json({ success: false, error: "Invalid status value" }, { status: 400 });
    }

    await pool.query("UPDATE ConsultationRequest SET status = ?, updatedAt = NOW() WHERE id = ?", [status, id]);
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM ConsultationRequest WHERE id = ?", [id]);
    return NextResponse.json({ success: true, consultation: rows[0] ?? null });
  } catch (error) {
    console.error("consultations PUT error", error);
    return NextResponse.json({ success: false, error: "Failed to update consultation request" }, { status: 500 });
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
    await pool.query("DELETE FROM ConsultationRequest WHERE id = ?", [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("consultations DELETE error", error);
    return NextResponse.json({ success: false, error: "Failed to delete consultation request" }, { status: 500 });
  }
}
