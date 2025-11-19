"use client";

import Image from "next/image";
import { Bell, LogOut, Settings, User, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { Auth } from "@/lib/auth";

export default function Header() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [notifications] = useState(3);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("pt-BR", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    return (
        <header className="w-full flex flex-row items-center px-6 justify-between h-16 bg-white border-b border-gray-200 shadow-sm">
            {/* Logo e Nome do Sistema */}
            <div className="flex flex-row justify-center items-center gap-3">
                <Image
                    src="/Logo.png"
                    alt="Logo"
                    width={40}
                    height={40}
                    className="rounded-lg"
                />
                <div className="flex flex-col">
                    <span className="text-xl font-bold text-gray-800">
                        Anotafy
                    </span>
                    <span className="text-xs text-gray-500">
                        Gestão de Restaurante
                    </span>
                </div>
            </div>

            {/* Informações Centrais - Data/Hora e Status */}
            <div className="flex flex-col items-center">
                <div className="flex items-center gap-4">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800">
                            {formatTime(currentTime)}
                        </div>
                        <div className="text-sm text-gray-500 capitalize">
                            {formatDate(currentTime)}
                        </div>
                    </div>

                    {/* Status do Sistema */}
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full border border-green-200">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium text-green-700">
                            Online
                        </span>
                    </div>
                </div>
            </div>

            {/* Ações do Usuário */}
            <div className="flex flex-row items-center gap-4">
                {/* Notificações */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative"
                        >
                            <Bell className="h-5 w-5" />
                            {notifications > 0 && (
                                <Badge
                                    variant="destructive"
                                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                                >
                                    {notifications}
                                </Badge>
                            )}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                        <DropdownMenuLabel>Notificações</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer hover:bg-gray-50">
                            <div className="font-medium">Nova reserva</div>
                            <div className="text-sm text-gray-500">
                                Mesa 4 - 20:00h
                            </div>
                            <div className="text-xs text-gray-400">
                                Há 5 minutos
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer hover:bg-gray-50">
                            <div className="font-medium">Pedido pronto</div>
                            <div className="text-sm text-gray-500">
                                Comanda #1245
                            </div>
                            <div className="text-xs text-gray-400">
                                Há 15 minutos
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer hover:bg-gray-50">
                            <div className="font-medium">Estoque baixo</div>
                            <div className="text-sm text-gray-500">
                                Refrigerante
                            </div>
                            <div className="text-xs text-gray-400">
                                Há 1 hora
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Mesa Ativa (se aplicável) */}
                <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full border border-blue-200">
                    <Utensils className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-700">
                        Mesa 12
                    </span>
                </div>

                {/* Perfil do Usuário */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="flex items-center gap-2"
                        >
                            <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                <User className="h-4 w-4 text-white" />
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="text-sm font-medium">
                                    João Silva
                                </span>
                                <span className="text-xs text-gray-500">
                                    Gerente
                                </span>
                            </div>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                            <User className="h-4 w-4" />
                            <span>Perfil</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                            <Settings className="h-4 w-4" />
                            <span>Configurações</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="flex items-center gap-2 cursor-pointer "
                            onClick={Auth.logoutAction}
                        >
                            <LogOut className="h-4 w-4" />
                            <span className="font-medium">Sair</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
