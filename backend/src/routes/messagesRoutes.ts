import { Router } from "express";
import * as messagesController from "../controllers/messagesController";

export const messagesRouter = Router();

// get a singe message by message id
messagesRouter.get("/:messageId", messagesController.getMessage);

// add a new message
messagesRouter.post("/", messagesController.addMessage);

// delete a message by message id
messagesRouter.delete("/:messageId", messagesController.deleteMessage);
