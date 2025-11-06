"use client";

import useAuth from "@/hooks/useAuth";

export default function Home() {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated === null) {
        return <div>Verificando autenticação...</div>;
    }

    if (!isAuthenticated) {
        return <div>Redirecionando para login...</div>;
    }

    return <main></main>;
}
