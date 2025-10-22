import axios from "axios";
import Response from "../../types/response";

interface IRequestConfig {
    method: "get" | "post" | "put" | "delete" | "patch";
    endpoint: string;
    data?: any;
}

export class BaseService {
    private baseUrl: string = "http://localhost:8080/api/v1";

    constructor(base: string) {
        this.baseUrl += base;
    }

    // baseService.ts - MELHOR TRATAMENTO
    public async request({
        method,
        endpoint,
        data = undefined,
    }: IRequestConfig): Promise<Response> {
        const config: any = {
            method: method,
            url: this.baseUrl + endpoint,
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
            withCredentials: true,
        };


        try {
            const response = await axios.request(config);
            return new Response(response);
        } catch (error: any) {
            return new Response(error);
        }
    }
}
