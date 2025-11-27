import RegisterForm from "@/components/RegisterForm";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

{/*
    Cadastar nova empresa:
    Entrada de dados:
        - Enterprice: Nome, Endereço, CNPJ, ou CPF
        - User: Login, password
        - Employee: Nome, Phone, Email
*/}

export default async function RegisterPage() {

    const user = await getUser();

    if (user)
        redirect("/dashboard");

    return (<div className="flex items-center justify-center h-screen">
            <RegisterForm />
        </div>);
}
