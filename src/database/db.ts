import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const poolConnection = mysql.createPool({
  host: process.env.NEXT_MYSQL_HOST,
  user: process.env.NEXT_MYSQL_USER,
  password: process.env.NEXT_MYSQL_PASSWORD,
  database: process.env.NEXT_MYSQL_DATABASE,
  port: 25060,
});

const db = drizzle(poolConnection);

export { db, poolConnection as connection };