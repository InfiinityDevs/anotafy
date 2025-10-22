import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Logo from "../../components/Logo";
import { useState } from "react";
import { UsuarioService } from "../../service/usuarioService";
import Alert from "../../components/Alert";
import type Response from "../../types/response";
import RadioButton from "../../components/RadioButton";

export default function Login() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [login, setLogin] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [remember, setRemember] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [alert, setAlert] = useState<{
        type: "error" | "success";
        titulo: string;
        message: string;
        open: boolean;
        duration: number;
    }>({ type: "error", titulo: "", message: "", open: false, duration: 4000 });
    const loginService = new UsuarioService();

    async function loginUser() {
        setLoading(true);

        try {
            const response: Response = await loginService.login({
                login: login,
                senha: senha,
            });


            if (response.success) {
                setAlert({
                    ...alert,
                    type: "success",
                    titulo: "Login efetuado com sucesso",
                    message: "Você foi logado com sucesso! Redirecionando...",
                    open: true,
                });

                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                setAlert({
                    ...alert,
                    type: "error",
                    titulo: "Erro ao efetuar login",
                    message:
                        response.message ||
                        "Verifique suas credenciais e tente novamente.",
                    open: true,
                });
            }
        } catch (error: any) {
            console.error("❌ Erro no login:", error);
            setAlert({
                ...alert,
                type: "error",
                titulo: "Erro de conexão",
                message: "Erro ao conectar com o servidor. Tente novamente.",
                open: true,
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-100 to-gray-300 flex items-center justify-center p-4">
            <Alert
                type={alert.type}
                message={alert.message}
                title={alert.titulo}
                open={alert.open}
                duration={alert.duration}
                onClose={() => setAlert({ ...alert, open: false })}
            />
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8">
                <div className={`flex justify-center mb-4`}>
                    <Logo className="w-16" />
                </div>

                <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
                    Anotafy
                </h1>
                <p className="text-center text-gray-600 mb-4">
                    Sistema para a gestão do seu restaurante!
                </p>

                <div className="space-y-6">
                    <div>
                        <label className="block text-md font-medium text-gray-700 mb-2">
                            Usuário
                        </label>
                        <div className="flex px-2 items-center w-full border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 transition-colors focus-within:border-black">
                            <Mail size={20} className=" text-gray-500" />
                            <input
                                onChange={(e) => setLogin(e.target.value)}
                                type="text"
                                className="px-2 py-3 w-full bg-transparent border-none outline-none rounded-lg text-gray-500"
                                placeholder="Digite seu usuário"
                                required
                                value={login}
                                disabled={loading} // ✅ Desabilita durante loading
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-md font-medium text-gray-700 mb-2">
                            Senha
                        </label>
                        <div className="flex items-center w-full border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 transition-colors focus-within:border-black px-2.5">
                            <Lock size={20} className=" text-gray-500" />
                            <input
                                onChange={(e) => setSenha(e.target.value)}
                                type={showPassword ? "text" : "password"}
                                className="px-2 py-3 w-full bg-transparent border-none outline-none rounded-lg text-gray-500"
                                placeholder="Digite sua senha"
                                required
                                value={senha}
                                disabled={loading} // ✅ Desabilita durante loading
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-gray-500 hover:text-gray-700"
                                disabled={loading} // ✅ Desabilita durante loading
                            >
                                {showPassword ? (
                                    <EyeOff
                                        size={20}
                                        className="cursor-pointer"
                                    />
                                ) : (
                                    <Eye size={20} className="cursor-pointer" />
                                )}
                            </button>
                        </div>
                        <div className="mt-1 flex items-center justify-between  ">
                            <RadioButton
                                selected={remember}
                                onChange={setRemember}
                                label={"Lembrar-me"}
                            />
                        <button type="button" className="text-sm font-medium text-blue-500 hover:underline">Esqueci minha senha</button>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg cursor-pointer transition-colors disabled:opacity-50"
                        disabled={loading}
                        onClick={loginUser}
                    >
                        {loading ? "Entrando..." : "Entrar"}
                    </button>
                </div>
            </div>
        </div>
    );
}
