import axios from "axios";
import Response from "../../types/response";

interface IRequestConfig {
    method: "get" | "post" | "put" | "delete" | "patch";
    endpoint: string;
    data?: any;
}

// BaseService.ts - Para produção com domínios diferentes
export class BaseService {
    private baseUrl: string;

    constructor(base: string) {
        
        if (import.meta.env.PROD) {
            console.log("🌐 Ambiente de Produção");
            this.baseUrl = `https://api.meusite.com/api/v1${base}`;
        } else {
            console.log("🌐 Ambiente de Desenvolvimento");
            const currentOrigin = window.location.origin;
            const isLocalhost = currentOrigin.includes('localhost') || 
                               currentOrigin.includes('127.0.0.1');
            
            this.baseUrl = isLocalhost 
                ? `http://localhost:8080/api/v1${base}`
                : `http://192.168.0.112:8080/api/v1${base}`;
        }

        console.log("🌐 Configuração:", {
            ambiente: import.meta.env.PROD,
            frontend: window.location.origin,
            backend: this.baseUrl
        });
    }

    public async request({ method, endpoint, data = undefined }: IRequestConfig): Promise<Response> {
        const config: any = {
            method: method,
            url: this.baseUrl + endpoint,
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
            withCredentials: true,
        };

        console.log("📤 Requisição Cross-Domain:", {
            from: window.location.origin,
            to: config.url,
            withCredentials: config.withCredentials
        });

        try {
            const response = await axios.request(config);
            return new Response(response);
        } catch (error: any) {
            console.error("❌ Erro Cross-Domain:", {
                message: error.message,
                status: error.response?.status,
                url: config.url
            });
            return new Response(error);
        }
    }
}