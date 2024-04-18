import express from "express";
import { getTest } from "../controllers/testController";

export const router = express.Router();

router.get("/", getTest);