// src/app/home/page.tsx
"use client";

import { useEffect, useState } from "react";
import Header from "@/components/home/Header";
import SideBar, { ItemSideBarProps } from "@/components/home/SideBar";
import {
    FileText,
    HomeIcon,
    TrendingUp,
    Users,
    Utensils,
    Wallet,
} from "lucide-react";
import { UserPayload } from "@/lib/auth-server";
import { Auth } from "@/lib/auth";
import Cadastros from "./Cadastros";

export type PageType =
    | "Dashboard"
    | "Mesas"
    | "Cadastros"
    | "Caixa"
    | "Financeiro"
    | "Relatórios";

const sideBarItems: ItemSideBarProps[] = [
    {
        icon: HomeIcon,
        children: "Dashboard",
    },
    {
        icon: Utensils,
        children: "Mesas",
    },
    {
        icon: Users,
        children: "Cadastros",
    },
    {
        icon: Wallet,
        children: "Caixa",
    },
    {
        icon: TrendingUp,
        children: "Financeiro",
    },
    {
        icon: FileText,
        children: "Relatórios",
    },
];

const RenderPage = (page: PageType) => {
    switch (page) {
        case "Cadastros":
            return <Cadastros/>
            
        default:
            return null;
    }
}

export default function Home() {
    const [selectPage, setSelectPage] = useState<PageType>("Dashboard");
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<UserPayload>({ id: 0 });

    useEffect(() => {
        const checkAuth = async () => {
            try {
                setUser(await Auth.requireAuth());
                setIsAuthenticated(true);
            } catch (error) {
                window.location.href = "/login";
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (isLoading) {
        return <div>Carregando...</div>;
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <main className="flex flex-col h-screen overflow-hidden">
            <Header />
            <div className="flex flex-row flex-1 min-h-0">
                {" "}
                <nav className="w-58 h-full">
                    <SideBar
                        active={selectPage}
                        items={sideBarItems}
                        setter={setSelectPage}
                    />
                </nav>
                <div className="flex-1 h-full overflow-hidden">
                    {" "}
                    {RenderPage(selectPage)}
                </div>
            </div>
        </main>
    );
}
