import type { ReactNode } from "react";

// Definindo os tipos para as propriedades do componente
type LayoutProps = {
    sidebar: ReactNode;
    content: ReactNode;
    header: ReactNode;
};

export default function Layout({ sidebar, content, header }: LayoutProps) {
    return (
        <div className="w-full my-h-screen flex flex-col overflow-hidden">
            {header}
            <div className="flex flex-col md:flex-row h-full w-full min-h-0">
                <div className="hidden md:flex">{sidebar}</div>
                <div className="w-full h-full bg-backgound overflow-hidden">{content}</div>
                <div className="flex flex-1 md:hidden">{sidebar}</div>
            </div>
        </div>
    );
}
