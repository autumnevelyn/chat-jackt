import { RequestHandler } from "express";
import * as messagesService from "../services/messagesService";
import * as conversationsService from "../services/conversationsService";

export const getMessages: RequestHandler = async (req, res, next) => {
    const lastMessageTimeStamp = new Date(
        (req.query.lastMessageTimeStamp as string) || new Date().toISOString()
    );
    const pageSize = parseInt((req.query.size as string) || "20");
    const conversationId = parseInt(req.params.conversationId);

    try {
        const messages = await messagesService.getPaginatedMessages(
            conversationId,
            lastMessageTimeStamp,
            pageSize
        );
        res.json({
            messages,
        });
    } catch (error) {
        next(error);
    }
};

export const getConversationInfo: RequestHandler = async (req, res, next) => {
    const conversationId = parseInt(req.params.conversationId);

    try {
        const convoInfo = await conversationsService.getConversationInfo(conversationId);
        const convoMembers = await conversationsService.getConversationMembers(conversationId);
        res.json({
            conversation: convoInfo,
            members: convoMembers,
        });
    } catch (error) {
        next(error);
    }
};
