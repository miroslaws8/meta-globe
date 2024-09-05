import { defineConfig } from 'drizzle-kit';

// @ts-ignore
const config = defineConfig({
  schema: '../lib/schema.ts',
  out: './drizzle',
  dialect: 'mysql', // 'postgresql' | 'mysql' | 'sqlite'
  dbCredentials: {
    host: process.env.NEXT_MYSQL_HOST,
    user: process.env.NEXT_MYSQL_USER,
    password: process.env.NEXT_MYSQL_PASSWORD,
    database: process.env.NEXT_MYSQL_DATABASE,
  },
});

export {config};