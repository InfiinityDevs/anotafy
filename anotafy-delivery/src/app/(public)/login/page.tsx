import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";
import { LoginForm } from "@/components/LoginForm";

export default async function LoginPage() {
    const user = await getUser();

    if (user) {
        redirect("/dashboard");
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <LoginForm />
        </div>
    );
}
