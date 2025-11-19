import { redirect } from "next/navigation";
import { serverGetUsuarioToken } from "@/lib/auth-server";

export default async function Home() {
    const user = await serverGetUsuarioToken();
    redirect(user ? "/dashboard" : "/login");
}
