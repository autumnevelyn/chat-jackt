import { RequestHandler } from "express";
import { NewUser } from "../types";
import * as usersService from "../services/usersService"

export const createUser:RequestHandler = async(req, res, next) => {
    const body: NewUser = req.body;

    try {
        const result = await usersService.createUser(body.username, body.password);

        res.status(201).json({
            newUserId: result?.id,
            createdAt: new Date().toISOString()
        });
    } catch (error) {
        next(error);
    }
}
