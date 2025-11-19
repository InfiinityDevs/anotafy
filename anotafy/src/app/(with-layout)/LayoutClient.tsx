"use client";

import Header from "@/components/layout/Header";
import SideBar, { ItemSideBarProps } from "@/components/layout/SideBar";
import {
    FileText,
    HomeIcon,
    TrendingUp,
    Users,
    Utensils,
    Wallet,
} from "lucide-react";
import { ReactNode } from "react";

const sideBarItems: ItemSideBarProps[] = [
    {
        icon: HomeIcon,
        children: "Dashboard",
        id: "dashboard",
    },
    {
        icon: Utensils,
        children: "Mesas",
        id: "mesas",
    },
    {
        icon: Users,
        children: "Cadastros",
        id: "cadastros",
    },
    {
        icon: Wallet,
        children: "Caixa",
        id: "caixa",
    },
    {
        icon: TrendingUp,
        children: "Financeiro",
        id: "financeiro",
    },
    {
        icon: FileText,
        children: "Relatórios",
        id: "relatorios",
    },
];

export default function LayoutClient({ children }: { children: ReactNode }) {
    return (
        <main className="flex h-screen flex-col">
            <Header />
            <div className="flex flex-1 flex-row min-h-0">
                <nav className="h-full w-64">
                    <SideBar items={sideBarItems} />
                </nav>
                {children}
            </div>
        </main>
    );
}
