import { query } from "../db/db";

interface Message {
    id: number;
    sender: string;
    recipient: string;
    content: string;
    created_at: Date;
  }

export const getMessagesBetweenUsers = async (user1: string, user2: string): Promise<Message[]> => {
    const result = await query(
        "SELECT * FROM messages WHERE (sender_id = $1 AND recipient_id = $2) OR (sender_id = $2 AND recipient_id = $1)", 
        [user1, user2]
    );

    return result.rows
}