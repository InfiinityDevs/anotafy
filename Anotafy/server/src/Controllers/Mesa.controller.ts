import { NextFunction, Request, Response, Router } from "express";
import { IController } from "../Contracts/IController";
import { AuthRequest, Protect } from "../Authentication/AuthMiddleware";
import ResponseApi from "../Contracts/Response/ResponseApi";
import { GetUserdUser } from "../utils/GetUserToken";
import { ITokenPayload } from "../Authentication/JwtService";
import { MesaService } from "../Services/Mesa.service";

export default class MesaController implements IController {
    public path = "/mesa";
    public router = Router();
    public readonly service = new MesaService();

    constructor() {
        this.InitializeRoutes();
    }

    private InitializeRoutes() {
        this.router.get("/", Protect, this.getMesas);
    }
    
    private getMesas = async ( req: AuthRequest, res: Response, next: NextFunction ) => {
        const user: ITokenPayload = GetUserdUser(req);

        const mesas = await this.service.GetMesas(Number(user.id));

        ResponseApi.Ok({ res, message: "Mesas obtidas com êxito!", data: mesas });
    };
}
