import { query } from "../db/db";

interface Message {
    id: number;
    senderId: string;
    recipientId: string;
    messageContent: string;
    createdAt: Date;
  }

export const getMessagesBetweenUsers = async (user1Id: string, user2Id: string): Promise<Message[]> => {
    const result = await query(
        "SELECT * FROM messages WHERE (sender_id = $1 AND recipient_id = $2) OR (sender_id = $2 AND recipient_id = $1)", 
        [user1Id, user2Id]
    );

    return result.rows;
}

export const addMessage = async (senderId: string, recipientId: string, messageContent: string) => {
    const result = await query(
        "INSERT INTO messages (sender_id, recipient_id, content) VALUES ($1, $2, $3)", 
        [senderId, recipientId, messageContent]
    );
}