import type Response from "../types/response";
import { BaseService } from "./base/baseService";

export default class MesaService extends BaseService {
    constructor() {
        super("/mesa");
    }

    public async GetMesas() : Promise<Response> {
        const response: any = await this.request({
            method: "get",
            endpoint: ""
        });
        return response;
    }
}