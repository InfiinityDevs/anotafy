"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { findUsuarioByLogin } from "@/repository/UsuarioRepository";

export interface UserPayload {
    id: number;
}

export async function serverLoginAction({
    login,
    senha,
}: {
    login: string;
    senha: string;
}) {
    try {
        // Validações básicas
        if (!login || !senha) {
            return { success: false, error: "Login e senha são obrigatórios" };
        }

        // Buscar usuário no banco
        const usuario = await findUsuarioByLogin(login);

        if (!usuario) {
            return { success: false, error: "Credenciais inválidas" };
        }

        if (usuario.status !== "YES") {
            return { success: false, error: "Usuário inativo" };
        }

        // Verificar senha
        const senhaValida = senha === usuario.senha;

        if (!senhaValida) {
            return { success: false, error: "Credenciais inválidas" };
        }

        const userPayload: UserPayload = {
            id: usuario.id,
        };

        // Gerar JWT
        const token = jwt.sign(userPayload, process.env.JWT_SECRET!, {
            expiresIn: "8h",
        });

        // Salvar nos cookies
        const cookieStore = await cookies();

        cookieStore.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 8 * 60 * 60, // 8 horas
        });

        cookieStore.set("is_auth", "true", {
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 8 * 60 * 60,
        });

        // Redirecionar para dashboard
        redirect("/home");
    } catch (error) {
        console.error("Erro no login:", error);
        return { success: false, error: "Erro interno do servidor" };
    }
}

export async function serverLogoutAction() {
    const cookieStore = await cookies();

    cookieStore.delete("token");
    cookieStore.delete("is_auth");

    redirect("/login");
}

export async function serverGetUsuarioToken() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return null;
        }

        // Verificar e decodificar JWT
        const user = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
        return user;
    } catch (error) {
        // Token inválido ou expirado
        console.log(error);
        await serverLogoutAction();
        return null;
    }
}

export async function serverRequireAuth() {
    const user = await serverGetUsuarioToken();

    if (!user) {
        redirect("/login");
    }

    return user;
}
