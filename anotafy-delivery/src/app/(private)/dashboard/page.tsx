import { logoutAction } from "@/controllers/auth-controller";
import { getUser } from "@/lib/auth";

export default async function DashboardPage() {
    const user = await getUser();

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-green-600">
                Área Restrita 🔓
            </h1>
            <p className="mt-4">
                Bem-vindo, <strong>{user?.login ?? "usuário"}</strong>. Seu
                perfil é <strong>{user?.role ?? "N/A"}</strong>.
            </p>

            <form action={logoutAction} className="mt-6">
                <button className="bg-red-500 text-white px-4 py-2 rounded">
                    Sair do Sistema
                </button>
            </form>
        </div>
    );
}
