import { Request, Response, NextFunction } from "express";
import { ITokenPayload, JwtService } from "./JwtService";
import ExceptionUnauthorized from "../Contracts/Exceptions/ExceptionUnauthorized";

export interface AuthenticatedRequest extends Request {
    user?: ITokenPayload;
}

export function Protect(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): void {
    const token = req.cookies.token;

    if (!token) {
        throw new ExceptionUnauthorized("Não autorizado, token ausente.");
    }

    try {
        const decodedPayload = JwtService.VerifyToken(token) as ITokenPayload;
        req.user = decodedPayload;
        next();
    } catch (error) {
        throw new ExceptionUnauthorized("Não autorizado, token inválido.");
    }
}
