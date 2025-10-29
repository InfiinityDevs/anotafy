import Response from "../types/response";
import { BaseService } from "./base/baseService";
import axios from "axios";

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


    public async Login({ login, senha }: ILoginRequest): Promise<any> {
        let data = JSON.stringify({
            login: login,
            senha: senha,
        });

        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "http://localhost:8080/api/v1/user/login",
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
        };

        axios
            .request(config)
            .then((response) => {
                return new Response(response);
            })
            .catch((error) => {
                return new Response(error);
            });
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
