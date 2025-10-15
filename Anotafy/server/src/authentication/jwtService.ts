import * as jwt from "jsonwebtoken";

export interface ITokenPayload {
    id: number | string;
    // Você pode adicionar outros campos que espera receber do token
    // Ex: email: string;
}

export class JwtService {
    public static generateToken(payload: ITokenPayload): string {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET não foi definida no .env");
        }

        const token = jwt.sign(
            payload, // Payload: informações que você quer no token
            secret, // A sua chave secreta do servidor
            { expiresIn: "1h" } // Token expira em 1 hora
        );
        return token;
    }

    public static verifyToken(token: string): ITokenPayload {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET não foi definida no .env");
        }

        try {
            return jwt.verify(token, secret) as ITokenPayload;
        } catch (error) {
            throw new Error("Token JWT inválido ou expirado.");
        }
    }
}