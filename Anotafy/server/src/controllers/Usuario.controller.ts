import { Router, Request, Response, NextFunction } from "express";
import { IController } from "../contracts/IController";
import ResponseApi from "../contracts/response/responseApi";
import { RequestLoginDTO } from "../data/dtos/requestLoginDTO";
import { JwtService } from "../authentication/jwtService";
import { protect } from "../authentication/authMiddleware";
import { UsuarioService } from "../services/Usuario.service";
export default class UserController implements IController {
    public path = "/user";
    public router = Router();
    private readonly userService = new UsuarioService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post("/login", this.login);
        this.router.post("/auth", protect, this.auth);
        this.router.post("/logout", this.logout);
    }

    // UserController - login
    private login = async (req: Request, res: Response, next: NextFunction) => {
        const request: RequestLoginDTO = new RequestLoginDTO(req.body);
        const user = await this.userService.loginUser(request);

        if (await this.userService.loginUser(request)) {
            const token = JwtService.generateToken({ id: 1 });

            // ✅ CONFIGURAÇÃO PARA DESENVOLVIMENTO
            res.cookie("token", token, {
                httpOnly: true,
                secure: true, // false em desenvolvimento
                sameSite: "lax", // ou "none" se precisar
                maxAge:2880000, 
                path: "/",
            });

            ResponseApi.Ok({ res, message: "Login bem-sucedido!" });
        }
    };

    private logout = async (req: Request, res: Response, next: NextFunction) => { 
        res.clearCookie("token", {
            httpOnly: true,
            secure: true, // false em desenvolvimento
            sameSite: "lax", // ou "none" se precisar
            maxAge: 2880000,
            path: "/",
        });

        ResponseApi.Ok({ res, message: "Logout bem-sucedido!" });
    }

    private auth = async (req: Request, res: Response, next: NextFunction) => {
        ResponseApi.Ok({
            res: res,
            message: "Acesso autorizado a rota protegida!",
        });
    };
}
