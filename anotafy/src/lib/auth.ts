"use client";

import {
    serverGetUsuarioToken,
    serverLoginAction,
    serverLogoutAction,
    serverRequireAuth,
} from "./auth-server";

export class Auth {
    static async loginAction({
        login,
        senha,
    }: {
        login: string;
        senha: string;
    }) {
        return await serverLoginAction({ login, senha });
    }

    static async logoutAction() {
        return await serverLogoutAction();
    }

    static async getUsuarioToken() {
        return await serverGetUsuarioToken();
    }

    static async requireAuth() {
        return await serverRequireAuth();
    }

    static async checkAuth() {
        const user = await Auth.getUsuarioToken();

        if (user?.id) return true;

        return false;
    }
}
