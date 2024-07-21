import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;

import { webcrypto } from "node:crypto";

globalThis.crypto = webcrypto as Crypto;

const pool = new Pool({ connectionString: process.env.DATABASE_URL as string});
const db = drizzle(pool);

export default db;
