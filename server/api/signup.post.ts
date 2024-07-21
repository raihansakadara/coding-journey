import {hash} from "@node-rs/argon2";
import {generateIdFromEntropySize} from "lucia";
import {createError, readFormData} from "h3";
import db from "~/server/utils";

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
            statusCode: 400,
        });
    }

    const password = formData.get("password");

    if (typeof password !== "string" || password.length < 6 || password.length > 255) {
        throw createError({
            message: "Invalid password",
            statusCode: 400,
        });
    }

    const passwordHash = await hash(password, {
        // recommended minimum parameters
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
    });

    const userId = generateIdFromEntropySize(10); // Generate user ID (16 characters long)

    try {
        // Insert new user into PostgreSQL
        await db.insert(userTable).values({
            id: userId,
            username: username,
            password_hash: passwordHash,
        });

        return {success: true};
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: error.message || "Failed to register user",
        });
    }
});
