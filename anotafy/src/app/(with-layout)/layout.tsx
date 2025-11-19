import { ReactNode } from "react";
import LayoutClient from "./LayoutClient";
import { serverRequireAuth } from "@/lib/auth-server";

export default async function Layout({ children }: { children: ReactNode }) {
    await serverRequireAuth();
    return <LayoutClient>{children}</LayoutClient>;
}
