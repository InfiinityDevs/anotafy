import { Request, Response, NextFunction } from "express";
import { ITokenPayload, JwtService } from "./JwtService";
import ExceptionUnauthorized from "../Contracts/Exceptions/ExceptionUnauthorized";

export type AuthRequest = Request & { user?: ITokenPayload };


export function Protect(req: Request, res: Response, next: NextFunction): void {
    const token = req.cookies?.token; // Use optional chaining

    if (!token) {
        throw new ExceptionUnauthorized("Não autorizado, token ausente.");
    }

    try {
        const decodedPayload = JwtService.VerifyToken(token) as ITokenPayload;
        (req as AuthRequest).user = decodedPayload; // Agora é seguro
        next();
    } catch (error) {
        throw new ExceptionUnauthorized("Não autorizado, token inválido.");
    }
}
