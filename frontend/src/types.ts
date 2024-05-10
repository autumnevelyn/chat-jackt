export interface User {
    id: string;
    username: string;
    password: string | null;
    created_at: string;
}

export interface Member extends User {
    member_since: string;
}

export interface Message {
    id: string;
    sender_id: string;
    conversation_id: string;
    content: string;
    created_at: string;
}

export enum ConversationType {
    PRIVATE = "private_message",
    GROUP = "group_chat",
}

export interface Conversation {
    id: string;
    type: ConversationType.GROUP | ConversationType.PRIVATE;
    title: string;
    created_at: string;
}
