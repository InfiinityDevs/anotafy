import { CircleDollarSign, HandPlatter, Wallet } from "lucide-react";
import Layout from "../../components/Layout";
import { useState, type ReactNode } from "react";
import SideBar from "../../components/SideBar";

const enumItemsMenu = {
    GARCOM: "garcom",
    CAIXA: "caixa",
    FINANCEIRO: "financeiro",
} as const;

type ItemsMenu = (typeof enumItemsMenu)[keyof typeof enumItemsMenu];

const contentScreen : Record<ItemsMenu, ReactNode> = {
    [enumItemsMenu.GARCOM] : <div>Garçom Content</div>,
    [enumItemsMenu.CAIXA] : <div>Caixa Content</div>,
    [enumItemsMenu.FINANCEIRO] : <div>Financeiro Content</div>
};

export default function Home() {
    const [activeScreen, setActiveScreen] = useState<ItemsMenu>(
        enumItemsMenu.GARCOM
    );

    const sideBar = [
        {
            label: "Garçom",
            icon: HandPlatter,
            id: enumItemsMenu.GARCOM,
            action: () => setActiveScreen(enumItemsMenu.GARCOM),
        },
        {
            label: "Caixa",
            icon: CircleDollarSign,
            id: enumItemsMenu.CAIXA,
            action: () => setActiveScreen(enumItemsMenu.CAIXA),
        },
        {
            label: "Financeiro",
            icon: Wallet,
            id: enumItemsMenu.FINANCEIRO,
            action: () => setActiveScreen(enumItemsMenu.FINANCEIRO),
        },
    ];

    return (
        <Layout
            sidebar={<SideBar items={sideBar} active={activeScreen} />}
            content={contentScreen[activeScreen]}
        />
    );
}
