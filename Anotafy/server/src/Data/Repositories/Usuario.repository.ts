import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Usuario } from "../../Objects/Models/Usuario.entity";
import ExceptionNotFound from "../../Contracts/Exceptions/ExpectionNotFound";

export class UsuarioRepository {
    private userRepository = AppDataSource.getRepository(Usuario);

    async FindLogin(login: string): Promise<Usuario | null> {
        return await this.userRepository.findOneBy({ Login: login });
    }

    async GetAllUsers(): Promise<Usuario[]> {
        return await this.userRepository.find();
    }

    async GetUser(id: number): Promise<Usuario | null> {
        return await this.userRepository.findOneBy({ Id: id });
    }

    async CreateUser(userData: Usuario) {
        await this.userRepository.save(this.userRepository.create(userData));
    }

    async UpdateUser(userData: Usuario) {
        const user = await this.GetUser(userData.Id);
        if (!user) throw new ExceptionNotFound("Usuário não encontrado");

        await this.userRepository.update(userData.Id, userData);
    }

    async DeleteUser(id: number) {
        const user = await this.GetUser(id);
        if (!user) throw new ExceptionNotFound("Usuário não encontrado");

        await this.userRepository.delete(id);
    }
}
