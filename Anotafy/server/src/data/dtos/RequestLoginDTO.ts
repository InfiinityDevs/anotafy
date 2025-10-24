import { ValidateInput } from "../../contracts/classNotations/ValidateInput";
import { required } from "../../contracts/notations/Required";

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
