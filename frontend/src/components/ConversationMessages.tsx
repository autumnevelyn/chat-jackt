import { Message } from "@/types";
import { MessageBubble } from "./MessageBubble";

const getMessages = async (conversationId: string): Promise<{messages: Message[]}> => {
    const res = await fetch(`http://localhost:3001/api/conversations/${conversationId}`,{cache:"no-store"});

    return res.json();
}

export const ConversationMessages = async ({conversationId}:{conversationId: string}) => {
    const data = await getMessages(conversationId);
    return(
        <div className="flex flex-col-reverse overflow-y-auto bg-gray-100 p-4 rounded-md shadow-md" >
            {data.messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
            ))}
        </div>
    );
}