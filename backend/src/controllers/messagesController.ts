import { RequestHandler } from "express";
import * as messagesService from "../services/messagesService";
import { NewMessage } from "../types";


export const getMessage: RequestHandler = async (req, res, next) => {
    const { messageId } = req.params;

    try {
      const message = await messagesService.getSingleMessage(parseInt(messageId));
      res.json(message);
    } catch (error){
      next(error);
    }
}

export const addMessage:RequestHandler = async(req, res, next) => {
    const body: NewMessage = req.body;

    try {
        const result = await messagesService.addMessage(body.sender_id, body.conversation_id, body.content);

        res.status(201).json({
            newMessageId: result?.id,
            createdAt: new Date().toISOString()
        });
    } catch (error) {
        next(error);
    }
}

export const deleteMessage: RequestHandler = async(req, res, next) => {
    const { messageId } = req.params;

    try {
      const result = await messagesService.deleteMessage(parseInt(messageId));
      res.json({
        deletedMessageId: result?.id,
        deletedAt: new Date().toISOString()
    });
    } catch (error){
      next(error);
    }
}