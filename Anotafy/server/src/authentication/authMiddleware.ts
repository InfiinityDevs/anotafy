// A primeira alteração é usar 'import' em vez de 'require', que é a sintaxe moderna de módulos.
import { Request, Response, NextFunction } from "express";
import { ITokenPayload, JwtService } from "./jwtService";

export interface AuthenticatedRequest extends Request {
    user?: ITokenPayload;
}

export function protect(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
    const token = req.cookies.token;

    if (!token) {
        res.status(401).json({ message: "Não autorizado, sem token" });
        return; // 'return' explícito para parar a execução.
    }

    try {
        // A verificação do token é a mesma.
        // Em TS, adicionamos 'as string' para garantir ao compilador que a nossa
        // variável de ambiente existe e é do tipo string.
        const decodedPayload = JwtService.verifyToken(
            token,
        ) as ITokenPayload;

        // Anexamos o payload ao pedido. Usar 'req.user' é uma convenção mais comum
        // e descritiva do que 'req.id'. Agora, 'req.user' conterá o objeto { id: '...' }.
        req.user = decodedPayload;

        // A chamada para 'next()' é idêntica.
        next();
    } catch (error) {
        // O tratamento de erro é o mesmo.
        res.status(401).json({ message: "Não autorizado, token inválido" });
    }
};
