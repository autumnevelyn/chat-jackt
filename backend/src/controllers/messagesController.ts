import { RequestHandler } from "express"
import * as messagesService from "../services/messagesService";


export const getMessages: RequestHandler = async (req, res, next) => {
    const { user1Id, user2Id } = req.params;


    try {
      const messages = await messagesService.getMessagesBetweenUsers(user1Id, user2Id);
      res.json(messages);
    } catch (error){
      console.error(error); // TODO: create logging middleware
      res.status(500).json({ message: 'Internal server error' }); // TODO: Handle better errors
    }
}

export const addMessage:RequestHandler = async(req, res, next) => {
    try {
        const { senderId, recipientId, messageContent } = req.body;
        await messagesService.addMessage(senderId, recipientId, messageContent);
        res.status(201).json({
            // TODO: returrn this: id: messageId, 
            createdAt: new Date().toISOString()
        });
    } catch (error) {
        console.error(error); // TODO: create logging middleware
        res.status(500).json({ message: 'Internal server error' }); // TODO: Handle better errors
    }
}