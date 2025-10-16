import { Router, Request, Response, NextFunction } from "express";
import { IController } from "../contracts/IController";
import ResponseApi from "../contracts/response/responseApi";
import { RequestLoginDTO } from "../data/dtos/requestLoginDTO";

export default class UserController implements IController {
    public path = "/user";
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post("/login", this.login);
    }

    // Corrigido: Métodos transformados em arrow functions para manter o contexto 'this'
    private login = (req: Request, res: Response, next: NextFunction) => {
        const request: RequestLoginDTO = new RequestLoginDTO(req.body);
        
        ResponseApi.Ok({res : res, message: "Login efetuado com sducesso"});
    };
}
