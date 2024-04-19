import express from "express"
import { getMessagesBetweenUsers } from "../services/messagesService";


export const getMessages = async (req: express.Request, res: express.Response) => {
    const { user1, user2 } = req.params;


    try {
      const messages = await getMessagesBetweenUsers(user1, user2);
      res.json(messages);
    } catch (error){
      console.error(error);// TODO: create logging middleware
      res.status(500).json({ message: 'Internal server error' }); // TODO: Handle better errors
    }
}