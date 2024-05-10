"use client";

import { ConversationMessages } from "@/components/ConversationMessages";
import { MessageInput } from "@/components/MessageInput";
import { BACKEND_API_URL } from "@/constants";
import { Conversation, Member } from "@/types";
import { useEffect, useState } from "react";

interface ConversationData {
    conversation: Conversation;
    members: Member[];
}

export default ({ params }: { params: { conversationId: string } }) => {
    const [conversationData, setConversationData] = useState<ConversationData | null>(null);

    useEffect(() => {
        fetchConversationInfo(params.conversationId);
    }, []);

    const fetchConversationInfo = async (conversationId: string): Promise<void> => {
        const res = await fetch(`${BACKEND_API_URL}/conversations/${conversationId}`, {
            method: "GET",
        });
        const data = await res.json();
        setConversationData(data);
    };

    const handleMessageSend = async (messageContent: string) => {
        try {
            await fetch(`${BACKEND_API_URL}/messages`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    sender_id: 1, // TODO: remove hardcode and make logged in user sender
                    conversation_id: conversationData?.conversation.id,
                    content: messageContent,
                }),
            });
        } catch (error) {
            console.error("Error sending message:", error); //TDOD: better error handling
        }
    };

    return (
        <div className="flex flex-col h-screen p-10">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{conversationData?.conversation.title} </h2>
            </div>
            {conversationData && (
                <ConversationMessages
                    conversationId={conversationData?.conversation.id}
                    members={conversationData?.members}
                />
            )}
            <MessageInput onMessageSend={handleMessageSend} />
        </div>
    ); // TODO: make the title change based on conversation type (only GC has title)
};
