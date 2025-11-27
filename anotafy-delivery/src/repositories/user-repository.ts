import { prisma } from "@/lib/prisma"; // Seu singleton do prisma
import { Prisma, User } from "../../generated/prisma/client";

export class UserRepository {
    async findByLogin(login: string): Promise<User | null> {
        return await prisma.user.findUnique({
            where: { login },
        });
    }

    async findById(id: number): Promise<User | null> {
        return await prisma.user.findUnique({
            where: { id },
        });
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        return await prisma.user.create({
            data,
        });
    }

    async finByLogin(login: string): Promise<User | null> {
        return await prisma.user.findUnique({
            where: { login: login },
        });
    }
}
