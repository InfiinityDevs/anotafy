import { AuthRequest } from "../Authentication/AuthMiddleware";
import { ITokenPayload } from "../Authentication/JwtService";
import ExceptionUnauthorized from "../Contracts/Exceptions/ExceptionUnauthorized";

export function GetUserdUser(req: AuthRequest): ITokenPayload {
    const user:ITokenPayload = (req as any).user;

    if (!user) {
        throw new ExceptionUnauthorized("Usuário não autenticado"); 
    }
    
    return user;
    
};