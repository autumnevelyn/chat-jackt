import { db } from "../db";

export const createUser = async (newUsername: string, newPassword: string) => {
    return await db
        .insertInto("users")
        .values({
            username: newUsername,
            password: newPassword,
        })
        .returning("id")
        .executeTakeFirstOrThrow();
};
