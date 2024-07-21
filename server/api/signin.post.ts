import {verify} from "@node-rs/argon2";
import db from "~/server/utils";
import {createError, appendHeader, readFormData} from 'h3'; // Make sure these are correctly imported from 'h3' or another source
import {eq} from "drizzle-orm";

export default eventHandler(async (event) => {
    const formData = await readFormData(event);
    const username = formData.get("username");
    if (
        typeof username !== "string" ||
        username.length < 3 ||
        username.length > 31 ||
        !/^[a-z0-9_-]+$/.test(username)
    ) {
        throw createError({
            message: "Invalid username",
            statusCode: 400
        });
    }
    const password = formData.get("password");
    if (typeof password !== "string" || password.length < 6 || password.length > 255) {
        throw createError({
            message: "Invalid password",
            statusCode: 400
        });
    }

    // Query the database for the user
    const existingUser = await db.select().from(userTable).where(eq(userTable.username, username.toLowerCase())).execute();
    const users = existingUser[0]

    // Check if user exists
    if (!users) {
        throw createError({
            message: "Incorrect username or password",
            statusCode: 400
        });
    }

    // Since we expect only one user, take the first one
    const validPassword = await verify(users.password_hash, password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1
    });
    if (!validPassword) {
        throw createError({
            message: "Incorrect username or password",
            statusCode: 400
        });
    }

    const session = await lucia.createSession(users.id, {});
    appendHeader(event, "Set-Cookie", lucia.createSessionCookie(session.id).serialize());

    // Return a response with a redirection to the homepage
    return sendRedirect(event, '/secured');
})
