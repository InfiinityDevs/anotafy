import * as jwt from "jsonwebtoken";
import ExceptionUnauthorized from "../contracts/exceptions/ExceptionUnauthorized";

export interface ITokenPayload {
    id: number | string;
}

export class JwtService {
    public static GenerateToken(payload: ITokenPayload): string {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET não foi definida no .env");
        }

        return jwt.sign(payload, secret, { expiresIn: "8h" });
    }

    public static VerifyToken(token: string): ITokenPayload {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET não foi definida no .env");
        }

        try {
            return jwt.verify(token, secret) as ITokenPayload;
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                throw new ExceptionUnauthorized("Token expirado");
            } else if (error instanceof jwt.JsonWebTokenError) {
                throw new ExceptionUnauthorized("Token inválido");
            } else {
                throw new ExceptionUnauthorized("Erro na verificação do token");
            }
        }
    }
}
