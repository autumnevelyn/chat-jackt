import express from "express";
import { ping } from "../controllers/pingController";

export const testRouter = express.Router();

testRouter.get("/", ping);