import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/jwt";

const privateRoutePrefixes = ["/dashboard", "/admin", "/perfil"];

export async function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get("session_token")?.value;

    // Verifica se a rota atual começa com algum prefixo privado
    const isPrivateRoute = privateRoutePrefixes.some((prefix) =>
        path.startsWith(prefix)
    );

    // Verifica se é a página de login (para redirecionar se já estiver logado)
    const isLoginPage = path === "/login";

    // --- REGRA 1: Proteção de Rotas Privadas ---
    if (isPrivateRoute) {
        // Se não tem token, manda pro login
        if (!token) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        // Se tem token, valida se é legítimo
        const payload = await verifyToken(token);
        if (!payload) {
            // Token inválido ou expirado
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    // --- REGRA 2: Redirecionamento de usuários já logados ---
    // Se o cara já tá logado e tenta entrar no login, manda pro dashboard
    if (isLoginPage && token) {
        const payload = await verifyToken(token);
        if (payload) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
    }

    return NextResponse.next();
}

// Configuração: Onde o middleware deve rodar
export const config = {
    /*
     * Matcher: Filtra onde o middleware roda.
     * A regex abaixo diz: "Rode em tudo, EXCETO arquivos estáticos e API"
     * Isso garante que imagens, CSS, JS e favicon não passem pela verificação de token (performance).
     */
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
