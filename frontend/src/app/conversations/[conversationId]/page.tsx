import { ConversationMessages } from "@/components/ConversationMessages";

export default ({ params }: { params: {conversationId: string} }) => (
  <div className="flex flex-col h-screen p-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Conversation id {params.conversationId} </h2>
        </div>
        <ConversationMessages conversationId={params.conversationId}/>
  </div>
);  