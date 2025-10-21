import { Request, Response, NextFunction } from "express";
import ApiException from "./apiException";

export default function errorMiddleware(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (err instanceof ApiException) {
        return res.status(err.Status).json({
            status: err.Status,
            success: false,
            message: err.message,
            ...(err.Errors && { errors: err.Errors }),
        });
    }

    console.error(err.message);

    return res.status(500).json({
        status: 500,
        success: false,
        message: "Erro interno do servidor.",
        errors: err,
    });
}
