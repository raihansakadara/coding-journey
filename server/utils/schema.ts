import {pgTable, text, timestamp} from 'drizzle-orm/pg-core';

export const userTable = pgTable('auth_user', {
    id: text('id').notNull().primaryKey(),
    username: text('username').notNull().unique(),
    password_hash: text('password_hash').notNull(),
});

export const sessionTable = pgTable('auth_session', {
    id: text('id').notNull().primaryKey(),
    userId: text('user_id').notNull().references(() => userTable.id),
    expiresAt: timestamp('expires_at', { mode: 'date' }).notNull()
});
