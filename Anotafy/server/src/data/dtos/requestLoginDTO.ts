import { required } from "../../contracts/notations/required";

export interface IRequestLoginDTO {
    login: string;
    senha: string;
}

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
