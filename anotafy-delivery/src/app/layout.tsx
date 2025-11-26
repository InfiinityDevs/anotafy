import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Anotafy delivery",
    description: "Anotafy delivery app",
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="pt-BR">
            <body>{children}</body>
        </html>
    );
}
