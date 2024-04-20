import { Router } from "express";
import * as messagesController from "../controllers/messagesController"

export const messagesRouter = Router();

messagesRouter.get("/:user1Id/:user2Id", messagesController.getMessages);

messagesRouter.post("/", messagesController.addMessage);