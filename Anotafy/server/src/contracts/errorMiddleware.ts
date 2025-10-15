import { Request, Response, NextFunction } from "express";
import ApiException from "./apiException";

interface IErrorMiddleware {
    err: Error;
    req: Request;
    res: Response;
    next: NextFunction;
}

export default function errorMiddleware({
    err,
    req,
    res,
    next,
}: IErrorMiddleware) {
    if (err instanceof ApiException) {
        return res.status(err.Status).json({
            status: err.Status,
            success: false,
            message: err.message,
            errors: err.Errors ?? null,
        });
    }

    console.error(err);

    return res.status(500).json({
        status: 500,
        success: false,
        message: "Erro interno do servidor.",
        errors: err,
    });
}
