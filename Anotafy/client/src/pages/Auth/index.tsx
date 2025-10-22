// Auth/index.tsx - COM MELHOR DEBUG
import { useEffect, useState } from "react";
import { UsuarioService } from "../../service/usuarioService";
import Home from "../Home";
import Login from "../Login";

export default function Auth() {
    const [autenticado, setAutenticado] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const userService = new UsuarioService();

    useEffect(() => {
        async function validation() {
            try {
                console.log("🔄 Verificando autenticação...");
                const response = await userService.auth();

                console.log("🔍 Resposta completa:", response);
                console.log("🔍 Status:", response.status);
                console.log("🔍 Success:", response.success);
                console.log("🔍 Message:", response.message);

                setAutenticado(response.success);
            } catch (error) {
                console.error("❌ Erro na validação:", error);
                setAutenticado(false);
            } finally {
                setLoading(false);
            }
        }
        validation();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-lg">Verificando autenticação...</div>
            </div>
        );
    }

    console.log("🎯 Renderizando:", autenticado ? "Home" : "Login");
    return autenticado ? <Home /> : <Login />;
}
