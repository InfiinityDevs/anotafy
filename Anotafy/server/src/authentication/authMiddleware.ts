import { Request, Response, NextFunction } from "express";
import { ITokenPayload, JwtService } from "./jwtService";
import ExceptionUnauthorized from "../contracts/exceptions/exceptionUnauthorized";

export interface AuthenticatedRequest extends Request {
    user?: ITokenPayload;
}

export function protect(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): void {
    const token = req.cookies.token;

    console.log("Token recebido no middleware:", token);

    if (!token) {
        throw new ExceptionUnauthorized("Não autorizado, token ausente.");
    }

    try {
        const decodedPayload = JwtService.verifyToken(token) as ITokenPayload;
        req.user = decodedPayload;
        next();
    } catch (error) {
        throw new ExceptionUnauthorized("Não autorizado, token inválido.");
    }
}