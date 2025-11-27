"use client";

import { loginAction } from "@/controllers/auth-controller";
import { useState } from "react";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Image from "next/image";
import deliveryHero from "@/assets/ilustration-login.png";

export default function LoginForm() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const hanbleLogin = async () => {
        await loginAction({ login, password });
    };

    return (
        <div className="min-h-screen flex w-full bg-background">
            <div className="flex-1 flex items-center justify-center p-8 bg-background">
                <Card className="flex flex-col gap-5 w-full max-w-md p-8">
                    <div className="w-full flex flex-col justify-center items-center">
                        <h1 className="font-bold text-3xl text-primary">
                            Anotafy
                        </h1>
                        <p className="text-muted-foreground">
                            Entre na sua conta!
                        </p>
                    </div>

                    <div className="flex flex-col w-full gap-2">
                        <Label>Login</Label>
                        <Input
                            placeholder="Login"
                            className="h-12"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col w-full gap-2">
                        <Label>Senha</Label>
                        <Input
                            placeholder="Senha"
                            className="h-12"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <a
                        className="text-right text-sm text-primary hover:text-primary/80 transition-colors"
                        href="#"
                    >
                        Esqueci minha senha
                    </a>

                    <Button onClick={hanbleLogin} className="w-full h-12 cursor-pointer">
                        Entrar
                    </Button>

                   <span className="text-center text-muted-foreground">
                        Não tem uma conta? <a href="/register" className="text-primary font-medium hover:text-primary/80">Cadastre-se</a>
                    </span>
                </Card>
            </div>

            <div className="hidden lg:flex flex-1 relative overflow-hidden bg-muted">
                <div className="absolute inset-0 bg-linear-150 from-primary/60 to-primary/20 z-10" />

                <Image
                    src={deliveryHero}
                    alt="Delicious food delivery"
                    className="absolute w-full h-full "
                />

                <div className="absolute inset-0 flex items-center justify-center z-20 p-12 pointer-events-none">
                    <div className="text-center text-white">
                        <h2 className="text-5xl font-bold mb-4 drop-shadow-lg">
                            Peça sua comida favorita
                        </h2>
                        <p className="text-xl drop-shadow-lg">
                            Entrega rápida e segura na sua casa
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
