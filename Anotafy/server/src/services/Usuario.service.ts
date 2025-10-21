import ExceptionNotFound from "../contracts/exceptions/expectionNotFound";
import { RequestLoginDTO } from "../data/dtos/requestLoginDTO";
import { UsuarioRepository } from "../data/repositories/Usuario.repository";

export class UsuarioService {
    private readonly repo = new UsuarioRepository();

    async loginUser(login: RequestLoginDTO) : Promise<boolean> {
        const user = await this.repo.findLogin(login.Login);
        if (!user || user.Senha !== login.Senha)
            throw new ExceptionNotFound("Usuario ou senha inválidos");

        return true;
    }
}