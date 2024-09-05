import {db} from "@/database/db";
import {tokens} from "@/database/schema";
import type {Address} from "viem";
import {sql} from "drizzle-orm";

export type MintCountRecord = {
  country: string;
  mint_count: number;
}

export interface Token {
  hash: string;
  address: Address;
  token_id: number;
  country: string;
}

export const insertToken = async (token: Token) => {
  return db.insert(tokens).values(token);
}

export const getTokensByCountries = async () => {
  return db.select({
    country: tokens.country,
    mint_count: sql<number>`COUNT(*)`.as('mint_count'),
  })
    .from(tokens)
    .groupBy(tokens.country);
}