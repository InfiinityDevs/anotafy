"use client";

import { RegistrationWizard } from "@/components/registration/RegistrationWizard";
import Image from "next/image";

export default function RegisterPage() {
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
