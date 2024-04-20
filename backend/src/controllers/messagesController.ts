import { RequestHandler } from "express"
import * as messagesService from "../services/messagesService";
import { NewMessage } from "../types";


export const getMessages: RequestHandler = async (req, res, next) => {
    const {userId1, userId2} = req.params;

    try {
      const messages = await messagesService.getMessagesBetweenUsers(parseInt(userId1), parseInt(userId2));
      res.json(messages);
    } catch (error){
      next(error);
    }
}

export const addMessage:RequestHandler = async(req, res, next) => {
    const body: NewMessage = req.body;

    try {
        const result = await messagesService.addMessage(body.sender_id, body.recipient_id, body.content);

        res.status(201).json({
            newMessageId: result?.id,
            createdAt: new Date().toISOString()
        });
    } catch (error) {
        next(error);
    }
}