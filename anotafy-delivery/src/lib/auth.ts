import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { UserRepository } from "@/repositories/user-repository";

export type AuthenticatedUser = {
    id: number;
    login: string;
    role: string;
};

export async function getSessionToken() {
    return (await cookies()).get("session_token")?.value ?? null;
}

export async function getUser(): Promise<AuthenticatedUser | null> {
    const token = await getSessionToken();
    if (!token) {
        return null;
    }

    const payload = await verifyToken(token);
    if (!payload || typeof payload.userId !== "number") {
        return null;
    }

    const userRepository = new UserRepository();
    const user = await userRepository.findById(payload.userId);

    if (!user) {
        return null;
    }

    return {
        id: user.id,
        login: user.login,
        role: user.type_user,
    };
}
