import { Router } from "express";
import { getMessages } from "../controllers/messagesController"

export const messagesRouter = Router();

messagesRouter.get('/:user1/:user2', getMessages);