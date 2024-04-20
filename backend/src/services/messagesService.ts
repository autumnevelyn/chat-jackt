import { db } from "../db";
import { NewMessage, Message, MessageUpdate } from "../types";


export const getMessagesBetweenUsers = async (userId1: number, userId2: number): Promise<Message[]> => {
    
    // SELECT * FROM messages WHERE (sender_id = $1 AND recipient_id = $2) OR (sender_id = $2 AND recipient_id = $1)
    return await db.selectFrom("messages").selectAll()
    .where((w) => w.or([
        w.and([
            w("sender_id", "=", userId1),
            w("recipient_id", "=", userId2)
        ]),
        w.and([
            w("sender_id", "=", userId2),
            w("recipient_id", "=", userId1)
        ])
    ])).execute();
}

export const getSingleMessage = async (messageId: number): Promise<Message> => {
    return await db.selectFrom("messages").selectAll()
    .where("id", "=", messageId)
    .executeTakeFirstOrThrow()
}

export const addMessage = async (senderId: number, recipientId: number, messageContent: string) => {

    // INSERT INTO messages (sender_id, recipient_id, content) VALUES ($1, $2, $3)
    return await db.insertInto("messages")
    .values({
        sender_id: senderId,
        recipient_id: recipientId,
        content: messageContent
    })
    .returning("id")
    .executeTakeFirstOrThrow()
}