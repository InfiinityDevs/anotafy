"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Auth } from "@/lib/auth";
import { Eye, EyeOff, KeyRound, LucideIcon, Mail } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login() {
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                if (await Auth.checkAuth())
                    router.push("/home");
            } catch (error) {
                console.log(error);
            }
        };

        checkAuth();
    }, [router]);

    const [showPassword, setShowPassword] = useState<{
        icon: LucideIcon;
        type: string;
    }>({ icon: Eye, type: "password" });
    const [loadingLogin, setLoadingLogin] = useState(false);
    const [login, setLogin] = useState("");
    const [senha, setSenha] = useState("");

    const handlePassword = () => {
        if (showPassword.type === "password") {
            setShowPassword({ icon: EyeOff, type: "text" });
        } else {
            setShowPassword({ icon: Eye, type: "password" });
        }
    };

    const handleLogin = async () => {
        setLoadingLogin(true);

        try {
            const retorno = await Auth.loginAction({ login, senha });
            console.log(retorno);

            if (retorno) {
                router.push("/home");
            } else {
                console.error("Erro no login:", retorno);
            }
        } catch (error) {
            console.error("Erro no login:", error);
        } finally {
            setLoadingLogin(false);
        }
    };

    return (
        <main className="w-full h-screen flex justify-center items-center bg-gray-100">
            <Card className="p-4 py-6 w-9/10 md:w-2/4 xl:w-1/4 bg-white">
                <div className="flex flex-col justify-center items-center">
                    <Image src="/Logo.png" alt="Logo" width={64} height={64} />
                    <h1 className="text-2xl font-bold mt-3">Anotafy</h1>
                    <p>Sistema para a gestão do seu restaurante!</p>
                </div>

                <div className="flex flex-col">
                    <div>
                        <Label
                            htmlFor="login"
                            className="text-lg ml-2 font-medium"
                            required
                        >
                            Login
                        </Label>
                        <div className="px-2 border rounded-lg shadow bg-gray-50 flex flex-row items-center focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]">
                            <Mail size={27} className="text-gray-500" />
                            <Input
                                id="login"
                                className="h-12 border-0 shadow-none focus-visible:ring-0"
                                placeholder="Digite o usuário"
                                onChange={(e) => setLogin(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <Label
                            htmlFor="login"
                            className="text-lg ml-2 font-medium"
                            required
                        >
                            Senha
                        </Label>
                        <div className="px-2 border rounded-lg shadow bg-gray-50 flex flex-row items-center focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]">
                            <KeyRound size={27} className="text-gray-500" />
                            <Input
                                type={showPassword.type}
                                id="login"
                                className="h-12 border-0 shadow-none focus-visible:ring-0"
                                placeholder="Digite o usuário"
                                onChange={(e) => setSenha(e.target.value)}
                                onEnter={handleLogin}
                            />
                            <showPassword.icon
                                size={27}
                                className="text-gray-500"
                                onClick={handlePassword}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col mt-2">
                        <div className="flex items-center justify-between px-2 mb-7">
                            <div className="flex items-start gap-3">
                                <Checkbox id="lembrar" />
                                <Label
                                    htmlFor="lembrar"
                                    className="font-normal text-md"
                                >
                                    Lembrar-me
                                </Label>
                            </div>
                            <a
                                href="/alter-password"
                                className="text-md text-blue-700 underline"
                            >
                                Esqueci minha senha
                            </a>
                        </div>
                        <p className="mt-2">
                            Ainda não possui uma conta?{" "}
                            <a
                                href="/register"
                                className="text-blue-700 underline"
                            >
                                Cadastrar-se
                            </a>
                        </p>
                    </div>

                    <Button
                        className={`text-lg font-semibold h-10 mt-3 ${
                            loadingLogin && "bg-primary/50"
                        }`}
                        onClick={handleLogin}
                    >
                        {loadingLogin ? "Entrando..." : "Entrar"}
                    </Button>
                </div>
            </Card>
        </main>
    );
}
