import type { ReactNode } from "react";

// Definindo os tipos para as propriedades do componente
type LayoutProps = {
    sidebar: ReactNode;
    content: ReactNode;
};

export default function Layout({ sidebar, content }: LayoutProps) {
    return (
        <div className="w-full h-screen bg-background-2">
            <div className="relative flex flex-row h-full w-full">
                <aside className="w-full flex items-center">{sidebar}</aside>
                <main className="flex-1">{content}</main>
            </div>
        </div>
    );
}
