"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function useAuth() {
    const router = useRouter();

    // Estado inicial baseado no token (apenas no cliente)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        if (typeof window === "undefined") return false;
        return !!localStorage.getItem("token");
    });

    useEffect(() => {
        // Apenas redireciona se não estiver autenticado
        if (!isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated, router]);

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        router.push("/login");
    };

    const login = (token: string) => {
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
    };

    return {
        token:
            typeof window !== "undefined"
                ? localStorage.getItem("token")
                : null,
        isAuthenticated,
        logout,
        login,
    };
}
