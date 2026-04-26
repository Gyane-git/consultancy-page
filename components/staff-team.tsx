"use client";

import { useEffect, useState } from "react";

type Staff = {
  id: number;
  name: string;
  designation: string;
  image?: string | null;
  socialUrl?: string | null;
};

export default function StaffTeam() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function loadStaff() {
      try {
        const res = await fetch("/api/staff-profile", { cache: "no-store" });
        const data = await res.json();
        if (!ignore && data?.success) {
          setStaff(Array.isArray(data.staff) ? data.staff : []);
        }
      } catch (error) {
        console.error("Failed to load staff profiles", error);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadStaff();
    return () => {
      ignore = true;
    };
  }, []);

  if (loading) {
    return <div style={{ padding: "24px 48px", textAlign: "center", color: "#777" }}>Loading team profiles...</div>;
  }

  if (!staff.length) {
    return <div style={{ padding: "24px 48px", textAlign: "center", color: "#777" }}>No staff profiles available right now.</div>;
  }

  return (
    <section style={{ maxWidth: 1040, margin: "0 auto", padding: "40px 48px 20px" }}>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#111", marginBottom: 8 }}>Our Team</h2>
        <p style={{ color: "#777" }}>Meet the experts guiding your international education journey.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
        {staff.map((member) => (
          <article
            key={member.id}
            style={{
              border: "1px solid #e9e9e9",
              borderRadius: 14,
              overflow: "hidden",
              background: "#fff",
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ aspectRatio: "4 / 3", background: "#f4f6f8", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {member.image ? (
                <img
                  src={member.image}
                  alt={member.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <div style={{ color: "#888", fontWeight: 600, fontSize: "0.85rem" }}>No Image</div>
              )}
            </div>
            <div style={{ padding: 14 }}>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#111", marginBottom: 4 }}>{member.name}</h3>
              <p style={{ fontSize: "0.86rem", color: "#666", marginBottom: 8 }}>{member.designation}</p>
              {member.socialUrl ? (
                <a
                  href={member.socialUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: "0.8rem", fontWeight: 600, color: "#1a90c8", textDecoration: "none" }}
                >
                  View Social Profile
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
