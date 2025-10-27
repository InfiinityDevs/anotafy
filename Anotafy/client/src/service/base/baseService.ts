import axios from "axios";
import Response from "../../types/response";

interface IRequestConfig {
    method: "get" | "post" | "put" | "delete" | "patch";
    endpoint: string;
    data?: any;
}

export class BaseService {
    private baseUrl: string;

    constructor(base: string) {
        // Use o IP da sua máquina ou variável de ambiente
        console.log("🌐 Ambiente:", import.meta.env);
        const API_HOST =
            import.meta.env.MODE === "development"
                ? "http://192.168.0.112:8080"
                : "http://localhost:8080"; // Fallback

        this.baseUrl = `${API_HOST}/api/v1${base}`;
    }

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
            withCredentials: true, // ✅ Isso está correto para cookies
        };

        console.log("📥 Requisição:", config);

        try {
            const response = await axios.request(config);
            return new Response(response);
        } catch (error: any) {
            return new Response(error);
        }
    }
}
