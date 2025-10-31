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
                const response = await userService.auth();
                setAutenticado(response.success);
            } catch (error) {
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

    return autenticado ? <Home /> : <Login />;
}
