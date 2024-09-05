import 'dotenv/config';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import mysql from "mysql2/promise";
import {drizzle} from "drizzle-orm/mysql2";

async function run() {
  const connection = await mysql.createConnection({
    host: process.env.NEXT_MYSQL_HOST,
    user: process.env.NEXT_MYSQL_USER,
    password: process.env.NEXT_MYSQL_PASSWORD,
    database: process.env.NEXT_MYSQL_DATABASE,
    multipleStatements: true,
    connectTimeout: 10000,
    port: 25060,
  });

  const db = drizzle(connection);

  await migrate(db, { migrationsFolder: './src/database/migrations' });
  await connection.end();
}

run();