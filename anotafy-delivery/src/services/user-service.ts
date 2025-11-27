"use server";

import { UserRepository } from "@/repositories/user-repository";

const repoUser = new UserRepository();

export async function verifyLoginExists(login: string): Promise<boolean> {
    const user = await repoUser.findByLogin(login);
    return !!user;
}
