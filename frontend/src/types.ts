
export interface User {
    id: string
    username: string
    password: string
    created_at: string
}

export interface Message {
    id: string
    sender_id: string
    conversation_id: string
    content: string  
    created_at: string
}

export interface Conversation {
    id: string
    type: 'private_message' | 'group_chat'
    title: string
    created_at: string
}
