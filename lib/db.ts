import mysql from "mysql2/promise";

let pool: mysql.Pool | null = null;

export function getPool() {
  if (!pool) {
    const databaseUrl = process.env.DATABASE_URL;
    let host = process.env.DB_HOST;
    let user = process.env.DB_USER;
    let password = process.env.DB_PASSWORD;
    let database = process.env.DB_NAME;
    let port = Number(process.env.DB_PORT || 3306);
    const useSsl = process.env.DB_SSL === "true";

    if (databaseUrl) {
      const url = new URL(databaseUrl);
      host = host || url.hostname;
      user = user || decodeURIComponent(url.username);
      password = password || decodeURIComponent(url.password);
      database = database || url.pathname.replace(/^\//, "");
      if (!process.env.DB_PORT && url.port) {
        port = Number(url.port);
      }
    }

    if (!host || !user || !password || !database) {
      const missingVars = [
        !host ? "DB_HOST" : null,
        !user ? "DB_USER" : null,
        !password ? "DB_PASSWORD" : null,
        !database ? "DB_NAME" : null,
      ].filter(Boolean);
      throw new Error(`Missing required database environment variables: ${missingVars.join(", ")}`);
    }

    pool = mysql.createPool({
      host,
      port,
      user,
      password,
      database,
      ssl: useSsl ? { rejectUnauthorized: false } : undefined,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;
}

export default getPool;
