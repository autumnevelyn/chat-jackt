import { Router } from "express";
import * as usersController from "../controllers/usersController";


export const usersRouter = Router();

//usersRouter.get("/:userId", usersController.getUser);
usersRouter.post("/", usersController.createUser);
