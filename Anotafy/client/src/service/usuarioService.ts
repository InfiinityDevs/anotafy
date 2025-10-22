import { BaseService } from "./base/baseService";

interface ILoginRequest {
    login: string;
    senha: string;
}

export class UsuarioService extends BaseService {
    constructor() {
        super("/user");
    }

    public async login({ login, senha }: ILoginRequest): Promise<any> {
        const response: any = await this.request({
            method: "post",
            endpoint: "/login",
            data: {
                login: login,
                senha: senha,
            },
        });
        return response;
    }

    public async auth(): Promise<any> {
        const response: any = await this.request({
            method: "post",
            endpoint: "/auth"
        });
        return response;
    }

    public async logout(): Promise<any> {
        const response: any = await this.request({
            method: "post",
            endpoint: "/logout"
        });
        return response;
    }
}
