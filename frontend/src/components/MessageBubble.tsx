import { FC } from "react";
import { Member, Message } from "../types";

interface MessageBubbleProps {
    message: Message;
    members: Member[];
}

export const MessageBubble: FC<MessageBubbleProps> = ({ message, members }) => {
    const sendDate = new Date(message.created_at);
    const sender = members.find((member) => member.id == message.sender_id); // TODO: i think it might be better to join message and user tables already in the db as that would be more optimised?

    return (
        <div className="border border-gray-300 rounded p-4 mb-4 flex items-center">
            <div className="h-8 w-8 rounded-full bg-gray-500 flex items-center justify-center text-white">
                {sender?.username[0].toUpperCase()}
            </div>
            <div className="ml-4">
                <div className="font-semibold mb-1">{sender?.username ?? message.sender_id}</div>
                <div className="mb-2">{message.content}</div>
                <div className="text-xs text-gray-500">
                    {prependZero(sendDate.getDate())}/{prependZero(sendDate.getMonth() + 1)}/
                    {sendDate.getFullYear()} at {prependZero(sendDate.getHours())}:
                    {prependZero(sendDate.getMinutes())}
                </div>
            </div>
        </div>
    );
};

const prependZero = (number: number) => {
    return String(number).padStart(2, "0");
};
