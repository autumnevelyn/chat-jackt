import { Router } from "express";
import * as conversationsController from "../controllers/conversationsController";

export const conversationsRouter = Router();

// get paginated list of messages from a conversation
conversationsRouter.get("/:conversationId/messages", conversationsController.getMessages);

// information about a conversation
conversationsRouter.get("/:conversationId", conversationsController.getConversationInfo);