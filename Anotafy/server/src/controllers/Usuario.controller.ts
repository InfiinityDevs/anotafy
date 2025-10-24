import { Router, Request, Response, NextFunction } from "express";
import { IController } from "../contracts/IController";
import ResponseApi from "../contracts/response/ResponseApi";
import { RequestLoginDTO } from "../data/dtos/RequestLoginDTO";
import { JwtService } from "../authentication/JwtService";
import { Protect } from "../authentication/AuthMiddleware";
import { UsuarioService } from "../services/Usuario.service";
import { Usuario } from "../objects/models/Usuario.entity";
export default class UserController implements IController {
    public path = "/user";
    public router = Router();
    private readonly userService = new UsuarioService();

    constructor() {
        this.InitializeRoutes();
    }

    private InitializeRoutes() {
        this.router.post("/login", this.Login);
        this.router.post("/auth", Protect, this.Auth);
        this.router.post("/logout", this.Logout);
    }

    // UserController - login
    private Login = async (req: Request, res: Response, next: NextFunction) => {
        const request: RequestLoginDTO = new RequestLoginDTO(req.body);
        const user: Usuario = await this.userService.LoginUser(request);

        if (user) {
            const token = JwtService.GenerateToken({ id: user.Id });

            // ✅ CONFIGURAÇÃO PARA DESENVOLVIMENTO
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", // false em desenvolvimento
                sameSite: "lax", // ou "none" se precisar
                maxAge: 1000 * 60 * 60 * 8, // 8h
                expires: new Date(Date.now() + 8 * 60 * 60 * 1000),
                path: "/",
            });

            ResponseApi.Ok({ res, message: "Login bem-sucedido!" });
        }
    };

    private Logout = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true, // false em desenvolvimento
            sameSite: "lax", // ou "none" se precisar
            maxAge: 2880000,
            path: "/",
        });

        ResponseApi.Ok({ res, message: "Logout bem-sucedido!" });
    };

    private Auth = async (req: Request, res: Response, next: NextFunction) => {
        ResponseApi.Ok({
            res: res,
            message: "Acesso autorizado a rota protegida!",
        });
    };
}
