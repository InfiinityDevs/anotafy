import bcrypt from "bcryptjs";
import { UserRepository } from "@/repositories/user-repository";
import { signToken } from "@/lib/jwt";

export class AuthService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async login(login: string, passwordPlain: string) {
        // 1. Busca usuário no banco
        const user = await this.userRepository.findByLogin(login);

        console.log(user);

        if (!user) {
            throw new Error("Credenciais inválidas");
        }

        if (user.password !== passwordPlain) {
            throw new Error("Credenciais inválidas");
        }

        // 3. Gera o Token JWT
        const token = await signToken({
            userId: user.id,
            role: user.type_user,
        });

        return token;
    }
}
