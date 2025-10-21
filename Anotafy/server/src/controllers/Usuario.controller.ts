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
        this.router.get("/teste", protect, this.teste);
    }

    private login = async (req: Request, res: Response, next: NextFunction) => {
        const request : RequestLoginDTO = new RequestLoginDTO(req.body);

        if (await this.userService.loginUser(request)) {
            const token = JwtService.generateToken({ id: 1 });

            res.cookie("token", token, {
                httpOnly: true, // Protege contra XSS
                secure: true, // Só envia em HTTPS em produção process.env.NODE_ENV === "production"
                sameSite: "strict", // Protege contra CSRF
                maxAge: 3600000, // 1 hora em milissegundos
            });

            ResponseApi.Ok({ res: res, message: "Login bem-sucedido!" });
        }
    };

    private teste = async (req: Request, res: Response, next: NextFunction) => {
        ResponseApi.Ok({ res: res, message: "Acesso autorizado a rota protegida!" });
    };
}
