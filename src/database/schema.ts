import {mysqlTable, serial, varchar, bigint, index} from 'drizzle-orm/mysql-core';

export const tokens = mysqlTable('tokens', {
  id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
  address: varchar('address', { length: 255 }).notNull(),
  hash: varchar('hash', { length: 255 }).notNull(),
  token_id: bigint('token_id', {mode: 'number'}).notNull(),
  country: varchar('country', { length: 100 }).notNull(),
}, (tokens) => ({
  countryIndex: index('country_index').on(tokens.country),
}));