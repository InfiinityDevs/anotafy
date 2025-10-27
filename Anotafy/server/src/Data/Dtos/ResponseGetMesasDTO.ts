import { StatusMesa } from "../../Objects/Enums/StatusMesa";

export default class ResponseGetMesasDTO {
    id!: number;
    identificacao!: string;
    status!: StatusMesa;
    inicio?: Date;
}