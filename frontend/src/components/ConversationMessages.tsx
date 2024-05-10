"use client"

import { Message } from "@/types";
import { MessageBubble } from "./MessageBubble";
import { BACKEND_API_URL } from "@/constants";
import React, { useEffect, useRef, useState } from "react";

export const ConversationMessages = ({conversationId}:{conversationId: string}) => {
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [lastMessageTimestamp, setLastMessageTimestamp] = useState<string | null>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    const messagePageSize = 20; //TODO: maybe make sure this is set programatically so that the div is always scrollable

    // Fetch initial batch of messages and then make sure the view is scrolled to the bottom
    useEffect(() => {
        fetchMessages().then(()=>scrollToBottom());
    }, []);

    const fetchMessages = async () => {
        console.debug("fetching new messages")
        setIsFetching(true)
        try {
            const url = lastMessageTimestamp
                ? `${BACKEND_API_URL}/conversations/${conversationId}?size=${messagePageSize}&lastMessageTimeStamp=${lastMessageTimestamp}`
                : `${BACKEND_API_URL}/conversations/${conversationId}?size=${messagePageSize}`;

            const { messages: newMessages }: { messages: Message[]} = await (await fetch(url,{method: "GET", cache: "no-store"})).json();
            
            if (newMessages.length > 0) {
                const newLastMessageTimestamp = newMessages[newMessages.length - 1].created_at;
                setLastMessageTimestamp(newLastMessageTimestamp);
                setMessages([...messages, ...newMessages]);
            } else {
                console.log('No more messages available.'); // TODO: handle better when end of message history is reached
            }
        } catch (error) {
            console.error('Error fetching messages:', error); // TODO: probably needs better error handling too
        }finally{
            setIsFetching(false)
        }
    };

    const handleScroll: React.UIEventHandler<HTMLDivElement> = (event) => {
        if(isFetching) return; // don't fetch any more messages if we are already waiting for more

        const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;

        if (Math.abs(scrollTop) + clientHeight > scrollHeight-10) {
            fetchMessages();
            setIsFetching(true);
        }
    };

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = 0;
        }
    };


    return(
        <div ref={messagesContainerRef}  className="flex flex-col-reverse overflow-y-scroll h-full bg-gray-100 p-4 rounded-md shadow-md" onScroll={handleScroll}>
            {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
            ))}
        </div>
    );
}


