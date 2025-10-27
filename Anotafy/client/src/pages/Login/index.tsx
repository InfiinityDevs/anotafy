import { Mail } from "lucide-react";
import Logo from "../../components/Logo";
import { useState } from "react";
import { UsuarioService } from "../../service/usuarioService";
import Alert from "../../components/Alert";
import type Response from "../../types/response";
import RadioButton from "../../components/RadioButton";
import Input from "../../components/Input";

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
                    message: response.data || "Redirecionando...",
                    open: true,
                });

                console.log(response);

                setTimeout(() => {
                    window.location.reload();
                }, 5000);
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
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8 mobile-keyboard-fix">
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
                        <Input
                            type="text"
                            value={login}
                            onChange={setLogin}
                            placeholder="Digite seu usuário"
                            label="Usuário"
                            disabled={loading}
                            required={true}
                            iconLeft={<Mail size={20} />}
                        />
                    </div>

                    <div>
                        <Input
                            onEnter={loginUser}
                            type="password"
                            value={senha}
                            onChange={setSenha}
                            placeholder="Digite sua senha"
                            label="Senha"
                            disabled={loading}
                            required={true}
                            iconLeft="lock"
                        />
                        <div className="mt-3 flex items-center justify-between mb-8">
                            <RadioButton
                                selected={remember}
                                onChange={setRemember}
                                label={"Lembrar-me"}
                            />
                            <button
                                type="button"
                                className="text-sm font-medium text-blue-500 hover:underline"
                            >
                                Esqueci minha senha
                            </button>
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
