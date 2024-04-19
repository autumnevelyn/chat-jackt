import express from "express";
import { getTest } from "../controllers/testController";

export const testRouter = express.Router();

testRouter.get("/", getTest);