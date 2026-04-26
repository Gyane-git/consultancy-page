// import mysql from "mysql2/promise";

// let pool: mysql.Pool | null = null;

// export function getPool() {
//   if (!pool) {
//     pool = mysql.createPool({
//       host: "localhost",
//       user: "root",
//       password: "",
//       database: "studysync",
//       waitForConnections: true,
//       connectionLimit: 10,
//       queueLimit: 0,
//     });
//   }
//   return pool;
// }

// export default getPool;


import mysql from "mysql2/promise";

let pool: mysql.Pool | null = null;

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;
}

export default getPool;
