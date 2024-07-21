import {Lucia} from "lucia"
import {neon} from "@neondatabase/serverless"
import {TimeSpan} from "oslo";
import {DrizzlePostgreSQLAdapter} from "@lucia-auth/adapter-drizzle";
import {drizzle} from "drizzle-orm/neon-http";

const sql = neon(process.env.DATABASE_URL!)

//@ts-ignore
const db = drizzle(sql);

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable)

const oneDay = new TimeSpan(1, "d");

export const lucia = new Lucia(adapter, {
    sessionExpiresIn: oneDay,
    sessionCookie: {
        name: 'session',
        attributes: {
            secure: !import.meta.dev
        }
    },
    getUserAttributes: (attributes) => {
        return {
            // attributes has the type of DatabaseUserAttributes
            username: attributes.username
        };
    }
});

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
}

interface DatabaseUserAttributes {
    username: string;
}
