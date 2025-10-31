import ExceptionNotFound from "../Contracts/Exceptions/ExpectionNotFound";
import { RequestLoginDTO } from "../Data/Dtos/RequestLoginDTO";
import { UsuarioRepository } from "../Data/Repositories/Usuario.repository";
import { Usuario } from "../Objects/Models/Usuario.entity";

export class UsuarioService {
    private readonly repo = new UsuarioRepository();

    async LoginUser(login: RequestLoginDTO): Promise<Usuario> {
        const user = await this.repo.FindLogin(login.Login);
        if (!user || user.Senha !== login.Senha)
            throw new ExceptionNotFound("Usuario ou senha inválidos");

        return user;
    }
}
