import { db } from "../db";
import { NewMessage, Message, MessageUpdate } from "../types";

export const getSingleMessage = async (messageId: number): Promise<Message> => {
    return await db.selectFrom("messages").selectAll()
    .where("id", "=", messageId)
    .executeTakeFirstOrThrow()
}

export const addMessage = async (senderId: number, conversationId: number, messageContent: string) => {

    return await db.insertInto("messages")
    .values({
        sender_id: senderId,
        conversation_id: conversationId,
        content: messageContent
    })
    .returning("id")
    .executeTakeFirstOrThrow()
}

export const deleteMessage = async (messageId: number) => {
    return await db.deleteFrom("messages")
    .where("id", "=", messageId)
    .returning("id")
    .executeTakeFirstOrThrow()
}