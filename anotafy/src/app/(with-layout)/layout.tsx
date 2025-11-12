"use client";
import Header from "@/components/layout/Header";
import SideBar, { ItemSideBarProps } from "@/components/layout/SideBar";
import { FileText, HomeIcon, TrendingUp, Users, Utensils, Wallet } from "lucide-react";
import { ReactNode, useState } from "react";

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
        id: "dashboard"
    },
    {
        icon: Utensils,
        children: "Mesas",
        id: "mesas"
    },
    {
        icon: Users,
        children: "Cadastros",
        id: "cadastros"
    },
    {
        icon: Wallet,
        children: "Caixa",
        id: "caixa"
    },
    {
        icon: TrendingUp,
        children: "Financeiro",
        id: "financeiro"
    },
    {
        icon: FileText,
        children: "Relatórios",
        id: "relatorios"
    },
];

export default function Layout({ children }: { children: ReactNode }) {
    const [selectPage, setSelectPage] = useState<PageType>("Dashboard");
    return <main className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-row min-h-0 flex-1">
            <nav className="w-64 h-full">
                <SideBar
                    active={selectPage}
                    items={sideBarItems}
                    setter={setSelectPage}
                />
            </nav>
            {children}
        </div>
    </main>;
}
