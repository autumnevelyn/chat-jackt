import express from "express";
import dotenv from "dotenv";
import { testRouter } from "./routes/testRoutes";
import { messagesRouter } from "./routes/messagesRoutes";

dotenv.config();

const app: express.Express = express();
const port = process.env.PORT || "3000";

// middleware
app.use(express.json());

// routers
app.use("/api/test", testRouter);
app.use("/api/messages", messagesRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});