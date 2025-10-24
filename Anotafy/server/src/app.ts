// src/app.ts
import "dotenv/config";
import express from "express";
import routes from "./routes";
import ErrorMiddleware from "./contracts/ErrorMiddleware";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// ✅ ORDEM CORRETA:
// 1. Middlewares básicos do Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Cookie parser (antes do CORS)
app.use(cookieParser());

// 3. CORS (depois do cookie parser, antes das rotas)
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    })
);

// 4. Suas rotas
app.use("/api/v1", routes);

// 5. Error middleware (sempre por último)
app.use(ErrorMiddleware);

export default app;
