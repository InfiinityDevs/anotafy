import { NextFunction, Request, Response, Router } from "express";
import { IController } from "../Contracts/IController";
import { AuthRequest, Protect } from "../Authentication/AuthMiddleware";
import ResponseApi from "../Contracts/Response/ResponseApi";
import { GetUserdUser } from "../utils/GetUserToken";
import { ITokenPayload } from "../Authentication/JwtService";

export default class MesaController implements IController {
    public path = "/mesa";
    public router = Router();

    constructor() {
        this.InitializeRoutes();
    }

    private InitializeRoutes() {
        this.router.get("/", Protect, this.getMesas);
    }
    
    private getMesas = async ( req: AuthRequest, res: Response, next: NextFunction ) => {
        const user: ITokenPayload = GetUserdUser(req);

        console.log("User ID:", user.id);

        ResponseApi.Ok({ res, message: "Sucesso!", data: {} });
    };
}
