import express from "express"

export const getTest = (req: express.Request, res: express.Response) => {
    res.send("Go to sleep!");
}