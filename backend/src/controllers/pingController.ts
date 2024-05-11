import express from "express";

export const ping = (req: express.Request, res: express.Response) => {
    res.sendStatus(204);
};
