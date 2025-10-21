import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Usuario } from "../../objects/models/Usuario.entity";
import ExceptionNotFound from "../../contracts/exceptions/expectionNotFound";

export class UsuarioRepository {
    private userRepository = AppDataSource.getRepository(Usuario);

    async findLogin(login: string): Promise<Usuario | null> {
        
        return await this.userRepository.findOneBy({ Login: login });
    }

    async getAllUsers(): Promise<Usuario[]> {
        return await this.userRepository.find();
    }

    async getUser(id: number): Promise<Usuario | null> {
        return await this.userRepository.findOneBy({ Id : id });
    }

    async createUser(userData: Usuario) {
        await this.userRepository.save(this.userRepository.create(userData));
    }

    async updateUser(userData: Usuario) {
        const user = await this.getUser(userData.Id);
        if (!user)
            throw new ExceptionNotFound("Usuário não encontrado");

        await this.userRepository.update(userData.Id, userData);
    }

    async deleteUser(id: number) {
        const user = await this.getUser(id);
        if (!user)
            throw new ExceptionNotFound("Usuário não encontrado");

        await this.userRepository.delete(id);
    }
}