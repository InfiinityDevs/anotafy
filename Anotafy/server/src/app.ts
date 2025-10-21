// src/app.ts
import "dotenv/config";
import express from "express";
import routes from "./routes";
import errorMiddleware from "./contracts/errorMiddleware";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", routes);

app.use(errorMiddleware);

export default app;
