import { defineConfig } from 'drizzle-kit';

// @ts-ignore
export default defineConfig({
  schema: './src/database/schema.ts',
  out: './src/database/migrations',
  dialect: 'mysql',
  dbCredentials: {
    host: process.env.NEXT_MYSQL_HOST,
    user: process.env.NEXT_MYSQL_USER,
    password: process.env.NEXT_MYSQL_PASSWORD,
    database: process.env.NEXT_MYSQL_DATABASE,
  },
});