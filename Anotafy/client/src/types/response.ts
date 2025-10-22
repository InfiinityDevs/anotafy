// response.ts - CORREÇÃO
export default class Response {
    public status: number;
    public success: boolean;
    public message?: string | null;
    public data?: any;
    public errors?: any;

    constructor(axiosResponse: any) {
        // Se for uma resposta de SUCESSO (sem erro)
        if (axiosResponse.status && !axiosResponse.isAxiosError) {
            this.status = axiosResponse.status;
            this.success = this.status >= 200 && this.status < 300;
            this.message = axiosResponse.data?.message || null;
            this.data = axiosResponse.data?.data || axiosResponse.data || null;
        }
        else {
            this.status = axiosResponse.response?.status || 500;
            this.success = false; // ✅ 401 = false
            this.message =
                axiosResponse.response?.data?.message ||
                axiosResponse.message ||
                "Erro";
            this.data = axiosResponse.response?.data || null;
        }

    }
}
