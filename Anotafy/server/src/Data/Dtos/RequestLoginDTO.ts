import { ValidateInput } from "../../Contracts/ClassNotations/ValidateInput";
import { required } from "../../Contracts/Notations/Required";

export interface IRequestLoginDTO {
    login: string;
    senha: string;
}

@ValidateInput
export class RequestLoginDTO {
    @required
    public Login: string;

    @required
    public Senha: string;

    constructor(data: IRequestLoginDTO) {
        this.Login = data.login;
        this.Senha = data.senha;
    }
}
