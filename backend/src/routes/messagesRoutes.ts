import { Router } from "express";
import * as messagesController from "../controllers/messagesController"

export const messagesRouter = Router();

// get a conversation between two users
messagesRouter.get("/:userId1/:userId2", messagesController.getMessages);
    
// get a singe message by message id
messagesRouter.get("/:messageId", messagesController.getMessage);

// send/add a new message
messagesRouter.post("/", messagesController.addMessage);