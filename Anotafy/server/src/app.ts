// src/app.ts
import "reflect-metadata";
import "dotenv/config";
import express from "express";
import routes from "./routes";
import errorMiddleware from "./contracts/errorMiddleware";

const app = express();

app.use(express.json());

app.use("/api/v1", routes);

app.use(errorMiddleware);

export default app;
