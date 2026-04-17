import getPool from "../lib/db";
import { hash } from "bcryptjs";

async function main() {
  const pool = getPool();
  
  // Create default admin user
  const hashedPassword = await hash("admin123", 10);
  
  try {
    const [result] = await pool.query(
      "INSERT INTO Admin (email, password, name, createdAt, updatedAt) VALUES (?, ?, ?, NOW(), NOW())",
      ["admin@studysync.com", hashedPassword, "Admin"]
    );
    console.log("Admin created with ID:", (result as any).insertId);
  } catch (error: any) {
    if (error.code === "ER_DUP_ENTRY") {
      console.log("Admin already exists");
    } else {
      throw error;
    }
  }
  
  await pool.end();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });