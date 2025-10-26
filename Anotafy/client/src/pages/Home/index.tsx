import { CircleDollarSign, HandPlatter, Settings, Wallet } from "lucide-react";
import Layout from "../../components/Layout";
import { useEffect, useState, type ReactNode } from "react";
import SideBar from "../../components/SideBar";
import Mesa from "./Mesas";
import Caixa from "./Caixa";
import Financeiro from "./Financeiro";
import Configuracao from "./Configuracao";
import Header from "../../components/Header";

const enumItemsMenu = {
    GARCOM: "garcom",
    CAIXA: "caixa",
    FINANCEIRO: "financeiro",
    CONFIGURACAO: "config",
} as const;

type ItemsMenu = (typeof enumItemsMenu)[keyof typeof enumItemsMenu];

const contentScreen: Record<ItemsMenu, ReactNode> = {
    [enumItemsMenu.GARCOM]: <Mesa />,
    [enumItemsMenu.CAIXA]: <Caixa />,
    [enumItemsMenu.FINANCEIRO]: <Financeiro />,
    [enumItemsMenu.CONFIGURACAO]: <Configuracao />,
};

export default function Home() {
    useEffect(() => {
        document.title = "Anotafy - Home";
    }, []);

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
        {
            label: "Configurações",
            icon: Settings,
            id: enumItemsMenu.CONFIGURACAO,
            action: () => setActiveScreen(enumItemsMenu.CONFIGURACAO),
        },
    ];

    return (
        <Layout
            sidebar={<SideBar items={sideBar} active={activeScreen} />}
            content={contentScreen[activeScreen]}
            header={<Header/>}
        />
    );
}
