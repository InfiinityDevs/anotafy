import type { ReactNode } from "react";

// Definindo os tipos para as propriedades do componente
type LayoutProps = {
    sidebar: ReactNode;
    content: ReactNode;
    header: ReactNode;
};

export default function Layout({ sidebar, content, header }: LayoutProps) {
    return (
        <div className="w-full h-screen flex flex-col">
            {header}
            <div className="flex flex-row h-full w-full">
                {sidebar}
                <div className="w-full h-full">{content}</div>
            </div>
        </div>
    );
}
