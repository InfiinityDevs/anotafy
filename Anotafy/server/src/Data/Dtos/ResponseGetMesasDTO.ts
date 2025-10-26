import { StatusMesa } from "../../Objects/Enums/StatusMesa";

export default class ResponseGetMesasDTO {
    id!: number;
    identificacao!: string;
    status!: StatusMesa;
    capacidade?: number;
    pessoas?: number; 
    horaAbertura?: Date;
    totalMesa?: number;
}