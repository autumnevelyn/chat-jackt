import { Message } from "../types"

export const MessageBubble = ({message}: {message: Message}) => {
    const sendDate = new Date(message.created_at)

    return(
        <div className="border border-gray-300 rounded p-4 mb-4">
            <div className="font-semibold mb-1">sender_id: {message.sender_id}</div>
            <div className="mb-2">{message.content}</div>
            <div className="text-xs text-gray-500">{prependZero(sendDate.getDate())}/{prependZero(sendDate.getMonth())}/{prependZero(sendDate.getFullYear())} at {prependZero(sendDate.getHours())}:{prependZero(sendDate.getMinutes())}</div>
        </div>
    );
}

const prependZero = (number: number) => {
    return String(number).padStart(2,"0")
}