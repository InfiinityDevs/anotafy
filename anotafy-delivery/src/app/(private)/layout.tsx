import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";

export default async function PrivateLayout({
    children,
}: {
    children: ReactNode;
}) {
    const user = await getUser();

    if (!user) {
        redirect("/login");
    }

    return <>{children}</>;
}
