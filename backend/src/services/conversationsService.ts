import { time } from "console";
import { db } from "../db";
import { User, Conversation } from "../types";

export const getConversationInfo = async (conversationId: number): Promise<Conversation> => {
    return await db
        .selectFrom("conversations")
        .selectAll()
        .where("id", "=", conversationId)
        .executeTakeFirstOrThrow();
};

interface Member {
    id: number;
    username: string;
    member_since: Date;
    created_at: Date;
}

export const getConversationMembers = async (conversationId: number): Promise<Member[]> => {
    return await db
        .selectFrom("users as u")
        .innerJoin(
            (eb) =>
                eb
                    .selectFrom("is_member")
                    .select(["user_id", "created_at as member_since"])
                    .where("conversation_id", "=", conversationId)
                    .as("i"),
            (join) => join.onRef("i.user_id", "=", "u.id")
        )
        .select(["u.id", "u.username", "i.member_since", "u.created_at"])
        .execute();
};
