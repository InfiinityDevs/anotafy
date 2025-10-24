import ExceptionNotFound from "../contracts/exceptions/ExpectionNotFound";
import { RequestLoginDTO } from "../data/dtos/RequestLoginDTO";
import { UsuarioRepository } from "../data/repositories/Usuario.repository";
import { Usuario } from "../objects/models/Usuario.entity";

export class UsuarioService {
    private readonly repo = new UsuarioRepository();

    async LoginUser(login: RequestLoginDTO): Promise<Usuario> {
        const user = await this.repo.FindLogin(login.Login);
        if (!user || user.Senha !== login.Senha)
            throw new ExceptionNotFound("Usuario ou senha inválidos");

        return user;
    }
}
