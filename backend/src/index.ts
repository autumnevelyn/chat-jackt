import express from "express";
import dotenv from "dotenv";
import { router } from "./routes/testRouter"

dotenv.config();

const app: express.Express = express();
const port = process.env.PORT || 3000;

app.use("/api/test", router);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});