"use client";

import React, { useState } from "react";

interface MessageInputProps {
    onMessageSend: (messageContent: string) => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({ onMessageSend }) => {
    const [newMessage, setNewMessage] = useState<string>("");

    const handleMessageSend = () => {
        onMessageSend(newMessage);
        setNewMessage("");
    };

    return (
        <div className="flex items-center mt-4">
            <input
                type="text"
                className="flex-grow border border-gray-300 rounded-md px-4 py-2 mr-2"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                onClick={handleMessageSend}
            >
                Send
            </button>
        </div>
    );
};
