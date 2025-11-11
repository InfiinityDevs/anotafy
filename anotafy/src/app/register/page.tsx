"use client";

import { RegistrationWizard } from "@/components/registration/RegistrationWizard";
import { Auth } from "@/lib/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RegisterPage() {
    const router = useRouter();
    
        useEffect(() => {
            const checkAuth = async () => {
                try {
                    if (await Auth.checkAuth())
                        router.push("/home");
                } catch (error) {
                    console.log(error);
                }
            };
    
            checkAuth();
        }, [router]);
    
    return (
        <div className="min-h-screen bg-linear-to-br from-background via-secondary/20 to-background">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col justify-center items-center mb-4">
                        <Image
                            src="/Logo.png"
                            alt="Logo"
                            width={64}
                            height={64}
                        />
                        <h1 className="text-2xl font-bold mt-3">Anotafy</h1>
                        <p>Sistema para a gestão do seu restaurante!</p>
                    </div>

                    <RegistrationWizard />
                </div>
            </div>
        </div>
    );
}
