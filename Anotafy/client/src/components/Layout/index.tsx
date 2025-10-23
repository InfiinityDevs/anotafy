import type { ReactNode } from "react";

// Definindo os tipos para as propriedades do componente
type LayoutProps = {
    sidebar: ReactNode;
    content: ReactNode;
};

export default function Layout({ sidebar, content }: LayoutProps) {
    return (
        <div className="w-full h-screen bg-backgound">
            <div className="relative flex flex-row h-full w-full">
                {sidebar}
                <main className="py-6 pr-6 pl-2 w-full h-full">
                    {content}
                </main>
            </div>
        </div>
    );
}
