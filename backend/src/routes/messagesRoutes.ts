import { Router } from "express";
import * as messagesController from "../controllers/messagesController"

export const messagesRouter = Router();

messagesRouter.get("/:userId1/:userId2", messagesController.getMessages);

messagesRouter.post("/", messagesController.addMessage);