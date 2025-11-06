import { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
    title: "Anotafy",
    description: "Plataforma de controle de mesas de restaurantes",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`antialiased`}
      >
                {children}
                <Toaster richColors position="top-right"/>
      </body>
    </html>
  );
}
