"use server";

import { AuthService } from "@/services/auth-service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const authService = new AuthService();

export type LoginFormState = {
    error: string | null;
};

export async function loginAction(
    _prevState: LoginFormState,
    formData: FormData
): Promise<LoginFormState> {
    const login = formData.get("login");
    const password = formData.get("password");

    if (!login || !password) {
        return { error: "Informe login e senha." };
    }

    try {
        // Chama a camada de serviço
        const token = await authService.login(String(login), String(password));

        // Define o cookie HTTP-Only (Segurança máxima)
        (await cookies()).set("session_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 8, // 8 horas
            path: "/",
            sameSite: "lax",
        });
    } catch (error) {
        return { error: "Usuário ou senha incorretos." };
    }

    // Redireciona para a rota privada
    redirect("/dashboard");
}

export async function logoutAction() {
    (await cookies()).delete("session_token");
    redirect("/login");
}
